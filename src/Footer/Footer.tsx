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
          {localStorage.getItem('jwt') ? <LogoutLink /> :
            (
              <><Link to='/login-page'>Login</Link><Link to='/signup-page'>Signup</Link></>
            )}

        </div>
        <div className='order-history-container'>
          {localStorage.getItem('jwt') ? <Link
            className='order-history'
            to='/Orders'>
            Order History
          </Link> : ''}
        </div>
      </div>
    </div>
  )
}