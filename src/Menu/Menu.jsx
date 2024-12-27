import axios from 'axios';
import './Menu.css';
import { useState, useEffect } from 'react';

export function Menu() {
  // State to hold food data, initially an empty array
  const [food, setFood] = useState([]);

  const handleIndex = async () => {
    console.log('handleIndex');
    try {
      // Fetch data from the API
      const response = await axios.get('http://localhost:3000/foods.json');
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

  return (
    <div>
      {Array.isArray(food) && food.length > 0 ? ( 
        food.map((item, index) => ( 
          <div key={index}>
            <h1>{item.name}</h1>
            <h1>{item.price}</h1>
            <p>{item.description}</p>
            <img src={item.image_url}></img>
          </div>
        ))
      ) : (
        <p>Loading foods...</p>
      )}
    </div>
  );
}
