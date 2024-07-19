import Navbar from '../../components/users/Navbar';
import Footer from '../../components/users/Footer';
import Lottie from 'react-lottie';
import err404 from '../../lotties/err404.json';
function Error404() {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: err404,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
        }
      };
  return (
    <div className='bg-secondary'>
    <Navbar />
    <div className="relative">
        <img
          src="../../../public/assets/header div.jpg"
          alt=""
          className="pt-20 h-56 w-full"
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center mt-8">
          <h1 className="text-3xl font-extrabold text-white mt-5">
            <span className="bg-secondary italic px-5 py-2 rounded-lg">
              404
            </span>
          </h1>
          
        </div>
      </div>
      <div className="flex justify-center items-center align-center">
      <div className=" p-8 text-white text-center">
        <h1 className="text-4xl font-bold text-primary mb-4">404 Error: Page Not Found</h1>
        <p className="text-lg mb-4">Looks like you've wandered off the fitness trail! 🤔</p>
        <p className="mb-4">Don’t worry, it happens to the best of us. Here are a few things you can try:</p>
        <ul className="list-disc list-inside mb-4 text-left">
            <li className="mb-2">Double-check the URL – Typos are like squats: annoying but necessary!</li>
            <li className="mb-2">Return to the homepage – Click <a href="/" className="text-blue-500 underline">here</a> to get back on track.</li>
        </ul>
        <p>Still lost? Maybe a quick jog will clear your head! 🏃‍♂️💨</p>
    </div>
    <div>
      <Lottie 
	    options={defaultOptions}
        height={400}
        width={400}
      />
      </div>
      </div>
      <Footer/>
    </div>
  )
}

export default Error404
