import React from 'react'
import Navbar from '../../components/trainers/Navbar'
import Hero from '../../components/trainers/Hero'
import Footer from '../../components/trainers/Footer'
import LandingPage from '../../components/trainers/LandingPage'

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