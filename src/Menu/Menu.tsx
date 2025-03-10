import axios from 'axios';
import './Menu.css';
import { useState, useEffect } from 'react';
import { Modal } from './Modal.jsx';
import { Header } from '../Header/Header.jsx';
import { Footer } from '../Footer/Footer.tsx'
import { Toast } from '../Components/Toast.tsx';
import React from 'react'
import { useCart } from '../Components/CartCountProvider.tsx';


type CategoryItem = {
  id: number,
  total_price: number
}

type NotificationDetails = {
  name: string,
  quantity: number,
  message: string
}

type CurrentFood = {
  name: string,
  description: string,
  image_url: string,
  price: number,
  inventory: number
}

export function Menu() {
  // State to hold food data, initially an empty array
  const [category, setCategory] = useState<{ cart_items: CategoryItem[] }>({ cart_items: [] });
  const [isFoodVisible, setIsFoodVisible] = useState(false);
  const [currentFood, setCurrentFood] = useState<CurrentFood>({} as CurrentFood);
  const [quantities, setQuantities] = useState({})
  const apiKey = import.meta.env.VITE_API_KEY;
  const [notification, setIsNotificationShowing] = useState(false)
  const [notificationDetails, setNotificationDetails] = useState<NotificationDetails>({} as NotificationDetails)
  const { cartCount, setCartCount } = useCart();



  const hasLoadedBefore = localStorage.getItem("pageLoaded");


  const handleQuantityChange = (foodId, value) => {
    setQuantities((prev) => ({
      ...prev,
      [foodId]: value, // Dynamically update the quantity for the specific food item
    }));
  };

  useEffect(() => {
    const cachedData = localStorage.getItem('info');
    const pageLoaded = localStorage.getItem('pageLoaded');

    // Check if data is cached
    if (cachedData) {
      // console.log('Using cached data');
      setCategory(JSON.parse(cachedData)); // Parse and set cached data
    } else {
      // If the page hasn't been loaded before, fetch from API
      if (!pageLoaded) {
        handleIndex(); // Fetch data from API
        localStorage.setItem("pageLoaded", "true"); // Mark the page as loaded
      } else {
        console.log('Page has already been loaded');
      }
    }
  }, []);


  const handleIndex = async () => {
    console.log('handleIndex');
    try {
      // Fetch data from the API
      const response = await axios.get(`${apiKey}/categories.json`);
      console.log('Response', response.data);
      localStorage.setItem('info', JSON.stringify(response.data))
      setCategory(response.data);
    } catch (error) {
      console.error("Error fetching data", error.message);
    }
  };

  const handleShow = (food) => {
    console.log('handleShow', food);
    setIsFoodVisible(true);
    setCurrentFood(food);
  };

  const handleClose = () => {
    console.log('handleClose');
    setIsFoodVisible(false);
  };

  const close = () => {
    setIsNotificationShowing(false)
  }


  const handleAddToCart = async (event, FoodId, foodName) => {
    event.preventDefault();
    console.log(foodName)
    const quantity = quantities[FoodId] || 1;
    try {
      const response = await axios.post(`${apiKey}/cart_items.json`, {
        food_id: FoodId,
        foodName: foodName,
        quantity: quantity,
        message: `Added ${quantity} of ${foodName} to your cart`
      })
      if (response.status === 201) {
        console.log('successfully added to cart', response.data)
        setNotificationDetails({ name: foodName, quantity: quantity, message: `Added ${quantity} of ${foodName} to your cart` })
        setIsNotificationShowing(true)
        setCartCount(prevCount => prevCount + quantity)
        const timeoutId = setTimeout(() => {
          setIsNotificationShowing(false);
        }, 800);
        return () => clearTimeout(timeoutId)
      } else {
        console.error('Failed to add item to cart.', response.status)
      }
    } catch (error) {
      console.error('Error adding item to cart.', error.response ? error.response.data : error.message)
    }
  };

  return (
    <div className='container-total'>
      <Header />
      <div className='container-sushi-menu'>
        {Array.isArray(category) && category.length > 0 ? (
          category.map((categoryItem) => (
            <div key={categoryItem.id} className="category-item">
              <h2 className="category-name">{categoryItem.name}</h2>
              <div className="food-items">
                {Array.isArray(categoryItem.foods) && categoryItem.foods.length > 0 ? (
                  categoryItem.foods.map((foodItem, foodIndex) => (
                    <div key={foodIndex} className="food-item">
                      <h3>{foodItem.name}</h3>
                      <h4>Price: ${foodItem.price}</h4>
                      <img className="image" src={foodItem.image_url} alt={foodItem.name} />
                      <form onSubmit={(event) => handleAddToCart(event, foodItem.id, foodItem.name)}>
                        <div className="form-group">
                          Quantity:
                          <input
                            type='number'
                            min='1'
                            value={quantities[foodItem.id] || 1}
                            onChange={(event) => handleQuantityChange(foodItem.id, Number(event.target.value))} // updates quantity on change
                          />
                        </div>
                        <div className="button-container">
                          <button type="submit" className="order-button">Add to Cart</button>
                          <button
                            type='button'
                            className="more-info-button"
                            onClick={() => handleShow(foodItem)}
                          >
                            More info
                          </button>
                        </div>
                      </form>
                    </div>
                  ))
                ) : (
                  <p>No food items available</p>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>Loading categories...</p>
        )}
        <Toast
          notification={notification}
          details={notificationDetails}
          close={close}
          setNotification={setIsNotificationShowing}
          type='add-to-cart' />
      </div>
      <Footer id={undefined} />
      <Modal show={isFoodVisible} onClose={handleClose}>
        {currentFood && (
          <>
            <h1>{currentFood.name}</h1>
            <p>{currentFood.description}</p>
            <img className="image" src={currentFood.image_url} alt={currentFood.name} />
            <p>Price: {currentFood.price}</p>
            {/* <p>Inventory: {currentFood.inventory}</p> */}
          </>
        )}
      </Modal>
    </div>
  );
}
