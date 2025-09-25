import React, { useEffect, useMemo, useRef, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

// Read from Vite env (set these in Netlify): VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY
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

  const fmt = (c) => `$${(c/100).toFixed(2)}`
  const subtotal = useMemo(() => cart.reduce((s, c) => s + c.item.price_cents * c.qty, 0), [cart])

  useEffect(() => {
    (async () => {
      if (!SB_URL || !SB_ANON_KEY) {
        alert('Missing Supabase env vars. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.')
      }
      const { data, error } = await supabase
        .from('menu_items')
        .select('id,name,category,price_cents,image_url')
        .eq('is_active', true)
        .order('category', { ascending: true })
        .order('name', { ascending: true })
      if (error) {
        console.error(error)
        alert('Failed to load menu. Check Supabase URL/key and RLS policies.')
      } else {
        setMenu(data || [])
      }
      setLoading(false)
    })()
    return () => {
      if (orderSubRef.current) {
        supabase.removeChannel(orderSubRef.current)
        orderSubRef.current = null
      }
    }
  }, [])

  const addToCart = (item) => {
    setCart(prev => {
      const i = prev.findIndex(c => c.item.id === item.id)
      if (i >= 0) {
        const copy = [...prev]
        copy[i] = { ...copy[i], qty: copy[i].qty + 1 }
        return copy
      }
      return [...prev, { item, qty: 1 }]
    })
  }

  const updateQty = (id, delta) => {
    setCart(prev => prev.map(c => c.item.id === id ? { ...c, qty: Math.max(0, c.qty + delta) } : c).filter(c => c.qty > 0))
  }

  const clearCart = () => setCart([])

  const subscribeOrder = (orderId) => {
    if (orderSubRef.current) {
      supabase.removeChannel(orderSubRef.current)
      orderSubRef.current = null
    }
    const ch = supabase
      .channel(`order-${orderId}`)
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'orders', filter: `id=eq.${orderId}` }, (payload) => {
        const newStatus = payload.new?.status
        setOrder(o => (o ? { ...o, status: newStatus } : o))
        setStatusFeed(f => [`${new Date().toLocaleTimeString()} → ${newStatus}`, ...f])
      })
      .subscribe((status) => {
        if (status === 'SUBSCRIBED') {
          setStatusFeed(f => [`${new Date().toLocaleTimeString()} → subscribed to order updates`, ...f])
        }
      })
    orderSubRef.current = ch
  }

  const placeOrder = async () => {
    if (!cart.length) return alert('Your cart is empty')
    setPlacing(true)

    // find user by email (optional)
    let userId = null
    const { data: users, error: uErr } = await supabase.from('users').select('id').eq('email', email).limit(1)
    if (uErr) console.error(uErr)
    userId = users?.[0]?.id ?? null

    const { data: orderRows, error: oErr } = await supabase
      .from('orders')
      .insert({ user_id: userId, subtotal_cents: subtotal, total_cents: subtotal, status: 'placed' })
      .select('id,status')
      .single()
    if (oErr || !orderRows) {
      console.error(oErr)
      alert('Failed to place order')
      setPlacing(false)
      return
    }
    const orderId = orderRows.id
    setOrder({ id: orderId, status: orderRows.status })
    subscribeOrder(orderId)

    const itemsPayload = cart.map(c => ({ order_id: orderId, menu_item_id: c.item.id, qty: c.qty, mods_json: {} }))
    const { error: oiErr } = await supabase.from('order_items').insert(itemsPayload)
    if (oiErr) console.error(oiErr)

    clearCart()
    setPlacing(false)
  }

  return (
    <div style={{minHeight:'100vh', background:'#f8fafc', color:'#0f172a', padding:24}}>
      <div style={{maxWidth:960, margin:'0 auto', display:'grid', gap:24}}>
        <header style={{display:'grid', gap:8}}>
          <h1 style={{fontSize:28, fontWeight:800}}>Theo Kiosk · SnapBurger</h1>
          <p style={{color:'#475569'}}>Select items, place an order, then flip status in Supabase to see realtime updates.</p>
        </header>

        <section style={{display:'grid', gap:12, gridTemplateColumns:'1fr auto', alignItems:'end', background:'#fff', padding:16, borderRadius:16, border:'1px solid #e2e8f0'}}>
          <label style={{display:'grid', gap:6}}>
            <span style={{fontSize:14, fontWeight:600}}>Identify (email)</span>
            <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="nick@example.com" style={{padding:'8px 12px', borderRadius:12, border:'1px solid #cbd5e1'}} />
            <span style={{fontSize:12, color:'#64748b'}}>Optional for MVP; links orders to a known user.</span>
          </label>
          <button onClick={()=>setEmail('nick@example.com')} style={{padding:'8px 16px', borderRadius:12, background:'#0f172a', color:'#fff'}}>Use demo email</button>
        </section>

        <section style={{display:'grid', gap:24, gridTemplateColumns:'1fr 1fr'}}>
          <div style={{background:'#fff', padding:16, border:'1px solid #e2e8f0', borderRadius:16}}>
            <h2 style={{fontSize:20, fontWeight:700, marginBottom:12}}>Menu</h2>
            {loading ? (<div>Loading menu…</div>) : (
              <ul style={{display:'grid', gap:12, gridTemplateColumns:'repeat(auto-fill, minmax(200px, 1fr))'}}>
                {menu.map(m => (
                  <li key={m.id} style={{border:'1px solid #e2e8f0', borderRadius:12, padding:12, display:'grid', gap:6}}>
                    <div style={{fontWeight:600}}>{m.name}</div>
                    <div style={{fontSize:12, color:'#64748b', textTransform:'capitalize'}}>{m.category}</div>
                    <div style={{fontSize:14}}>{fmt(m.price_cents)}</div>
                    <button onClick={()=>addToCart(m)} style={{marginTop:6, padding:'8px 12px', borderRadius:10, background:'#0f172a', color:'#fff'}}>Add</button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div style={{background:'#fff', padding:16, border:'1px solid #e2e8f0', borderRadius:16, display:'grid', gap:12}}>
            <h2 style={{fontSize:20, fontWeight:700}}>Your Cart</h2>
            {!cart.length ? (<div style={{color:'#64748b'}}>No items yet.</div>) : (
              <ul style={{display:'grid', gap:8}}>
                {cart.map(c => (
                  <li key={c.item.id} style={{display:'flex', justifyContent:'space-between', alignItems:'center', border:'1px solid #e2e8f0', borderRadius:12, padding:8}}>
                    <div>
                      <div style={{fontWeight:600}}>{c.item.name}</div>
                      <div style={{fontSize:12, color:'#64748b'}}>{fmt(c.item.price_cents)} × {c.qty}</div>
                    </div>
                    <div style={{display:'flex', gap:8}}>
                      <button onClick={()=>updateQty(c.item.id, -1)} style={{padding:'4px 10px', borderRadius:8, border:'1px solid #cbd5e1'}}>-</button>
                      <button onClick={()=>updateQty(c.item.id, +1)} style={{padding:'4px 10px', borderRadius:8, border:'1px solid #cbd5e1'}}>+</button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
            <div style={{display:'flex', justifyContent:'space-between', borderTop:'1px solid #e2e8f0', paddingTop:8}}>
              <div style={{fontWeight:600}}>Subtotal</div>
              <div style={{fontWeight:700}}>{fmt(subtotal)}</div>
            </div>
            <div style={{display:'flex', gap:12}}>
              <button onClick={clearCart} style={{padding:'8px 12px', borderRadius:10, border:'1px solid #cbd5e1'}}>Clear</button>
              <button onClick={placeOrder} disabled={placing || !cart.length} style={{padding:'8px 12px', borderRadius:10, background:'#059669', color:'#fff', opacity: (placing||!cart.length)?0.6:1}}>{placing ? 'Placing…' : 'Place Order'}</button>
            </div>
          </div>
        </section>

        <section style={{display:'grid', gap:24, gridTemplateColumns:'1fr 1fr'}}>
          <div style={{background:'#fff', padding:16, border:'1px solid #e2e8f0', borderRadius:16}}>
            <h2 style={{fontSize:20, fontWeight:700, marginBottom:8}}>Order</h2>
            {!order ? (
              <div style={{color:'#64748b'}}>Place an order to see status updates.</div>
            ) : (
              <div style={{display:'grid', gap:8}}>
                <div><span style={{fontSize:12, color:'#64748b'}}>Order ID:</span> <code>{order.id}</code></div>
                <div><span style={{fontSize:12, color:'#64748b'}}>Status:</span> <span style={{fontWeight:700}}>{String(order.status).toUpperCase()}</span></div>
                <p style={{fontSize:12, color:'#475569'}}>Tip: In Supabase → Table Editor → orders, change this order's status to <code>in_kitchen</code>, then <code>ready</code>, then <code>served</code>. You'll see updates here in real time.</p>
              </div>
            )}
          </div>
          <div style={{background:'#fff', padding:16, border:'1px solid #e2e8f0', borderRadius:16}}>
            <h2 style={{fontSize:20, fontWeight:700, marginBottom:8}}>Live Feed</h2>
            <ul style={{display:'grid', gap:6, fontFamily:'ui-monospace, SFMono-Regular, Menlo, monospace', fontSize:12}}>
              {statusFeed.map((line, i) => (<li key={i}>{line}</li>))}
              {!statusFeed.length && <li style={{color:'#64748b'}}>No updates yet.</li>}
            </ul>
          </div>
        </section>

        <footer style={{textAlign:'center', color:'#64748b', fontSize:12, paddingTop:16}}>
          SnapBurger · MVP Kiosk · React + Supabase
        </footer>
      </div>
    </div>
  )
}
