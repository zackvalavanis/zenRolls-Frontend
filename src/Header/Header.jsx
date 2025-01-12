import { Link } from 'react-router-dom'
import './Header.css'

export function Header () { 
  return ( 
    <div className='header-container'>
      <Link 
        className='navigation-1' 
        to='/'>
          <img 
            className='image-logo' 
            src='./Menu/Zen_Rolls_Logo.png'
            alt='Zen Rolls Logo'
            >
          </img>
        </Link>
        <Link 
          className='navigation-2' 
          to='/Cart'>
          Your Cart
        </Link>
      </div>
  )
}