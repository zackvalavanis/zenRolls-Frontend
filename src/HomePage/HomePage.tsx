import React from 'react';
import './HomePage.css';
import { Link } from 'react-router-dom'
import { Footer } from '../Footer/Footer.tsx'

export function HomePage() {

  return (
    <div>
      <div className='background-image1'>
        <header className="header">
          <h1 className='header-text'>Zen Rolls</h1>
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
      <Footer id={undefined} />
    </div>
  );
}
