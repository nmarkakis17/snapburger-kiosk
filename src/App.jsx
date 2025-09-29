// src/App.jsx
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const SB_URL = import.meta.env.VITE_SUPABASE_URL
const SB_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY
const supabase = createClient(SB_URL, SB_ANON_KEY)

export default function App() {
  // ===== Global state =====
  const [loading, setLoading] = useState(true)
  const [menu, setMenu] = useState([])
  const [cart, setCart] = useState([])
  const [email, setEmail] = useState('nick@example.com')
  const [placing, setPlacing] = useState(false)
  const [order, setOrder] = useState(null)
  const [statusFeed, setStatusFeed] = useState([])
  const orderSubRef = useRef(null)

  // ===== Stage router =====
  const [stage, setStage] = useState('landing') // 'landing' | 'new' | 'returning' | 'menu'
  const [phone, setPhone] = useState('')
  const [loyaltyId, setLoyaltyId] = useState('')

  const SIGNUP_URL = 'https://your-website.example/signup?src=kiosk'
  const QR_SRC = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(SIGNUP_URL)}`

  function startNewFlow() { setStage('new') }
  function startReturningFlow() { setStage('returning') }

  function confirmNewOnKiosk() {
    if (!email) setEmail('guest+' + Math.floor(Math.random() * 9999) + '@snapburger.demo')
    setStage('menu')
  }
  function confirmReturningByEmail() {
    if (!email) return alert('Enter your email')
    setStage('menu')
  }
  function confirmReturningByPhone() {
    if (!phone) return alert('Enter your phone')
    setEmail(`p${phone.replace(/\D/g, '')}@snapburger.demo`)
    setStage('menu')
  }
  function confirmReturningByCard() {
    if (!loyaltyId) return alert('Enter your loyalty ID')
    setEmail(`card${loyaltyId}@snapburger.demo`)
    setStage('menu')
  }

  const fmt = (c) => `$${(c / 100).toFixed(2)}`
  const subtotal = useMemo(
    () => cart.reduce((s, c) => s + c.item.price_cents * c.qty, 0),
    [cart]
  )

  // ===== Load menu =====
  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from('menu_items')
        .select('id,name,category,price_cents,image_url,is_active')
        .eq('is_active', true)
        .order('category', { ascending: true })
        .order('name', { ascending: true })

      if (!error) setMenu(data || [])
      setLoading(false)
    })()

    return () => {
      if (orderSubRef.current) {
        supabase.removeChannel(orderSubRef.current)
        orderSubRef.current = null
      }
    }
  }, [])

  // ===== Cart ops =====
  const addToCart = (item) =>
    setCart((prev) => {
      const i = prev.findIndex((c) => c.item.id === item.id)
      if (i >= 0) {
        const copy = [...prev]
        copy[i] = { ...copy[i], qty: copy[i].qty + 1 }
        return copy
      }
      return [...prev, { item, qty: 1 }]
    })

  const updateQty = (id, delta) =>
    setCart((prev) =>
      prev
        .map((c) =>
          c.item.id === id ? { ...c, qty: Math.max(0, c.qty + delta) } : c
        )
        .filter((c) => c.qty > 0)
    )

  const clearCart = () => setCart([])

  // ===== Order subscription =====
  const subscribeOrder = (orderId) => {
    if (orderSubRef.current) {
      supabase.removeChannel(orderSubRef.current)
      orderSubRef.current = null
    }
    const ch = supabase
      .channel(`order-${orderId}`)
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'orders', filter: `id=eq.${orderId}` },
        (payload) => {
          const newStatus = payload.new?.status
          setOrder((o) => (o ? { ...o, status: newStatus } : o))
          setStatusFeed((f) => [
            `${new Date().toLocaleTimeString()} → ${newStatus}`,
            ...f,
          ])
        }
      )
      .subscribe()
    orderSubRef.current = ch
  }

  // ===== Place order =====
  const placeOrder = async () => {
    if (!cart.length) return alert('Your cart is empty')
    setPlacing(true)

    let userId = null
    const { data: users } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .limit(1)
    userId = users?.[0]?.id ?? null

    const { data: orderRows, error: oErr } = await supabase
      .from('orders')
      .insert({
        user_id: userId,
        subtotal_cents: subtotal,
        total_cents: subtotal,
        status: 'placed',
      })
      .select('id,status')
      .single()

    if (oErr || !orderRows) {
      alert('Failed to place order')
      setPlacing(false)
      return
    }

    const orderId = orderRows.id
    setOrder({ id: orderId, status: orderRows.status })
    subscribeOrder(orderId)

    const itemsPayload = cart.map((c) => ({
      order_id: orderId,
      menu_item_id: c.item.id,
      qty: c.qty,
      mods_json: {},
    }))
    await supabase.from('order_items').insert(itemsPayload)
    clearCart()
    setPlacing(false)
  }

  // ===== Render =====
  return (
    <div className="page container">
      {/* —— Stage router —— */}
      {stage === 'landing' && (
        <section className="tower-wrap">
          <div className="tower">
            <img src="/assets/kiosk-main.png" alt="SnapBurger Kiosk" />
            <div className="tower-overlay">
              <button className="pill-btn btn-first" onClick={startNewFlow}>
                First-Time Customer
              </button>
              <button className="pill-btn btn-return" onClick={startReturningFlow}>
                Returning Customer
              </button>
              <div className="tagline-box">Where Dining Meets Technology</div>
            </div>
          </div>
        </section>
      )}

      {stage === 'new' && (
        <section className="grid-2">
          <div className="card" style={{display:'grid',gap:10,justifyItems:'center',textAlign:'center'}}>
            <h2 style={{margin:0}}>Set up on your phone</h2>
            <img src={QR_SRC} alt="Scan to sign up" style={{width:240,height:240,borderRadius:12,border:'1px solid var(--sb-border)'}} />
            <a className="btn" href={SIGNUP_URL} target="_blank" rel="noreferrer">Open Signup Link</a>
            <span className="meta">Scan the QR or tap the link</span>
            <button className="btn btn-ghost" onClick={()=>setStage('landing')}>Back</button>
          </div>

          <div className="card" style={{display:'grid',gap:10}}>
            <h2 style={{margin:0}}>Set up on this kiosk</h2>
            <label className="kv">
              <span>Email</span>
              <input className="input" placeholder="you@example.com" value={email} onChange={e=>setEmail(e.target.value)} />
            </label>
            <label className="kv">
              <span>Phone (optional)</span>
              <input className="input" placeholder="(555) 555-5555" value={phone} onChange={e=>setPhone(e.target.value)} />
            </label>
            <button className="btn" onClick={confirmNewOnKiosk}>Create & Continue</button>
            <button className="btn btn-ghost" onClick={()=>setStage('landing')}>Back</button>
            <span className="meta">Demo only — no password needed here</span>
          </div>
        </section>
      )}

      {stage === 'returning' && (
        <section className="grid-2">
          <div className="card" style={{display:'grid',gap:10}}>
            <h2 style={{margin:0}}>Scan Loyalty Card</h2>
            <input className="input" placeholder="Enter card ID (stub)" value={loyaltyId} onChange={e=>setLoyaltyId(e.target.value)} />
            <button className="btn" onClick={confirmReturningByCard}>Continue</button>
            <button className="btn btn-ghost" onClick={()=>setStage('landing')}>Back</button>
            <span className="meta">Scanner stub for demo</span>
          </div>

          <div className="card" style={{display:'grid',gap:10}}>
            <h2 style={{margin:0}}>Sign in with Email or Phone</h2>
            <label className="kv">
              <span>Email</span>
              <input className="input" placeholder="you@example.com" value={email} onChange={e=>setEmail(e.target.value)} />
            </label>
            <button className="btn" onClick={confirmReturningByEmail}>Continue with Email</button>
            <div style={{height:1, background:'var(--sb-border)', margin:'6px 0'}} />
            <label className="kv">
              <span>Phone</span>
              <input className="input" placeholder="(555) 555-5555" value={phone} onChange={e=>setPhone(e.target.value)} />
            </label>
            <button className="btn" onClick={confirmReturningByPhone}>Continue with Phone</button>
            <button className="btn btn-ghost" onClick={()=>setStage('landing')}>Back</button>
          </div>
        </section>
      )}

      {stage === 'menu' && (
        <>
          <section className="grid-2">
            <div className="card">
              <div className="space"><h2 style={{ margin: 0 }}>Menu</h2></div>
              {loading ? (
                <div>Loading menu…</div>
              ) : menu.length === 0 ? (
                <div className="meta">No active items yet.</div>
              ) : (
                <ul className="menu">
                  {menu.map((m) => (
                    <li key={m.id} className="item">
                      {m.image_url && <div className="thumb"><img src={m.image_url} alt={m.name} /></div>}
                      <div className="title">{m.name}</div>
                      <div className="meta" style={{ textTransform: 'capitalize' }}>{m.category}</div>
                      <div className="price">{fmt(m.price_cents)}</div>
                      <button className="btn" style={{ marginTop: 8 }} onClick={() => addToCart(m)}>Add</button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="card">
              <div className="space">
                <h2 style={{ margin: 0 }}>Your Cart</h2>
                <span className="badge">Subtotal {fmt(subtotal)}</span>
              </div>
              {!cart.length ? (
                <div className="meta">No items yet.</div>
              ) : (
                <ul className="cart-list">
                  {cart.map((c) => (
                    <li key={c.item.id} className="cart-item">
                      <div>
                        <div style={{ fontWeight: 700 }}>{c.item.name}</div>
                        <div className="meta">{fmt(c.item.price_cents)} × {c.qty}</div>
                      </div>
                      <div className="qty row">
                        <button onClick={() => updateQty(c.item.id, -1)}>-</button>
                        <button onClick={() => updateQty(c.item.id, +1)}>+</button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
              <div className="row" style={{ gap: 12, marginTop: 10 }}>
                <button className="btn" onClick={clearCart}>Clear</button>
                <button className="btn" onClick={placeOrder} disabled={placing || !cart.length}>
                  {placing ? 'Placing…' : 'Place Order'}
                </button>
              </div>
            </div>
          </section>

          <section className="grid-2">
            <div className="card">
              <h2 style={{ marginTop: 0 }}>Order</h2>
              {!order ? (
                <div className="meta">Place an order to see status updates.</div>
              ) : (
                <div className="kv">
                  <div><span className="meta">Order ID:</span> <code>{order.id}</code></div>
                  <div><span className="meta">Status:</span> <b>{String(order.status).toUpperCase()}</b></div>
                  <p className="meta">Tip: In Supabase → <b>orders</b>, update status to <code>in_kitchen</code> → <code>ready</code> → <code>served</code>.</p>
                </div>
              )}
            </div>

            <div className="card">
              <h2 style={{ marginTop: 0 }}>Live Feed</h2>
              <ul style={{ display:'grid', gap:6, fontFamily:'ui-monospace, SFMono-Regular, Menlo, monospace', fontSize:12 }}>
                {statusFeed.map((line, i) => (<li key={i}>{line}</li>))}
                {!statusFeed.length && <li className="meta">No updates yet.</li>}
              </ul>
            </div>
          </section>
        </>
      )}

      <div className="footer">SnapBurger: Where Dining Meets Technology</div>
    </div>
  )
}
