// @ts-nocheck 

import Navbar from "../../components/users/Navbar";
import Footer from "../../components/users/Footer";
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../utils/formateDate";
import { useCancelSubscriptionMutation } from "../../slices/userApiSlice";
import { toast } from "react-toastify";
import { MyError } from "../../validation/validationTypes";
import { setCredential } from "../../slices/authSlice";
import {useGetUserMutation} from "../../slices/userApiSlice";
const public_stripe_key = 'pk_test_51PIo52SH9t7Bwd2YBOEZkvSjrfLfJwzyPXAAWLPuIqs3TWpaT4ErRl4DB8ReSZzGKu8tAdjJ96rU5YdkyDMyqc3M00Ppk33Q2p'
import { usePaymentMutation } from '../../slices/userApiSlice';
import { loadStripe,Stripe  } from "@stripe/stripe-js";
import Swal from 'sweetalert2';


function Myplan() {
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const startDate = userInfo?.subscriptions?.length
    ? formatDate(
        userInfo.subscriptions[userInfo.subscriptions.length - 1].start
      )
    : null;
    const startDates = userInfo?.subscriptions?.length
    ? new Date(userInfo?.subscriptions[userInfo.subscriptions.length - 1].start)
    : null;
  const expiryDate = userInfo?.subscriptions?.length
    ? formatDate(userInfo.subscriptions[userInfo.subscriptions.length - 1].end)
    : null;
  const [cancelSubscription] = useCancelSubscriptionMutation();
  const [getUser] = useGetUserMutation();
  const userId = userInfo?._id;
  const dispatch = useDispatch();
  const currentDate = new Date();
  const diff = startDate ? (currentDate.getTime() - startDates.getTime()) / (1000 * 3600 * 24) : null;
  const email = userInfo?.email;

  const [payment] = usePaymentMutation();
  const handlePurchase = async (amount: number) => {
        
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Commits you to a one-year plan with a dedicated trainer, video calls, customized nutrition plans, and premium support. Subscription upgrades immediately with prorated charges; cancellations may not refund partial months. ",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3BE48B",
      cancelButtonColor: "#3d3636",
      confirmButtonText: "Yes, upgrade it",
      customClass: {
        popup: "swal-custom-background",
        title: "swal2-title",
        content: "swal2-content",
        confirmButton: "swal2-confirm",
      },
    });
    if (result.isConfirmed) {
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
}
  
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getUser(email).unwrap();
        dispatch(setCredential({ ...res.user }));
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    
    fetchUser();
  }, [getUser, email, dispatch]);

  const handleCancelSubscription = async () => {
  const result = await Swal.fire({
    title: "Are you sure?",
    text: "This action will cancel your subscription.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3BE48B",
    cancelButtonColor: "#3d3636",
    confirmButtonText: "Yes, cancel it",
    customClass: {
      popup: "swal-custom-background",
      title: "swal2-title",
      content: "swal2-content",
      confirmButton: "swal2-confirm",
    },
  });

  if (result.isConfirmed) {
    try {
      const res = await cancelSubscription(userId).unwrap();
      dispatch(setCredential({ ...res.user }));
      console.log("res: ", res);
      toast.success(res.message);
    } catch (error) {
      console.error("Error cancelling subscription:", error);
      toast.error(
        (error as MyError)?.data?.message || (error as MyError)?.error || "An error occurred."
      );
    }
  }
};
  return (
    <div className="bg-secondary">
      <Navbar />
      <div className="relative">
        <img
          src="/assets/header div.jpg"
          alt=""
          className="pt-20 h-56 w-full"
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center mt-8">
          <h1 className="text-3xl font-extrabold text-white mt-5">
            <span className="bg-secondary italic px-5 py-2 rounded-lg">
              CURRENT
            </span>
          </h1>
          <h1 className="text-3xl font-extrabold italic text-secondary mt-3">
            PLAN
          </h1>
        </div>
      </div>
      <section className="relative bg-secondary bg-[url('/assets/pexels-li-sun-2294361.jpg')] bg-cover bg-no-repeat">
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="absolute inset-0 sm:bg-transparent ltr:sm:bg-gradient-to-r rtl:sm:bg-gradient-to-l"></div>
        {userInfo?.isSubscribed ? (
          <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
            <div className="relative mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
              <h2 className="mb-4 text-4xl tracking-tight font-extrabold font-customFont text-white ">
                Start Your Journey with FitCall
              </h2>
              <p className="mb-5 font-light sm:text-xl text-white">
                JOINED DATE: <span className="font-extrabold">{startDate}</span>
              </p>
              <p className="mb-5 font-light sm:text-xl text-white">
                EXPIRY DATE:{" "}
                <span className="font-extrabold">{expiryDate}</span>
              </p>
            </div>

            {userInfo.subscriptions[userInfo.subscriptions.length - 1].plan ===
            "Monthly" ? (
              <div>
              <div className="space-y-8 lg:grid lg:grid-cols-1 sm:gap-6 xl:gap-10 lg:space-y-0">
                <div className="flex flex-col p-6 mx-auto max-w-lg text-center text-white backdrop-filter backdrop-blur-sm bg-opacity-10 border border-white-100 rounded-lg shadow dark:border-white-600 xl:p-8">
                  <h3 className="mb-4 text-2xl font-semibold">MONTHLY PLAN</h3>
                  <p className="font-light text-white sm:text-lg">
                    Ideal for users looking for flexibility with short-term
                    commitment.
                  </p>
                  <div className="flex justify-center items-baseline my-8">
                    <span className="mr-2 text-5xl font-extrabold">₹3999</span>
                    <span className="text-white">/month</span>
                  </div>

                  <ul role="list" className="mb-8 space-y-4 text-left">
                    <li className="flex items-center space-x-3">
                      <svg
                        className="flex-shrink-0 w-5 h-5 text-green-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      <span>Personalised training for one month</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <svg
                        className="flex-shrink-0 w-5 h-5 text-green-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      <span>Access to one dedicated trainer</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <svg
                        className="flex-shrink-0 w-5 h-5 text-green-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      <span>Video Call Sessions with Trainer</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <svg
                        className="flex-shrink-0 w-5 h-5 text-green-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      <span>Customized nutrition and diet plans</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <svg
                        className="flex-shrink-0 w-5 h-5 text-green-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      <span>Premium support (chat and email)</span>
                    </li>
                  </ul>
                  {diff !== null && diff < 3 ? (
                    <div>
                    <p>
                      You can cancel your subscription within the first 3 days
                      after the start date.
                    </p>
                  
                  <button
                    onClick={handleCancelSubscription}
                    className="mt-4 bg-primary text-secondary hover:bg-green-700 hover:text-white font-bold transition-colors py-2 px-4 rounded-lg"
                  >
                    Cancel Subscription
                  </button>
                  </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
                  <div className="flex justify-center relative">
                  <button
                    onClick={()=>handlePurchase(36000)} 
                    className="mt-4 bg-primary text-secondary hover:bg-green-700 hover:text-white font-bold transition-colors py-2 px-4 rounded-lg"
                  >
                    Upgrade to Annual Subscription
                  </button>
                  </div>
              </div>
            ) : (
              <div className="flex flex-col p-6 mx-auto max-w-lg text-center text-white backdrop-filter backdrop-blur-sm bg-opacity-10 border border-white-100 rounded-lg  shadow xl:p-8">
                <h3 className="mb-4 text-2xl font-semibold">ANNUAL PLAN</h3>
                <p className="font-light text-white sm:text-lg ">
                  Best value with cost savings over the year with large-term
                  commitment.
                </p>
                <div className="flex justify-center items-baseline my-8">
                  <span className="mr-2 text-5xl font-extrabold">₹39999</span>
                  <span className="text-white ">/year</span>
                </div>

                <ul role="list" className="mb-8 space-y-4 text-left">
                  <li className="flex items-center space-x-3">
                    <svg
                      className="flex-shrink-0 w-5 h-5 text-green-500 "
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    <span>Personalised training for one year</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <svg
                      className="flex-shrink-0 w-5 h-5 text-green-500 "
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    <span>Access to one dedicated trainer</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <svg
                      className="flex-shrink-0 w-5 h-5 text-green-500 "
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    <span>Video Call Sessions with Trainer</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <svg
                      className="flex-shrink-0 w-5 h-5 text-green-500 "
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    <span>Customized nutrition and diet plans</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <svg
                      className="flex-shrink-0 w-5 h-5 text-green-500 "
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    <span>Premium support (chat and email)</span>
                  </li>
                </ul>
                {diff !== null && diff < 3 ? (
                  
                    <div>
                    <p>
                      You can cancel your subscription within the first 3 days
                      after the start date.
                    </p>
                  
                  <button
                    onClick={handleCancelSubscription}
                    className="mt-4 bg-primary text-secondary hover:bg-green-700 hover:text-white font-bold transition-colors py-2 px-4 rounded-lg"
                  >
                    Cancel Subscription
                  </button>
                  </div>
                  ) : (
                    ""
                  )}
                
              </div>
            )}
          </div>
        ) : (
          // <div className="relative h-svh flex justify-center  items-center text-center">
          //   <h1 className="text-4xl tracking-tight font-extrabold font-customFont text-white ">
          //     You have no Subscription plan
          //   </h1>
          //   <button
          //     onClick={() => navigate("/pricing")}
          //     className="bg-primary font-bold text-secondary rounded-lg p-4 mx-4"
          //   >
          //     TAKE A PLAN{" "}
          //   </button>
          // </div>
          <div className="flex justify-center relative items-center mt-10">
    <img src="/assets/9264822.png" alt="No Subscriptions" className="w-full max-w-md" />
    < h1 className="text-white text-2xl ">You have no Subscription plan</h1>
    <button
            onClick={() => navigate("/pricing")}
             className="bg-primary font-bold text-secondary rounded-lg p-4 mx-4"
             >
              TAKE A PLAN{" "}
            </button>

  </div>
        )}
      </section>
      :
      <Footer />
    </div>
  );
}

export default Myplan;