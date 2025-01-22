import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import './Cart.css'
import { Toast } from '../Components/Toast.tsx';

export function Cart() {
  const apiKey = import.meta.env.VITE_API_KEY;
  const cartId = 1
  const [cartItems, setCartItems] = useState([])
  const [notification, setNotificationVisible] = useState(false)


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
    setNotificationVisible(true)
    setTimeout(() => {
      setNotificationVisible(false);
    }, 2000)
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



  const handleClose = () => {
    setNotificationVisible(false)
  }


  return (
    <div>
      <h1>This is your cart</h1>
      <div className='cart-container'>
        {cartItems.length > 0 ? (
          cartItems.map((cartItem, index) => (
            <div key={index} className='cart-item'>
              <img className='image-cart'
                src={cartItem.food.image_url}
                alt={cartItem.food.name}
              />
              <div className='item-details'>
                <p>{cartItem.food.name}</p>
                <p>Quantity: {cartItem.quantity}</p>
                <p>Price: ${cartItem.food.price}</p>
                <p>Total: </p>
              </div>
              <div className='item-actions'>
                <button onClick={() => handleDelete(cartItem.id)}>Delete Item</button>
                <Toast
                  notification={notification}
                  type='order-success'
                  setNotification={setNotificationVisible}
                  close={handleClose}
                />
              </div>
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
    </div>
  )
}