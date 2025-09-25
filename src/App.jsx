import React, { useEffect, useMemo, useRef, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const SB_URL = import.meta.env.VITE_SUPABASE_URL
const SB_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY
const supabase = createClient(SB_URL, SB_ANON_KEY)

export default function App() {
  const [loading, setLoading] = useState(true)
  const [menu, setMenu] = useState([])
  const [cart, setCart] = useState([])
  const [email, setEmail] = useState('nick@example.com')
  const [placing, setPlacing] = useState(false)
  const [order, setOrder] = useState(null)
  const [statusFeed, setStatusFeed] = useState([])
  const orderSubRef = useRef(null)

  const fmt = (c) => `$${(c / 100).toFixed(2)}`
  const subtotal = useMemo(
    () => cart.reduce((s, c) => s + c.item.price_cents * c.qty, 0),
    [cart]
  )

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

  return (
    <div className="page container">
      {/* HERO */}
<header className="hero" style={{ background:'transparent', border:'1px solid var(--sb-border)', borderRadius:28, padding:'36px 24px', boxShadow:'var(--shadow)' }}>
  <div style={{ position:'relative', zIndex:1, display:'grid', placeItems:'center', gap:10, textAlign:'center' }}>
    <img src="/assets/theo.png" alt="Theo mascot" style={{ height:88, width:'auto', objectFit:'contain' }} />
<h1 className="hero-title">
  Order with Theo + Earn SnapCoins + Light Up the SnapBoard
</h1>
<h2 className="hero-sub">= Theo-Kiosk</h2>
  </div>
</header>

      {/* MENU + CART */}
      <section className="grid-2">
        <div className="card">
          <div className="space">
            <h2 style={{ margin: 0 }}>Menu</h2>
          </div>
          {loading ? (
            <div>Loading menu…</div>
          ) : menu.length === 0 ? (
            <div className="meta">No active items yet.</div>
          ) : (
            <ul className="menu">
              {menu.map((m) => (
                <li key={m.id} className="item">
                  {m.image_url && (
                    <div className="thumb">
                      <img src={m.image_url} alt={m.name} />
                    </div>
                  )}
                  <div className="title">{m.name}</div>
                  <div className="meta" style={{ textTransform: 'capitalize' }}>
                    {m.category}
                  </div>
                  <div className="price">{fmt(m.price_cents)}</div>
                  <button
                    className="btn"
                    style={{ marginTop: 8 }}
                    onClick={() => addToCart(m)}
                  >
                    Add
                  </button>
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
                    <div className="meta">
                      {fmt(c.item.price_cents)} × {c.qty}
                    </div>
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
            <button className="btn" onClick={clearCart}>
              Clear
            </button>
            <button className="btn" onClick={placeOrder} disabled={placing || !cart.length}>
              {placing ? 'Placing…' : 'Place Order'}
            </button>
          </div>
        </div>
      </section>

      {/* ORDER + FEED */}
      <section className="grid-2">
        <div className="card">
          <h2 style={{ marginTop: 0 }}>Order</h2>
          {!order ? (
            <div className="meta">Place an order to see status updates.</div>
          ) : (
            <div className="kv">
              <div>
                <span className="meta">Order ID:</span> <code>{order.id}</code>
              </div>
              <div>
                <span className="meta">Status:</span>{' '}
                <b>{String(order.status).toUpperCase()}</b>
              </div>
              <p className="meta">
                Tip: In Supabase → <b>orders</b>, update status to <code>in_kitchen</code> →{' '}
                <code>ready</code> → <code>served</code>.
              </p>
            </div>
          )}
        </div>

        <div className="card">
          <h2 style={{ marginTop: 0 }}>Live Feed</h2>
          <ul
            style={{
              display: 'grid',
              gap: 6,
              fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
              fontSize: 12,
            }}
          >
            {statusFeed.map((line, i) => (
              <li key={i}>{line}</li>
            ))}
            {!statusFeed.length && <li className="meta">No updates yet.</li>}
          </ul>
        </div>
      </section>

      <div className="footer">SnapBurger: Where Dining Meets Technology</div>
    </div>
  )
}
