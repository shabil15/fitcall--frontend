import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { useGetSubscriptionHistoryMutation } from "../../slices/userApiSlice";
import { formatDate } from "../../utils/formateDate";
import Navbar from "../../components/users/Navbar";
import Footer from "../../components/users/Footer";
import { AnimatePresence, motion } from "framer-motion";

interface Subscription {
  paymentId: string;
  isActive: boolean;
  plan: string;
  start: string;
  end: string;
  amount: number;
}

const SubscriptionHistory = () => {
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const [getSubscriptionHistory] = useGetSubscriptionHistoryMutation();
  const userId = userInfo?._id;

  useEffect(() => {
    const fetchSubscriptionHistory = async () => {
      try {
        setIsLoading(true);
        const response = await getSubscriptionHistory(userId).unwrap();
        setSubscriptions(response);
      } catch (err) {
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
          src="/assets/header div.jpg"
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
      {subscriptions.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 px-20 py-10 gap-4">
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
      ) : (
        <div className="flex justify-center items-center mt-10">
          <img src="/assets/9264822.png" alt="No Subscriptions" className="w-full max-w-md" />
          <h1 className="text-white text-2xl">No History Available for You</h1>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default SubscriptionHistory;
