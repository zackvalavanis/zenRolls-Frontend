import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'

type CartItems = {
  id: string,
  image_url: string,
  name: string,
  price: number,
  quantity: number
};

type OrderType = {
  id: string,
  cart_items: CartItems[];
};


export function Orders() {
  const apiKey = import.meta.env.VITE_API_KEY;
  const [orders, setOrders] = useState<OrderType[]>([])

  const handleIndex = async () => {
    try {
      const response = await axios.get<OrderType[]>(`${apiKey}/orders.json`)
      console.log(response.data)
      setOrders(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    handleIndex();
  }, [])


  return (
    <div>
      {orders.map((order) => (
        <div key={order.id}>
          <h1>Order Number: {order.id}</h1>
          {order.cart_items.length > 0 ? (
            order.cart_items.map((item) => (
              <div key={item.id}>
                <img src={item.image_url} alt={item.name} width={50} />
                <p>{item.name}</p>
                <p>Price: ${item.price}</p>
                <p>Quantity: {item.quantity}</p>
              </div>
            ))
          ) : (
            <p>No Items in Cart</p>
          )}
        </div>
      ))}
    </div>
  )
}