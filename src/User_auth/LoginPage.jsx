import axios from "axios";
import { useState } from "react";
import './LoginPage.css'

const jwt = localStorage.getItem("jwt");
if (jwt) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
}

export function LoginPage() {
  const [errors, setErrors] = useState([]);
  const apiKey = import.meta.env.VITE_API_KEY

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors([]);
    const params = new FormData(event.target);
    axios
      .post(`${apiKey}/sessions.json`, params)
      .then((response) => {
        console.log(response.data);
        axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.jwt;
        localStorage.setItem("jwt", response.data.jwt);
        event.target.reset();
        window.location.href = "/"; // Change this to hide a modal, redirect to a specific page, etc.
      })
      .catch((error) => {
        console.log(error.response);
        setErrors(["Invalid email or password"]);
      });
  };

  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'center'}}>
        <p >To try the order functionality, use the test login provided below or create an account using the <a style={{ color: 'black'}}href='/signup-page'>Signup Page</a>.</p>
        <p>Email: bob@email.com</p>
        <p>Password: password</p>
      </div>
  <div className='login-page' id="login">
    <div className='login'>
      <h1 className='header-login'>Login</h1>
      <ul>
        {errors.map((error) => (
          <li key={error}>{error}</li>
        ))}
      </ul>
      <div className='form'>
        <form onSubmit={handleSubmit}>
          <div>
            <label className='form-label' htmlFor='Email'>Email:</label>
            <input className='form-input' name="email" type="email" />
          </div>
          <div>
            <label className='form-label' htmlFor='password'>Password:</label>
            <input className='form-input' name="password" type="password" />
          </div>
          <button className='login-button' type="submit">Login</button>
        </form>
      </div>
    </div>
  </div>
  </div>
  );
}