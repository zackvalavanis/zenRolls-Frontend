import './HomePage.css';
import { Link } from 'react-router-dom'

export function HomePage() {
  return (
    <div>
      <div className='background-image1'>
      <header className="header">
        <Link to='/' className='link'>Home </Link>
        <Link to='/' className='link'>Menu</Link>
      </header>
      <section className="section1"></section>

      </div>
      <section className="section2"></section>
      <section className="section3"></section>
    </div>
  );
}
