import React from 'react'
import LandingPage from '../../components/users/LandingPage'
import Navbar from '../../components/users/Navbar'
import Footer from '../../components/users/Footer'
function AboutUs() {
  return (
    <div className='bg-secondary'>
      <Navbar />
      <div className="relative">
        <img
          src="../../../src/assets/header div.jpg"
          alt=""
          className="pt-20 h-56 w-full"
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center mt-8">
          <h1 className="text-3xl font-extrabold text-white mt-5">
            <span className="bg-secondary italic px-5 py-2 rounded-lg">
              ABOUT
            </span>
          </h1>
          <h1 className="text-3xl font-extrabold italic text-secondary mt-3">
           FITCALL
          </h1>
        </div>
      </div>
      <LandingPage/>
      <Footer />
    </div>
  )
}

export default AboutUs