// import React, { useState, useEffect } from "react";
// import Navbar from "../../components/users/Navbar";
// import Footer from "../../components/users/Footer";
// import { RootState } from "../../app/store";
// import { useSelector } from "react-redux";
// import { useGetSubscriptionHistoryMutation } from "../../slices/userApiSlice";
// import { formatDate } from "../../utils/formateDate";
// import { FaCheckCircle } from "react-icons/fa";

// function SubscriptionHistory() {
//   const { userInfo } = useSelector((state: RootState) => state.auth);
//   const [subscriptions, setSubscriptions] = useState([]);
//   const [isLoading, setIsLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   const [getSubscriptionHistory] = useGetSubscriptionHistoryMutation();
//   const userId = userInfo?._id;

//   useEffect(() => {
//     const fetchSubscriptionHistory = async () => {
//       try {
//         setIsLoading(true);
//         const response = await getSubscriptionHistory(userId).unwrap();
//         setSubscriptions(response);
//       } catch (err) {
//         console.error("Error fetching subscription history:", err);
//         setError("Failed to fetch subscription history");
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     if (userId) {
//       fetchSubscriptionHistory();
//     }
//   }, [userId, getSubscriptionHistory]);

//   return (
//     <div className="bg-secondary">
//       <Navbar />
//       <div className="relative">
//         <img
//           src="../../../src/assets/header div.jpg"
//           alt=""
//           className="pt-20 h-56 w-full"
//         />
//         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center mt-8">
//           <h1 className="text-3xl font-extrabold text-white mt-5">
//             <span className="bg-secondary italic px-5 py-2 rounded-lg">
//               SUBSCRIPTION
//             </span>
//           </h1>
//           <h1 className="text-3xl font-extrabold italic text-secondary mt-3">
//             HISTORY
//           </h1>
//         </div>
//       </div>

//       {isLoading && <p>Loading...</p>}
//       {error && <p className="text-red-500">{error}</p>}
//       <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 lg:px-44 md:px-14 px-3 ">
//         {subscriptions.length > 0 ? (
//           subscriptions.map((sub, index) => (
//             <div key={index} className="bg-secondary my-4 rounded-lg shadow-2xl group mx-2">
//               <div className="grid sm:flex justify-between p-4">
//                 <div className="max-sm:flex max-sm:justify-between">
//                   <p className="text-gray-500 font-Sans">Payment Id</p>
//                   <p className="text-white font-medium font-Sans sm:mt-2">
//                     {sub?.paymentId?.toUpperCase()}
//                   </p>
//                 </div>
//                 <div className="flex gap-5 max-sm:mt-2">
//                   <div>
//                     <p className="text-gray-500 font-Sans">Subscription Status</p>
//                     <p className="text-white font-Sans font-medium mt-2">
//                       {sub?.isActive ? "Active" : "Inactive"}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//               <hr />
//               <div className="flex md:p-5">
//                 <div className="ml-5">
//                   <p className="text-primary font-Sans text-lg font-medium ">
//                     {sub?.plan} Plan
//                   </p>
//                 </div>
//               </div>
//               <div className="sm:flex justify-between px-5 max-sm:mt-2 ">
//                 <div className="text-gray-500 gap-3 font-Sans flex max-sm:text-sm">
//                   <span className="text-white font-medium font-Sans mb-2">
//                     {formatDate(sub?.start)} - {formatDate(sub?.end)}
//                   </span>
//                 </div>
//                 <div className="text-primary font-Sans font-medium max-sm:mt-2">
//                   ₹{sub?.amount}/-
//                 </div>
//               </div>
//             </div>
//           ))
//         ) : (
//           !isLoading && <p className="text-white">No subscription history found.</p>
//         )}
//       </div>
//       <Footer />
//     </div>
//   );
// }

// export default SubscriptionHistory;
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { useGetSubscriptionHistoryMutation } from "../../slices/userApiSlice";
import { formatDate } from "../../utils/formateDate";
import Navbar from "../../components/users/Navbar";
import Footer from "../../components/users/Footer";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "../../utils/cn"; // Adjust the path to your cn utility

const SubscriptionHistory = () => {
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const [subscriptions, setSubscriptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const [getSubscriptionHistory] = useGetSubscriptionHistoryMutation();
  const userId = userInfo?._id;

  useEffect(() => {
    const fetchSubscriptionHistory = async () => {
      try {
        setIsLoading(true);
        const response = await getSubscriptionHistory(userId).unwrap();
        setSubscriptions(response);
      } catch (err) {
        console.error("Error fetching subscription history:", err);
        setError("Failed to fetch subscription history");
      } finally {
        setIsLoading(false);
      }
    };

    if (userId) {
      fetchSubscriptionHistory();
    }
  }, [userId, getSubscriptionHistory]);

  return (
    <div className="bg-secondary min-h-screen">
      <Navbar />
      <div className="relative">
        <img
          src="../../../src/assets/header div.jpg"
          alt="Header"
          className="pt-20 h-56 w-full object-cover"
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center mt-8">
          <h1 className="text-3xl font-extrabold text-white mt-5">
            <span className="bg-secondary italic px-5 py-2 rounded-lg">
              SUBSCRIPTION
            </span>
          </h1>
          <h1 className="text-3xl font-extrabold italic text-secondary mt-3">
            HISTORY
          </h1>
        </div>
      </div>

      {isLoading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2  px-20 py-10 gap-4">
        {subscriptions.map((sub, index) => (
          <div
            key={index}
            className="relative group bg-secondary my-4 rounded-lg shadow-2xl mx-2 p-4 overflow-hidden hover:bg-opacity-90 transition duration-300"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <AnimatePresence>
              {hoveredIndex === index && (
                <motion.span
                  className="absolute inset-0 h-full w-full bg-black bg-opacity-20 block"
                  layoutId="hoverBackground"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { duration: 0.15 } }}
                  exit={{ opacity: 0, transition: { duration: 0.15, delay: 0.2 } }}
                />
              )}
            </AnimatePresence>
            <div className="relative z-10 p-4">
              {/* Header */}
              <div className="grid sm:flex justify-between p-4">
                <div className="max-sm:flex max-sm:justify-between">
                  <p className="text-gray-500 font-Sans">Payment Id</p>
                  <p className="text-white font-medium font-Sans sm:mt-2">
                    {sub?.paymentId?.toUpperCase()}
                  </p>
                </div>
                <div className="flex gap-5 max-sm:mt-2">
                  <div>
                    <p className="text-gray-500 font-Sans">Subscription Status</p>
                    <p className="text-white font-Sans font-medium mt-2">
                      {sub?.isActive ? "Active" : "Inactive"}
                    </p>
                  </div>
                </div>
              </div>
              <hr />
              {/* Section */}
              <div className="flex md:p-5">
                <div className="ml-5">
                  <p className="text-primary font-Sans text-lg font-medium">
                    {sub?.plan} Plan
                  </p>
                </div>
              </div>
              <div className="sm:flex justify-between px-5 max-sm:mt-2">
                <div className="text-gray-500 gap-3 font-Sans flex max-sm:text-sm">
                  <span className="text-white font-medium font-Sans mb-2">
                    {formatDate(sub?.start)} - {formatDate(sub?.end)}
                  </span>
                </div>
                <div className="text-primary font-Sans font-medium max-sm:mt-2">
                  ₹{sub?.amount}/-
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default SubscriptionHistory;
