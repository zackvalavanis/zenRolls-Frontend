import React from 'react'
import './Footer.css'
import { Link } from 'react-router-dom'
import { LoginPage } from './User_auth/LoginPage.jsx'
// import { Logout } from './User_auth/Logout.jsx'
import { SignupPage } from './User_auth/SignupPage.jsx'


export function Footer() {
  return (
    <div className='footer-container'>
      <h1>Copywrite Zen Rolls 2024</h1>
      <div className='pdf-menu'>
        <a href="/Menu/Menu.pdf" target="_blank" rel="noopener noreferrer">Menu PDF</a>
        <p>Number: 847-8484-9888</p>
        <p>Email: ZenRolls@email.com</p>
        <Link to='/LoginPage'>Login</Link>
      </div>
    </div>
  )
}