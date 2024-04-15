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
      <div className='bg-primary w-full h-28 my-10'></div>
      <Footer/>
      </div>
    
  )
}

export default Home