import { Link } from 'react-router-dom'
import './Header.css'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useCart } from '../Components/CartCountProvider.tsx';

export function Header () { 
  const {cartCount} = useCart()
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
          <span id='cart-count' className='cart-badge'>{cartCount}</span>
        </Link>
      </div>
      </div>
  )
}
