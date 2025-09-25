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
