import axios from 'axios';
import './Menu.css';
import { useState, useEffect } from 'react';
import { Modal } from './Modal.jsx';
import { Header } from '../Header/Header.jsx';
import { Footer } from '../Footer/Footer.tsx'

export function Menu() {
  // State to hold food data, initially an empty array
  const [category, setCategory] = useState([]);
  const [isFoodVisible, setIsFoodVisible] = useState(false);
  const [currentFood, setCurrentFood] = useState({});
  const [quantity, setQuantity] = useState(1)
  const apiKey = import.meta.env.VITE_API_KEY;

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
    console.log('handleShow', food);
    setIsFoodVisible(true);
    setCurrentFood(food);
  };

  const handleClose = () => { 
    console.log('handleClose');
    setIsFoodVisible(false);
  };

  const handleAddToCart = async (event, FoodId, quantity) => { 
    event.preventDefault();
    console.log('ordered item');
    try {
      const response = await axios.post(`${apiKey}/cart_items.json`, { 
        food_id: FoodId, 
        cart_id: 1,
        quantity: quantity
      })
      if(response.status === 201) {  
        console.log('successfully added to cart', response.data)
      } else { 
        console.error('Failed to add item to cart.', response.status)
      }
    } catch(error) { 
      console.error('Error adding item to cart.', error.response ? error.response.data : error.message)
    }
  };

  return (
    <div>
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
                    <form onSubmit={(event) => handleAddToCart(event, foodItem.id, foodItem.quantity)}>
                      <div className="form-group">
                        Quantity: 
                        <input
                          type='number'
                          min='1'
                          defaultValue={1}
                          onChange={(event) => foodItem.quantity = event.target.value} // updates quantity on change
                        />
                      </div>
                      <div className="button-container">
                        <button type="submit" className="order-button">Add to Cart</button>
                        <button 
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
    </div>

      <Modal show={isFoodVisible} onClose={handleClose}>
        {currentFood && (
          <>
            <h1>{currentFood.name}</h1>
            <p>{currentFood.description}</p>
            <img className="image" src={currentFood.image_url} alt={currentFood.name} />
            <p>Price: {currentFood.price}</p>
            <p>Inventory: {currentFood.inventory}</p>
          </>
        )}
      </Modal>
      <Footer/>
    </div>
  );
}
