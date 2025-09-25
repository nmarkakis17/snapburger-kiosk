# SnapBurger Kiosk – UI Polish Pack

Below are drop‑in upgrades to make your kiosk look close to the website vibe (clean, bold, blue/orange accents). Apply all three steps.

---

## 1) Add a brand stylesheet

Create **`src/theme.css`**

```css
:root{
  --sb-bg: #0b1020;         /* deep navy */
  --sb-panel: #11172b;      /* card navy */
  --sb-panel-2: #121a33;
  --sb-text: #eef2ff;       /* near-white */
  --sb-subtext: #b8c2ff;    /* soft indigo */
  --sb-accent: #ff7a18;     /* orange */
  --sb-accent-2: #00d4ff;   /* electric blue */
  --sb-border: #1f2a44;
  --radius: 18px;
  --shadow: 0 10px 30px rgba(0,0,0,.35);
}

*{box-sizing:border-box}
html,body,#root{height:100%}
body{
  margin:0; font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Inter, "Helvetica Neue", Arial;
  background: radial-gradient(1200px 600px at 10% -10%, rgba(0,212,255,.15), transparent 35%),
              radial-gradient(1000px 500px at 120% 10%, rgba(255,122,24,.12), transparent 40%),
              var(--sb-bg);
  color: var(--sb-text);
}

.container{max-width:1100px;margin:0 auto;padding:28px;display:grid;gap:22px}

.header{
  background: linear-gradient(135deg, rgba(0,212,255,.18), rgba(255,122,24,.18));
  border: 1px solid var(--sb-border);
  border-radius: var(--radius);
  padding: 24px;
  box-shadow: var(--shadow);
}
.header h1{margin:0;font-size:28px}
.header p{margin:6px 0 0;color:var(--sb-subtext)}

.grid-2{display:grid;gap:22px;grid-template-columns:1fr 1fr}
.card{
  background: var(--sb-panel);
  border: 1px solid var(--sb-border);
  border-radius: var(--radius);
  padding:16px; box-shadow: var(--shadow);
}

.menu{display:grid;gap:14px;grid-template-columns:repeat(auto-fill,minmax(210px,1fr))}
.menu .item{border:1px solid var(--sb-border);border-radius:16px;padding:12px;background:var(--sb-panel-2)}
.menu .title{font-weight:700}
.menu .meta{font-size:12px;color:var(--sb-subtext)}
.menu .price{font-weight:700;margin-top:4px}

.row{display:flex;align-items:center;gap:10px}
.space{display:flex;justify-content:space-between;align-items:center;gap:10px}

.input{padding:10px 12px;border-radius:12px;border:1px solid var(--sb-border);background:#0c1326;color:var(--sb-text)}
.btn{cursor:pointer;border:none;border-radius:12px;padding:10px 14px;font-weight:700}
.btn-primary{background:linear-gradient(135deg,var(--sb-accent),#ff9650);color:#1b0b00}
.btn-ghost{background:transparent;border:1px solid var(--sb-border);color:var(--sb-subtext)}
.btn-dark{background:#0b1020;color:#fff;border:1px solid var(--sb-border)}
.btn-success{background:linear-gradient(135deg,#13ea9b,#04b97d);color:#00160e}
.btn:disabled{opacity:.5;cursor:not-allowed}

.kv{display:grid;gap:6px}
.kv label{font-size:12px;color:var(--sb-subtext)}

.cart-list{display:grid;gap:10px}
.cart-item{display:flex;justify-content:space-between;align-items:center;border:1px solid var(--sb-border);border-radius:14px;padding:10px;background:var(--sb-panel-2)}
.qty button{border:1px solid var(--sb-border);background:#0c1326;color:var(--sb-text);border-radius:10px;padding:4px 10px}

.badge{display:inline-block;font-size:12px;padding:4px 10px;border-radius:999px;background:#0c1326;border:1px solid var(--sb-border);color:var(--sb-subtext)}
.footer{opacity:.7;text-align:center;padding:8px}

/* responsive */
@media (max-width: 900px){.grid-2{grid-template-columns:1fr}}
```

---

## 2) Import the stylesheet

Open **`index.html`** and add the line marked `<!-- +theme -->` in the `<head>`:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>SnapBurger · Theo Kiosk</title>
    <!-- +theme -->
    <link rel="stylesheet" href="/src/theme.css" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

---

## 3) Replace your `App.jsx` with this styled version

```jsx
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const SB_URL = import.meta.env.VITE_SUPABASE_URL
const SB_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY
const supabase = createClient(SB_URL, SB_ANON_KEY)

export default function App(){
  const [loading, setLoading] = useState(true)
  const [menu, setMenu] = useState([])
  const [cart, setCart] = useState([])
  const [email, setEmail] = useState('nick@example.com')
  const [placing, setPlacing] = useState(false)
  const [order, setOrder] = useState(null)
  const [statusFeed, setStatusFeed] = useState([])
  const orderSubRef = useRef(null)

  const fmt = (c) => `$${(c/100).toFixed(2)}`
  const subtotal = useMemo(() => cart.reduce((s,c)=> s + c.item.price_cents*c.qty, 0), [cart])

  useEffect(()=>{(async()=>{
    const { data, error } = await supabase
      .from('menu_items')
      .select('id,name,category,price_cents,image_url')
      .eq('is_active', true)
      .order('category', { ascending: true })
      .order('name', { ascending: true })
    if(error){ console.error(error); alert('Failed to load menu') }
    setMenu(data || [])
    setLoading(false)
  })(); return ()=>{ if(orderSubRef.current){ supabase.removeChannel(orderSubRef.current); orderSubRef.current=null } }},[])

  const addToCart = (item)=> setCart(prev=>{
    const i = prev.findIndex(c=>c.item.id===item.id)
    if(i>=0){ const copy=[...prev]; copy[i]={...copy[i], qty: copy[i].qty+1}; return copy }
    return [...prev, { item, qty:1 }]
  })
  const updateQty = (id, delta)=> setCart(prev=> prev.map(c=> c.item.id===id?{...c, qty: Math.max(0,c.qty+delta)}:c).filter(c=>c.qty>0))
  const clearCart = ()=> setCart([])

  const subscribeOrder = (orderId)=>{
    if(orderSubRef.current){ supabase.removeChannel(orderSubRef.current); orderSubRef.current=null }
    const ch = supabase.channel(`order-${orderId}`)
      .on('postgres_changes',{ event:'UPDATE', schema:'public', table:'orders', filter:`id=eq.${orderId}` }, (payload)=>{
        const newStatus = payload.new?.status
        setOrder(o=> o?{...o, status:newStatus}:o)
        setStatusFeed(f=> [`${new Date().toLocaleTimeString()} → ${newStatus}`, ...f])
      })
      .subscribe()
    orderSubRef.current = ch
  }

  const placeOrder = async ()=>{
    if(!cart.length) return alert('Your cart is empty')
    setPlacing(true)
    let userId = null
    const { data: users } = await supabase.from('users').select('id').eq('email', email).limit(1)
    userId = users?.[0]?.id ?? null
    const { data: orderRows, error:oErr } = await supabase
      .from('orders')
      .insert({ user_id:userId, subtotal_cents:subtotal, total_cents:subtotal, status:'placed' })
      .select('id,status')
      .single()
    if(oErr || !orderRows){ console.error(oErr); alert('Failed to place order'); setPlacing(false); return }
    const orderId = orderRows.id
    setOrder({ id: orderId, status: orderRows.status })
    subscribeOrder(orderId)
    const itemsPayload = cart.map(c=>({ order_id:orderId, menu_item_id:c.item.id, qty:c.qty, mods_json:{} }))
    await supabase.from('order_items').insert(itemsPayload)
    clearCart(); setPlacing(false)
  }

  return (
    <div className="container">
      <header className="header">
        <div className="space">
          <div>
            <h1>SnapBurger · Theo Kiosk</h1>
            <p>Tech‑forward ordering with live updates. Connected to your Supabase project.</p>
          </div>
          <span className="badge">MVP</span>
        </div>
      </header>

      <section className="card space">
        <div className="kv" style={{flex:1}}>
          <label>Identify (email)</label>
          <input className="input" value={email} onChange={e=>setEmail(e.target.value)} placeholder="nick@example.com" />
          <small style={{color:'var(--sb-subtext)'}}>Optional; ties orders to a user for loyalty.</small>
        </div>
        <button className="btn btn-dark" onClick={()=>setEmail('nick@example.com')}>Use demo email</button>
      </section>

      <section className="grid-2">
        <div className="card">
          <h2 style={{marginTop:0}}>Menu</h2>
          {loading ? <div>Loading menu…</div> : (
            <ul className="menu">
              {menu.map(m=> (
                <li key={m.id} className="item">
                  <div className="title">{m.name}</div>
                  <div className="meta" style={{textTransform:'capitalize'}}>{m.category}</div>
                  <div className="price">{fmt(m.price_cents)}</div>
                  <button className="btn btn-primary" style={{marginTop:8}} onClick={()=>addToCart(m)}>Add</button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="card">
          <div className="space"><h2 style={{margin:0}}>Your Cart</h2><span className="badge">Subtotal {fmt(subtotal)}</span></div>
          {!cart.length ? <div style={{color:'var(--sb-subtext)'}}>No items yet.</div> : (
            <ul className="cart-list">
              {cart.map(c=> (
                <li key={c.item.id} className="cart-item">
                  <div>
                    <div style={{fontWeight:700}}>{c.item.name}</div>
                    <div className="meta">{fmt(c.item.price_cents)} × {c.qty}</div>
                  </div>
                  <div className="qty row">
                    <button onClick={()=>updateQty(c.item.id,-1)}>-</button>
                    <button onClick={()=>updateQty(c.item.id,+1)}>+</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
          <div className="row" style={{gap:12, marginTop:10}}>
            <button className="btn btn-ghost" onClick={clearCart}>Clear</button>
            <button className="btn btn-success" onClick={placeOrder} disabled={placing || !cart.length}>{placing? 'Placing…':'Place Order'}</button>
          </div>
        </div>
      </section>

      <section className="grid-2">
        <div className="card">
          <h2 style={{marginTop:0}}>Order</h2>
          {!order ? (
            <div style={{color:'var(--sb-subtext)'}}>Place an order to see status updates.</div>
          ) : (
            <div className="kv">
              <div><span className="meta">Order ID:</span> <code>{order.id}</code></div>
              <div><span className="meta">Status:</span> <b>{String(order.status).toUpperCase()}</b></div>
              <p className="meta">Tip: In Supabase → <b>orders</b>, update status to <code>in_kitchen</code> → <code>ready</code> → <code>served</code>.</p>
            </div>
          )}
        </div>

        <div className="card">
          <h2 style={{marginTop:0}}>Live Feed</h2>
          <ul style={{display:'grid',gap:6,fontFamily:'ui-monospace, SFMono-Regular, Menlo, monospace',fontSize:12}}>
            {statusFeed.map((line,i)=>(<li key={i}>{line}</li>))}
            {!statusFeed.length && <li className="meta">No updates yet.</li>}
          </ul>
        </div>
      </section>

      <div className="footer">SnapBurger · Theo Kiosk · React + Supabase</div>
    </div>
  )
}
```

---

### Deploy notes

* Commit these changes → Push to GitHub → In Netlify click **Deploys → Trigger deploy**.
* No extra packages needed. This keeps your stack simple and fast.

### Optional brand tweaks

* Change accent colors in `:root` (`--sb-accent`, `--sb-accent-2`).
* Swap fonts by adding a Google Fonts `<link>` in `index.html` and setting `body { font-family: ... }`.
