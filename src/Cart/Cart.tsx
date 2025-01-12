import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'

export function Cart() {
  const apiKey = import.meta.env.VITE_API_KEY;
  const cartId = 1
  const [cartItems, setCartItems] = useState([])


  const cartIndex = async (cartId) => {
    try {
      const response = await axios.get(`${apiKey}/cart_items.json`, {
        params: { cart_id: cartId }
      })
      console.log(response.data)
      setCartItems(response.data)
    } catch (error) {
      console.error("Error fetching data", error.message);
    }
  }

  useEffect(() => {
    cartIndex(cartId);
  },
    [cartId]);



  return (
    <div>
      <h1>This is your cart</h1>
      {cartItems.length > 0 ? (
        cartItems.map((cartItem, index) => (
          <div key={index}>
            <p>{cartItem.food.name}</p>
            <p>Quantity: {cartItem.quantity}</p>
            <p>Price: ${cartItem.food.price}</p>
          </div>
        ))
      ) : (
        <p>Your cart is empty</p>
      )}
    </div>
  )
}