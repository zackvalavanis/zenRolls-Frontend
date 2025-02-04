import React from 'react'
import './Footer.css'
import { Link } from 'react-router-dom'
import { LogoutLink } from '../User_auth/LogoutLink.jsx'


export function Footer({ id }) {
  return (
    <div id={id} className='footer-container'>
      <div className='pdf-menu'>
        <a href="/Menu/Menu.pdf" target="_blank" rel="noopener noreferrer">Menu PDF</a>
        <p>Number: 847-8484-9888</p>
        <p>Email: ZenRolls@email.com</p>
        <div className='link-pages'>
          <Link to='/login-page'>Login</Link>
          <Link to='/signup-page'>Signup</Link>
          <LogoutLink />
        </div>
      </div>
    </div>
  )
}