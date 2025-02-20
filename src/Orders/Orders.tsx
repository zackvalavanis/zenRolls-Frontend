import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import './Orders.css'

type CartItems = {
  id: string,
  image_url: string,
  name: string,
  price: number,
  quantity: number
};

type OrderType = {
  id: string,
  cart_items: CartItems[],
  total_price: number;
};


export function Orders() {
  const apiKey = import.meta.env.VITE_API_KEY;
  const [orders, setOrders] = useState<OrderType[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 2

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

  const totalPages = Math.ceil(orders.length / itemsPerPage)
  const paginatedOrders = orders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  return (
    <div>
      <Header />
      <div className='page'>
        <div className='orders-container'>
          {paginatedOrders.map((order) => (
            <div className='total-order' key={order.id}>
              <h1>Order Number: {order.id}</h1>
              <h1>Total Price: ${order.total_price}</h1>
              {order.cart_items.length > 0 ? (
                order.cart_items.map((item) => (
                  <div className='cart-item' key={item.id}>
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
        <div className="pagination"></div>
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >Previous</button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >Next</button>
      </div>
      <Footer />
    </div>
  )
}