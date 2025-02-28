import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Toast } from '../Components/Toast.tsx';
import { loadStripe } from '@stripe/stripe-js';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';
import './Cart.css';
import { useCart } from '../Components/CartCountProvider.tsx';
import { Header } from '../Header/Header.jsx';

type CartItemType = {
  id: number;
  image_url: string;
  name: string;
  quantity: number;
  price: number;
  item_price: number;
};

type Error = {
  message: string
}

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

export function Cart() {
  const apiKey = import.meta.env.VITE_API_KEY;
  const cartId = 1;
  const [cart, setCart] = useState<{ cart_items: CartItemType[]; total_price: number }>({
    cart_items: [],
    total_price: 0
  });
  const [notification, setNotificationVisible] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const { cartCount, setCartCount } = useCart();


  // Fetch cart data
  const cartIndex = async (cartId: number) => {
    try {
      const response = await axios.get(`${apiKey}/cart.json`, {
        params: { cart_id: cartId }
      });
      setCart(response.data);
      setTotalPrice(response.data.total_price || 0);
    } catch (error) {
      console.error("Error fetching data", error.message);
    }
  };

  useEffect(() => {
    cartIndex(cartId);
  }, [cartId]);

  useEffect(() => {
    const totalQuantity = cart.cart_items.reduce((sum, item) => sum + item.quantity, 0)
    setCartCount(totalQuantity);
  }, [cart.cart_items, setCartCount])

  // Handle item deletion
  const handleDelete = async (id: number) => {
    try {
      const response = await axios.delete(`${apiKey}/cart_items/${id}.json`);
      if (response.status === 200) {
        setCart((prevCart) => {
          const updatedCart = {
            ...prevCart,
            cart_items: prevCart.cart_items.filter((item) => item.id !== id)
          };
          const newTotalPrice = updatedCart.cart_items.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
          );
          setTotalPrice(newTotalPrice);
          return updatedCart;
        });
      }
    } catch (error) {
      console.error("Error deleting item", error.message);
    }
  };

  // Handle checkout
  const handleCheckout = async (event: React.FormEvent) => {
    event.preventDefault();

    const dummyClientSecret = "dummy_client_secret"; // Replace with real payment logic

    const { error, paymentIntent } = { error: null, paymentIntent: { status: 'succeeded' } };

    if (error) {
      console.error("Payment failed:", (error as Error).message);
      alert("Payment failed!");
    } else if (paymentIntent.status === 'succeeded') {
      console.log("Dummy Payment successful!");
      alert("Payment successful!");
    }
    setCart({ cart_items: [], total_price: 0 });

    await axios.post(`${apiKey}/cart.json`);
    setNotificationVisible(true);
    setTimeout(() => {
      setNotificationVisible(false);
    }, 2000);
    setCartCount(prevCount => prevCount = 0)
    navigate('/Orders');
  };

  const handleClose = () => {
    setNotificationVisible(false);
  };

  return (
    <div>
      <div className='header-container'>
        <Header />
      </div>
      <h1 className='header-cart'>Your Cart</h1>
      <div className='cart-container'>
        {cart.cart_items.length > 0 ? (
          cart.cart_items.map((cartItem) => (
            <div key={cartItem.id} className='cart-item'>
              <img
                className='image-cart'
                src={cartItem.image_url}
                alt={cartItem.name}
              />
              <div className='item-details'>
                <p>{cartItem.name}</p>
                <p>Quantity: {cartItem.quantity}</p>
                <p>Price: ${cartItem.price}</p>
                <p>Total: ${cartItem.item_price}</p>
              </div>
              <div className='item-actions'>
                <button onClick={() => handleDelete(cartItem.id)}>Delete Item</button>
                <Toast
                  details={{
                    name: cartItem.name,
                    quantity: cartItem.quantity,
                    message: `Price ${cartItem.price}`
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
        <div className='pay-container'>
          <p>Sum: ${totalPrice}</p>
          <form onSubmit={handleCheckout}>
            {/* Uncomment and set up the Stripe checkout */}
            {/* <CardElement /> */}
            <button className='pay-button' type="submit" disabled={!stripe}>Pay</button>
          </form>
        </div>
      </div>
    </div>
  );
}