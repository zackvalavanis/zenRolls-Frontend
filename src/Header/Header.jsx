import { Link } from 'react-router-dom'
import './Header.css'

export function Header () { 
  return ( 
    <div className='header-container'>
      <div className='navigation-links'>
        <h1>
        <Link to='/'>Home</Link>
        </h1>
      </div>
    </div>
  )
}