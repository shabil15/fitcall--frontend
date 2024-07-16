import { TracingBeam } from '../ui/TracingBeam';


function LandingPage() {
  return (
    <div className='bg-secondary text-customFont scroll-smooth'>
      <div className='' data-aos="fade-up">
      {/* <LampContainer/> */}

      <h1 className=' text-white text-5xl pt-9  px-16 font-extrabold font-customFont  text-center'>Your Personal</h1>
      <h1 className='text-primary text-5xl pt-5 px-16 font-extrabold font-customFont text-center '>Fitness Companion</h1>

      <p className=' text-white sm:text-2xl  text-center py-8 md:px-16 '>At fitCall, we're more than a fitness platform. We're your dedicated partner, providing personalized support, expert guidance, and comprehensive resources to help you achieve your goals. Access tailored training plans, expert trainers, and community support. Start your journey with fitCall today.</p>
      </div>

      {/* {Categories} */}
      <div className="grid grid-cols-5 px-24 sm:grid-cols-4 md:grid-cols-3 py-16 lg:grid-cols-5 gap-4 sm:gap-8 md:gap-4 lg:gap-0 " data-aos="fade-up">
      {/* Image 1 */}
      <div className="flex flex-col items-center ">
        <img src="../../../src/assets/weighing.png" alt="Image 1" className="w-half" />
        <span className=" mt-2 text-center text-white hidden md:inline-block">Weight Loss</span>
      </div>

      {/* Image 2 */}
      <div className="flex flex-col items-center">
        <img src="../../../src/assets/Muscle.png" alt="Image 2" className="w-half" />
        <span className="mt-2 text-center text-white hidden md:inline-block">Muscle Gain</span>
      </div>

      {/* Image 3 */}
      <div className="flex flex-col items-center">
        <img src="../../../src/assets/Pulse.png" alt="Image 3" className="w-half" />
        <span className="mt-2 text-center text-white hidden md:inline-block">Cardio Fitness</span>
      </div>

      {/* Image 4 */}
      <div className="flex flex-col items-center">
        <img src="../../../src/assets/Body.png" alt="Image 4" className="w-half" />
        <span className="mt-2 text-center text-white hidden md:inline-block ">Mind-body wellness</span>
      </div>
      {/* Image 5 */}
      <div className="flex flex-col items-center ">
        <img src="../../../src/assets/Healthy Eating.png" alt="Image 5" className="w-half" />
        <span className="mt-2 text-center text-white hidden md:inline-block ">Nutrition and Diet</span>
      </div>
    </div>

{/* <div className="py-3 flex items-center text-sm text-white before:flex-1 before:border-t before:border-gray-200 before:me-6 after:flex-1 after:border-t after:border-gray-200 after:ms-6"></div> */}

<div className="text-center p-8" >
<TracingBeam className="px-6">

    <h2 className="font-bold  text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl" data-aos="fade-up">
        Why to choose <span className='text-primary'>FitCall?</span>
    </h2>

    <div className="flex flex-wrap items-center mt-20 text-left text-white " data-aos="fade-up">
        <div className="w-full md:w-3/5 lg:w-1/2 px-4">
            <img src="../../../src/assets/pexels-pixabay-209969.jpg" alt="gem" className="inline-block rounded shadow-lg rounded-lg shadow-lg  shadow-black"/>
        </div>
        <div className="w-full md:w-2/5 lg:w-1/2 px-6 text-center md:text-left lg:pl-12">
            <h3 className="font-bold mt-8 text-3xl md:mt-0 md:text-4xl sm:text-2xl">
            Tailored training <span className='text-primary block'>experience</span>
            </h3>
            <p className="sm:text-lg mt-6">
            Personalized training plans tailored to your goals and preferences. Guided by expert trainers every step of the way. 
            </p>
        </div>
    </div>

    <div className="flex flex-wrap items-center mt-20 text-left text-white " data-aos="fade-up">
        <div className="w-full md:w-3/5 lg:w-1/2 px-4">
            <img src="../../../src/assets/pexels-ivan-samkov-4162491.jpg" alt="project members" className="inline-block object-cover rounded-lg shadow-lg  shadow-black"/>
        </div>
        <div className="w-full md:w-2/5 lg:w-1/2 px-4 md:order-first text-center md:text-left lg:pr-12">
            <h3 className="font-bold mt-8 text-3xl md:mt-0 md:text-4xl ">
            Flexible Fitness <span className='block text-primary'>Solutions</span>
             </h3>
            <p className="sm:text-lg text-white mt-6">
            Access a diverse range of workouts and nutrition programs tailored to your lifestyle. Whether it's gym sessions, outdoor workouts, or home exercises, fitCall offers adaptable solutions for every preference            </p>
        </div>
    </div>

    <div className="flex flex-wrap items-center mt-20   text-white text-center" data-aos="fade-up">
        <div className=" md:w-3/5 lg:w-1/2 px-4">
            <img src="../../../src/assets/pexels-cottonbro-studio-3205403.jpg" alt="editor" className="inline-block object-cover rounded-lg shadow-lg shadow-black  "/>
        </div>
        <div className="w-full md:w-2/5 lg:w-1/2 px-4 text-center md:text-left lg:pl-12">
            <h3 className="font-bold mt-8 text-3xl md:mt-0 md:text-4xl">
            Video Call Sessions <span className='block text-primary'>with Trainer</span>            </h3>
            <p className="sm:text-lg mt-6">
            Start video calls with your fitness trainer via fitCall for personalized guidance. Receive support and stay accountable, all within the convenience of the app, helping you achieve your fitness goals effectively.
            </p>
        </div>
    </div>
    </TracingBeam>

</div>

{/* rEVIEWS  */}

{/* our trainers */}
    
    </div>
  )
}

export default LandingPage