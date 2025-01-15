import React from 'react'
import './Footer.css'
import { Link } from 'react-router-dom'
import { LogoutLink } from '../User_auth/LogoutLink.jsx'


export function Footer() {
  return (
    <div className='footer-container'>
      <h1>Copywrite Zen Rolls 2024</h1>
      <div className='pdf-menu'>
        <a href="/Menu/Menu.pdf" target="_blank" rel="noopener noreferrer">Menu PDF</a>
        <p>Number: 847-8484-9888</p>
        <p>Email: ZenRolls@email.com</p>
        <div className='link-pages'>
          <Link to='/LoginPage'>Login</Link>
          <Link to='/SignupPage'>Signup</Link>
          <LogoutLink />
        </div>
      </div>
    </div>
  )
}