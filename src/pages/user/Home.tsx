import React from 'react';
import Navbar from '../../components/users/Navbar';
import Hero from '../../components/users/Hero';
import LandingPage from '../../components/users/LandingPage';
import Footer from '../../components/users/Footer';

 
function Home() {
  return (
    <div className='bg-secondary'>
      <Navbar/>
      <Hero />
      <LandingPage />
      <Footer/>
    </div>
  )
}

export default Home