import axios from 'axios';
import './Menu.css';
import { useState, useEffect } from 'react';
import { Modal } from './Modal.jsx'
import { Header } from '../Header/Header.jsx'

export function Menu() {
  // State to hold food data, initially an empty array
  const [food, setFood] = useState([]);
  const [isFoodVisible, setIsFoodVisible] = useState(false);
  const [currentFood, setCurrentFood] = useState({});
  const apiKey = import.meta.env.VITE_API_KEY

  const handleIndex = async () => {
    console.log('handleIndex');
    try {
      // Fetch data from the API
      const response = await axios.get(`${apiKey}/foods.json`);
      console.log('Response', response.data);
      // Set the food data to state
      setFood(response.data);
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
      {Array.isArray(food) && food.length > 0 ? ( 
        food.map((item, index) => ( 
          <div key={index}>
            <h1>{item.name}</h1>
            <h1>{item.price}</h1>
            <p>{item.description}</p>
            <img className="image" src={item.image_url}></img>
            <div className='button-container'>
            <button className='order-button' onClick={handleOrder}>Order</button>
            <button className='more-info-button' onClick={() => handleShow(item)}>More info</button>
            </div>
          </div>
        ))
      ) : (
        <p>Loading foods...</p>
      )}
      <Modal show={isFoodVisible} onClose={handleClose}>
        <h1>{currentFood.name}</h1>
        <p>{currentFood.description}</p>
        <img className='image' src={currentFood.image_url} alt={currentFood.name} />
        <p>Price: {currentFood.price}</p>
      </Modal>
    </div>
  );
}
