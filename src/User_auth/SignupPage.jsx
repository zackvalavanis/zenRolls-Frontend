import axios from "axios";
import { useState } from "react";
import './SignupPage.css'

export function SignupPage() {
  const [errors, setErrors] = useState([]);
  const apiKey = import.meta.env.VITE_API_KEY

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors([]);
    const params = new FormData(event.target);
    axios
      .post(`${apiKey}/users.json`, params)
      .then((response) => {
        console.log(response.data);
        event.target.reset();
        window.location.href = "/"; // Change this to hide a modal, redirect to a specific page, etc.
      })
      .catch((error) => {
        console.log(error.response.data.errors);
        setErrors(error.response.data.errors);
      });
  };

  return (
    <div className='signup-container' id="signup">
      <div className='signup'>
      <h1 className='signup-header'>Signup</h1>
      <div>
      <ul>
        {errors.map((error) => (
          <li key={error}>{error}</li>
        ))}
      </ul>
      <div className='signup-form'>
      <form onSubmit={handleSubmit}>
        <div>
          <label className='signup-label' htmlFor='name'>Name:</label>
          <input className='signup-input' name="name" type="text" />
        </div>
        <div>
          <label className='signup-label' htmlFor='email'>Email:</label>
          <input className='signup-input' name="email" type="email" />
        </div>
        <div>
          <label className='signup-label' htmlFor='password'>Password:</label>
          <input  className='signup-input' name="password" type="password" />
        </div>
        <div>
          <label className='signup-label' htmlFor='Password confirmation'>Password confirmation:</label>
          <input className='signup-input' name="password_confirmation" type="password" />
        </div>
        <button className='signup-button' type="submit">Signup</button>
      </form>
      </div>
      </div>
    </div>
  </div>
  );
}