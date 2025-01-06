import './HomePage.css';
import { Link } from 'react-router-dom'


export function HomePage() {
  return (
    <div>
      <div className='background-image1'>
      <header className="header">
        <Link to='/' className='link'>Home </Link>
        <Link to='/Menu' className='link'>Order</Link>
      </header>
      <section className="section1">
      </section>

      </div>
      <section className="section2"></section>
      <section className="section3"></section>
      <section className='section4'>
        <img 
          className='menu-image'
          src='Menu/Menu_Image.jpeg' 
          alt='Menu' 
          width='80%' 
          height='800px' 
        />
      </section>
    </div>
  );
}
