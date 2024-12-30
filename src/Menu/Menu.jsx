import axios from 'axios';
import './Menu.css';
import { useState, useEffect } from 'react';
import { Modal } from './Modal.jsx'
import { Header } from '../Header/Header.jsx'

export function Menu() {
  // State to hold food data, initially an empty array
  const [category, setCategory] = useState([]);
  const [isFoodVisible, setIsFoodVisible] = useState(false);
  const [currentFood, setCurrentFood] = useState({});
  const apiKey = import.meta.env.VITE_API_KEY

  const handleIndex = async () => {
    console.log('handleIndex');
    try {
      // Fetch data from the API
      const response = await axios.get(`${apiKey}/categories.json`);
      console.log('Response', response.data);
      // Set the food data to state
      setCategory(response.data);
    } catch (error) {
      console.error("Error fetching data", error.message);
    }
  };

  useEffect(() => {
    handleIndex();
  }, []); 

  
  const handleShow = (food) => { 
    console.log('handleShow', food)
    setIsFoodVisible(true)
    setCurrentFood(food)
  }
  
  const handleClose = () => { 
    console.log('handleClose')
    setIsFoodVisible(false)
  }
  
  const handleOrder = (event) => { 
    event.preventDefault();
    console.log('ordered item')
  }

  return (
    <div>
      <div>
        <Header />
      </div>
      <div>
        <h1>
          Order for Delivery Below
        </h1>
      </div>
      {Array.isArray(category) && category.length > 0 ? (
        category.map((categoryItem) => (
          <div key={categoryItem.id}>
            <h1>{categoryItem.name}</h1>
            {Array.isArray(categoryItem.foods) && categoryItem.foods.length > 0 ? (
              categoryItem.foods.map((foodItem, foodIndex) => (
                <div key={foodIndex}>
                  <h2>{foodItem.name}</h2>
                  <h3>Price: ${foodItem.price}</h3>
                  <p>{foodItem.description}</p>
                  <img className="image" src={foodItem.image_url} alt={foodItem.name} />
                  <div className="button-container">
                    <button className="order-button" onClick={handleOrder}>Order</button>
                    <button className="more-info-button" onClick={() => handleShow(foodItem)}>More info</button>
                  </div>
                </div>
              ))
            ) : (
              <p>No food items available</p>
            )}
          </div>
        ))
      ) : (
        <p>Loading categories...</p>
      )}


      <Modal show={isFoodVisible} onClose={handleClose}>
        {currentFood && (
          <>
            <h1>{currentFood.name}</h1>
            <p>{currentFood.description}</p>
            <img className="image" src={currentFood.image_url} alt={currentFood.name} />
            <p>Price: {currentFood.price}</p>
          </>
        )}
      </Modal>
    </div>
  );
}
