import { TracingBeam } from '../ui/TracingBeam';

function LandingPage() {
  return (
    <div className='bg-secondary text-customFont scroll-smooth'>
      <div className='' data-aos="fade-up">

      <h1 className=' text-white text-5xl pt-9  px-16 font-extrabold font-customFont  text-center'>Your Personal</h1>
      <h1 className='text-primary text-5xl pt-5 px-16 font-extrabold font-customFont text-center '>Training Hub</h1>
      <p className=' text-white sm:text-2xl  text-center py-8 md:px-16 '>As a dedicated fitness professional, your unwavering passion for guiding others toward their fitness aspirations fuels your every endeavor. Here at fitCall, we recognize and honor that dedication by equipping you with an arsenal of cutting-edge tools and unwavering support. With our platform, you're empowered to forge profound transformations in the lives of your clients, turning their fitness dreams into tangible realities.</p>
      </div>

      {/* {Categories} */}
      <div className="grid grid-cols-5 px-24 sm:grid-cols-4 md:grid-cols-3 py-16 lg:grid-cols-5 gap-4 sm:gap-8 md:gap-4 lg:gap-0 " data-aos="fade-up">
      {/* Image 1 */}
      <div className="flex flex-col items-center ">
        <img src="../../../public/assets/weighing.png" alt="Image 1" className="w-half" />
        <span className=" mt-2 text-center text-white hidden md:inline-block">Weight Loss</span>
      </div>

      {/* Image 2 */}
      <div className="flex flex-col items-center">
        <img src="../../../public/assets/Muscle.png" alt="Image 2" className="w-half" />
        <span className="mt-2 text-center text-white hidden md:inline-block">Muscle Gain</span>
      </div>

      {/* Image 3 */}
      <div className="flex flex-col items-center">
        <img src="../../../public/assets/Pulse.png" alt="Image 3" className="w-half" />
        <span className="mt-2 text-center text-white hidden md:inline-block">Cardio Fitness</span>
      </div>

      {/* Image 4 */}
      <div className="flex flex-col items-center">
        <img src="../../../public/assets/Body.png" alt="Image 4" className="w-half" />
        <span className="mt-2 text-center text-white hidden md:inline-block ">Mind-body wellness</span>
      </div>
      {/* Image 5 */}
      <div className="flex flex-col items-center ">
        <img src="../../../public/assets/Healthy Eating.png" alt="Image 5" className="w-half" />
        <span className="mt-2 text-center text-white hidden md:inline-block ">Nutrition and Diet</span>
      </div>
    </div>

{/* <div className="py-3 flex items-center text-sm text-white before:flex-1 before:border-t before:border-gray-200 before:me-6 after:flex-1 after:border-t after:border-gray-200 after:ms-6"></div> */}

<div className="text-center p-8" >
<TracingBeam className="px-6">

    <h2 className="font-bold  text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl" data-aos="fade-up">
        Why to choose <span className='text-primary'>FitCall?</span>
    </h2>

    <div className="flex flex-wrap items-center mt-20 text-left text-white text-center" data-aos="fade-up">
        <div className="w-full md:w-3/5 lg:w-1/2 px-4">
            <img src="../../../public/assets/pexels-pixabay-209969.jpg" alt="gem" className="inline-block rounded shadow-lg rounded-lg shadow-lg  shadow-black"/>
        </div>
        <div className="w-full md:w-2/5 lg:w-1/2 px-6 text-center md:text-left lg:pl-12">
            <h3 className="font-bold mt-8 text-3xl md:mt-0 md:text-4xl sm:text-2xl">
            Empower Your  <span className='text-primary block'>Clients</span>
            </h3>
            <p className="sm:text-lg mt-6">
            With fitCall, you have the opportunity to empower your clients to reach their full potential. Tailor training plans to their unique needs and guide them every step of the way towards success.
            </p>
        </div>
    </div>

    <div className="flex flex-wrap items-center mt-20 text-left text-white text-center" data-aos="fade-up">
        <div className="w-full md:w-3/5 lg:w-1/2 px-4">
            <img src="../../../public/assets/pexels-ivan-samkov-4162491.jpg" alt="project members" className="inline-block object-cover rounded-lg shadow-lg  shadow-black"/>
        </div>
        <div className="w-full md:w-2/5 lg:w-1/2 px-4 md:order-first text-center md:text-left lg:pr-12">
            <h3 className="font-bold mt-8 text-3xl md:mt-0 md:text-4xl ">
            Seamless  <span className='block text-primary'>Communication</span>
             </h3>
            <p className="sm:text-lg text-white mt-6">
            Stay connected with your clients effortlessly through our intuitive platform. Engage with them in-app, provide real-time support, and keep them motivated to achieve their goals. </p>
        </div>
    </div>

    <div className="flex flex-wrap items-center mt-20   text-white text-center" data-aos="fade-up">
        <div className=" md:w-3/5 lg:w-1/2 px-4">
            <img src="../../../public/assets/pexels-cottonbro-studio-3205403.jpg" alt="editor" className="inline-block object-cover rounded-lg shadow-lg shadow-black  "/>
        </div>
        <div className="w-full md:w-2/5 lg:w-1/2 px-4 text-center md:text-left lg:pl-12">
            <h3 className="font-bold mt-8 text-3xl md:mt-0 md:text-4xl">
            Grow Your <span className='block text-primary'>Business</span></h3>
            <p className="sm:text-lg mt-6">
            Expand your reach and grow your business with fitCall. Gain access to a diverse pool of clients and showcase your expertise <span className='block'>to a wider audience.</span>
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