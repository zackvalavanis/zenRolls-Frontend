import { Link } from 'react-router-dom'
import './Header.css'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';




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
        <div className='nav-right'>
        <Link 
          className='navigation-3'
          to='/Orders'>
          Order History
        </Link>
        <Link 
          className='navigation-2' 
          to='/cart'>
          <ShoppingCartIcon/>
        </Link>
      </div>
      </div>
  )
}