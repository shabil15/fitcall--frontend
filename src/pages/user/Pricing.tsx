import Navbar from '../../components/users/Navbar';
import Footer from '../../components/users/Footer';
import { loadStripe,Stripe  } from "@stripe/stripe-js";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
const public_stripe_key = 'pk_test_51PIo52SH9t7Bwd2YBOEZkvSjrfLfJwzyPXAAWLPuIqs3TWpaT4ErRl4DB8ReSZzGKu8tAdjJ96rU5YdkyDMyqc3M00Ppk33Q2p'
import { usePaymentMutation } from '../../slices/userApiSlice';
function  Pricing() {


     const {userInfo} =useSelector((state:RootState)=> state.auth);
     const [payment] = usePaymentMutation();
    const handlePurchase = async (amount: number) => {
        

        const stripePromise: Stripe | null  = await loadStripe(public_stripe_key);

        const userId = userInfo?._id
        const email = userInfo?.email

        console.log("Stripe entered ");
        const res = await payment({ amount,email,userId }).unwrap()
        const session = res;
        console.log(res)

        if (stripePromise) {
            stripePromise.redirectToCheckout({
                sessionId: session.data
            });
        } else {
            console.error('Failed to initialize Stripe');
            // Handle the error appropriately
        }

    }
  return (
    <div className="bg-secondary ">
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
              OUR 
            </span>
          </h1>
          <h1 className="text-3xl font-extrabold italic text-secondary mt-3">
            PRICING
          </h1>
        </div>
      </div>

      <div className="h-full max-[400px]:p-2 w-full flex items-center flex-col justify-center ">
        
      </div>
      <section className="relative bg-secondary bg-[url('../../../src/assets/pexels-li-sun-2294361.jpg')] bg-cover bg-no-repeat">
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>

<div
  className="absolute inset-0 sm:bg-transparent ltr:sm:bg-gradient-to-r rtl:sm:bg-gradient-to-l"
></div>
  <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
      <div className=" relative mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold font-customFont text-white ">Start Your Journey with FitCall</h2>
          <p className="mb-5 font-light  sm:text-xl text-white">Achieve Your Fitness Goals with Our Tailored Plans - Flexible Monthly Options or Year-Round Commitment</p>
      </div>
      <div className="space-y-8 lg:grid lg:grid-cols-2 sm:gap-6 xl:gap-10 lg:space-y-0">      
          <div className="flex flex-col p-6 mx-auto max-w-lg text-center  text-white backdrop-filter backdrop-blur-sm bg-opacity-10 border border-white-100 rounded-lg shadow dark:border-white-600 xl:p-8 ">
              <h3 className="mb-4 text-2xl font-semibold">MONTHLY PLAN</h3>
              <p className="font-light text-white sm:text-lg ">Ideal for users looking for flexibility with short-term commitment.</p>
              <div className="flex justify-center items-baseline my-8">
                  <span className="mr-2 text-5xl font-extrabold">₹3999</span>
                  <span className="text-white ">/month</span>
              </div>
              
              <ul role="list" className="mb-8 space-y-4 text-left">
                  <li className="flex items-center space-x-3">
                     
                      <svg className="flex-shrink-0 w-5 h-5 text-green-500 " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                      <span>Personalised training for one month</span>
                  </li>
                  <li className="flex items-center space-x-3">
                      
                      <svg className="flex-shrink-0 w-5 h-5 text-green-500 " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                      <span>Access to one dedicated trainer</span>
                  </li>
                  <li className="flex items-center space-x-3">
                      
                      <svg className="flex-shrink-0 w-5 h-5 text-green-500 " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                      <span>Video Call Sessions with Trainer</span>
                  </li>
                  <li className="flex items-center space-x-3">
                      
                      <svg className="flex-shrink-0 w-5 h-5 text-green-500 " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                      <span>Customized nutrition and diet plans</span>
                  </li>
                  <li className="flex items-center space-x-3">
                      
                      <svg className="flex-shrink-0 w-5 h-5 text-green-500 " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                      <span>Premium support (chat and email)</span>
                  </li>
              </ul>
              
              <button onClick={()=>handlePurchase(3999)}  className=" bg-primary text-secondary hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5  text-center ">Get started</button>
            
          </div>
          
          <div className="flex flex-col p-6 mx-auto max-w-lg text-center text-white backdrop-filter backdrop-blur-sm bg-opacity-10 border border-white-100 rounded-lg  shadow xl:p-8">
              <h3 className="mb-4 text-2xl font-semibold">ANNUAL PLAN</h3>
              <p className="font-light text-white sm:text-lg ">Best value with cost savings over the year with large-term commitment.</p>
              <div className="flex justify-center items-baseline my-8">
                  <span className="mr-2 text-5xl font-extrabold">₹39999</span>
                  <span className="text-white ">/year</span>
              </div>
              
              <ul role="list" className="mb-8 space-y-4 text-left">
                  <li className="flex items-center space-x-3">
                      <svg className="flex-shrink-0 w-5 h-5 text-green-500 " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                      <span>Personalised training for one year</span>
                  </li>
                  <li className="flex items-center space-x-3">
                      <svg className="flex-shrink-0 w-5 h-5 text-green-500 " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                      <span>Access to one dedicated trainer</span>
                  </li>
                  <li className="flex items-center space-x-3">
                      <svg className="flex-shrink-0 w-5 h-5 text-green-500 " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                      <span>Video Call Sessions with Trainer</span>
                  </li>
                  <li className="flex items-center space-x-3">
                      <svg className="flex-shrink-0 w-5 h-5 text-green-500 " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                      <span>Customized nutrition and diet plans</span>
                  </li>
                  <li className="flex items-center space-x-3">
                      <svg className="flex-shrink-0 w-5 h-5 text-green-500 " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                      <span>Premium support (chat and email)</span>
                  </li>
              </ul>
              <button onClick={()=>handlePurchase(39999)} className="bg-primary text-secondary hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Get started</button>
          </div>
      </div>
  </div>
</section>


      <Footer/>
    </div>
  )
}

export default Pricing
