import React from 'react'

function Hero() {
  return (
    <div>
  

<section
  className="relative bg-[url(../../../src/assets/pexels-leon-ardho-1552242.jpg)] bg-cover bg-center bg-no-repeat"
>
<div className="absolute inset-0 bg-black bg-opacity-60"></div>

  <div
    className="absolute inset-0 sm:bg-transparent ltr:sm:bg-gradient-to-r rtl:sm:bg-gradient-to-l"
  ></div>

  <div
    className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8"
  >
    <div className="max-w-xl  ltr:sm:text-left rtl:sm:text-right">
      <h1 className="text-7xl font-extrabold text-primary sm:text-9xl ">
        Be Your 
        <strong className="text-customFont text-white"> Best Self </strong>
      </h1>

      <p className="mt-4 max-w-lg text-white text-2xl sm:text-xl/relaxed">
      with FitCall, Start now.
      </p>

      <div className="mt-8 flex  flex-wrap gap-4 text-center">
        <a
          href="#"
          className="block rounded bg-primary px-12 py-3  font-medium text-black shadow focus:outline-none   "
        >
          Get Started
        </a>

      </div>
    </div>
  </div>
</section>
    </div>
  )
}

export default Hero