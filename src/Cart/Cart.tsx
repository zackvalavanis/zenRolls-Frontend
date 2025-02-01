import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import './Cart.css'
import { Toast } from '../Components/Toast.tsx';

type cartItem = {
  cartItem: {
    food: {
      image: string;
    }
  }
}

export function Cart(cartItem: cartItem) {
  const apiKey = import.meta.env.VITE_API_KEY;
  const cartId = 1
  const [cart, setCart] = useState({})
  const [notification, setNotificationVisible] = useState(false)


  const cartIndex = async (cartId) => {
    try {
      const response = await axios.get(`${apiKey}/cart.json`, {
        params: { cart_id: cartId }
      })
      setCart(response.data)
      console.log(response.data)
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
    setNotificationVisible(true)
    setTimeout(() => {
      setNotificationVisible(false);
    }, 2000)
  }

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${apiKey}/cart_items/${id}.json`);
      if (response.status === 200) {
        console.log("Deleting item with ID:", id);
        if (!id) {
          console.error("Error: Invalid ID");
          return;
        }
        setCart((prevCart) => ({
          ...prevCart,
          cart_items: prevCart.cart_items.filter((item) => item.id !== id),
        }));
      }
    } catch (error) {
      console.error("Error deleting item", error.message);
    }
  };



  const handleClose = () => {
    setNotificationVisible(false)
  }


  return (
    <div>
      <h1>This is your cart</h1>
      <div className='cart-container'>
        {cart?.cart_items?.length > 0 ? (
          cart?.cart_items?.map((cartItem) => (
            <div key={cartItem.id} className='cart-item'>

              <img className='image-cart'
                src={cartItem.image_url}
                alt={cartItem.name}
              />
              <div className='item-details'>
                <p>{cartItem.name}</p>
                <p>Quantity: {cartItem.quantity}</p>
                <p>Price: ${cartItem.price}</p>
                <p>Total: {cart.total_price} </p>
              </div>
              <div className='item-actions'>
                <button onClick={() => handleDelete(cartItem.id)}>Delete Item</button>
                <Toast
                  details={{
                    name: cartItem.name,
                    quantity: cartItem.quantity,
                    message: `Price ${cartItem.price}`,
                  }}
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
          <p>Sum: ${cart.total_price}</p>
          <button onClick={handleCheckout}>
            Checkout
          </button>
        </div>
      </div>
    </div >
  )
}