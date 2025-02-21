import React from 'react';
import './HomePage.css';
import { Link } from 'react-router-dom'
import { Footer } from '../Footer/Footer.tsx'

export function HomePage() {

  return (
    <div>
      <div className='background-image1'>
        <header className="header">
          <h1>Zen Rolls</h1>
          <div className='links-home'>
            <Link className='link' to='/history-page'>History</Link>
            <Link to={localStorage.jwt ? '/menu' : '/login-page'} className='link'>Order</Link>
          </div>
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
      <Footer id={undefined} />
    </div>
  );
}
