import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import './Cart.css'
import { Toast } from '../Components/Toast.tsx';
import { loadStripe } from '@stripe/stripe-js';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';



type CartItemType = {
  id: number;
  image_url: string;
  name: string;
  quantity: number;
  price: number;
  item_price: number;
};

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);



export function Cart(cartItem: cartItem) {
  const apiKey = import.meta.env.VITE_API_KEY;
  const cartId = 1
  const [cart, setCart] = useState({})
  const [notification, setNotificationVisible] = useState(false)
  const [totalPrice, setTotalPrice] = useState(0)
  const stripe = useStripe()
  const elements = useElements()
  const [id, setId] = useState()



  const cartIndex = async (cartId) => {
    try {
      const response = await axios.get(`${apiKey}/cart.json`, {
        params: { cart_id: cartId }
      })
      setCart(response.data)
      setId(response.data.id)
      setTotalPrice(response.data.total_price || 0)
      console.log(response.data.total_price)
    } catch (error) {
      console.error("Error fetching data", error.message);
    }
  }

  useEffect(() => {
    cartIndex(cartId);
  },
    [cartId]);

  const handleCheckout = async (event: React.FormEvent) => {
    event.preventDefault();

    // Simulate successful checkout for testing
    const dummyClientSecret = "dummy_client_secret";

    // Simulate Stripe behavior
    const { error, paymentIntent } = {
      error: null,
      paymentIntent: {
        status: 'succeeded',
      },
    };

    if (error) {
      console.error("Payment failed:", error.message);
      alert("Payment failed!");
    } else if (paymentIntent.status === 'succeeded') {
      console.log("Dummy Payment successful!");
      alert("Payment successful!");
    }
    setCart({ cart_items: [] });
    setTotalPrice(0);

    // Optionally send a request to the backend to clear the cart in the database
    await axios.delete(`${apiKey}/cart.json`);

    // Notification logic
    setNotificationVisible(true);
    setTimeout(() => {
      setNotificationVisible(false);
    }, 2000);
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${apiKey}/cart_items/${id}.json`);
      if (response.status === 200) {
        console.log("Deleting item with ID:", id);
        if (!id) {
          console.error("Error: Invalid ID");
          return;
        }
        setCart((prevCart) => {
          const updatedCart = {
            ...prevCart,
            cart_items: prevCart.cart_items.filter((item) => item.id !== id),
          };
          setTotalPrice(updatedCart.cart_items.reduce((sum, item) => sum + item.price * item.quantity, 0)); // Recalculate total price
          return updatedCart;
        });
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
                <p>Total: {cartItem.item_price} </p>
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
          <p>Sum: ${totalPrice}</p>
          <form onSubmit={handleCheckout}>
            {/* <CardElement /> */}
            <button type="submit" disabled={!stripe}>Pay</button>
          </form>
        </div>
      </div>
    </div >
  )
}