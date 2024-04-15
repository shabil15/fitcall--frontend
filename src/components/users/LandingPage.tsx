import React from 'react'

function LandingPage() {
  return (
    <div className='bg-secondary'>
      <div>

      <h1 className='text-white text-6xl pt-9  px-16 font-extrabold font-customFont  text-center'>Your Personal</h1>
      <h1 className='text-primary text-6xl pt-5 px-16 font-extrabold font-customFont text-center '>Fitness Companion</h1>
      <p className='px-36 text-white sm:text-2xl  text-center py-10'>At fitCall, we're more than a fitness platform. We're your dedicated partner, providing personalized support, expert guidance, and comprehensive resources to help you achieve your goals. Access tailored training plans, expert trainers, and community support. Start your journey with fitCall today.</p>
      </div>

      {/* {Categories} */}
      <div className="grid grid-cols-1 px-24 sm:grid-cols-4 md:grid-cols-3  py-16 lg:grid-cols-5 ">
      {/* Image 1 */}
      <div className="flex flex-col items-center">
        <img src="../../../src/assets/weighing.png" alt="Image 1" className="w-half" />
        <span className="mt-2 text-center text-white">Weight Loss</span>
      </div>

      {/* Image 2 */}
      <div className="flex flex-col items-center">
        <img src="../../../src/assets/Muscle.png" alt="Image 2" className="w-half" />
        <span className="mt-2 text-center text-white">Muscle Gain</span>
      </div>

      {/* Image 3 */}
      <div className="flex flex-col items-center">
        <img src="../../../src/assets/Pulse.png" alt="Image 3" className="w-half" />
        <span className="mt-2 text-center text-white">Cardio Fitness</span>
      </div>

      {/* Image 4 */}
      <div className="flex flex-col items-center">
        <img src="../../../src/assets/Body.png" alt="Image 4" className="w-half" />
        <span className="mt-2 text-center text-white">Mind-body wellness</span>
      </div>
      {/* Image 5 */}
      <div className="flex flex-col items-center">
        <img src="../../../src/assets/Healthy Eating.png" alt="Image 5" className="w-half" />
        <span className="mt-2 text-center text-white">Nutrition and Diet</span>
      </div>
    </div>

<div className="py-3 flex items-center text-sm text-white before:flex-1 before:border-t before:border-gray-200 before:me-6 after:flex-1 after:border-t after:border-gray-200 after:ms-6">FitCall</div>

    <div>
      Hellooo
    </div>


    </div>
  )
}

export default LandingPage