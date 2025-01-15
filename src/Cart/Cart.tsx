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

  const handleCheckout = (event) => {
    event.preventDefault();
    console.log('Ordered Items')
  }

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${apiKey}/cart_items/${id}.json`)
      if (response.status === 200) {
        setCartItems(cartItems.filter((item) => item.id !== id))
      }
    } catch (error) {
      console.error("Error", error.message)
    }
  }

  return (
    <div>
      <h1>This is your cart</h1>
      {cartItems.length > 0 ? (
        cartItems.map((cartItem, index) => (
          <div key={index}>
            <p>{cartItem.id}</p>
            <p>{cartItem.food.name}</p>
            <p>Quantity: {cartItem.quantity}</p>
            <p>Price: ${cartItem.food.price}</p>
            <button onClick={() => handleDelete(cartItem.id)}>Delete Item</button>
          </div>
        ))
      ) : (
        <p>Your cart is empty</p>
      )}
      <div>
        <button onClick={handleCheckout}>
          Checkout
        </button>
      </div>
    </div>
  )
}