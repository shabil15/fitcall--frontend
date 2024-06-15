import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Navbar from "../../components/users/Navbar";
import Footer from "../../components/users/Footer";
import { useGetTrainerDetailsMutation, useSetTrainerMutation } from "../../slices/userApiSlice";
import { RootState } from "../../app/store";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import {useCreateConversationMutation} from '../../slices/chatApiSlice';
import { IoChatboxSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

function MyTrainer() {
  const [activeTab, setActiveTab] = useState(1);
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const [getTrainerDetails] = useGetTrainerDetailsMutation();
  const [trainerDetails, setTrainerDetails] = useState(null);
  const navigate = useNavigate();
  const [conversation] = useCreateConversationMutation();
  
  const trainerId = userInfo?.trainerId;
  
  useEffect(() => {
    const fetchTrainerDetails = async () => {
      try {
        const { data } = await getTrainerDetails(trainerId).unwrap();
        setTrainerDetails(data);
      } catch (error) {
        console.error("Error fetching trainer details:", error);
        toast.error("Failed to fetch trainer details.");
      }
    };

    if (trainerId) {
      fetchTrainerDetails();
    }
  }, [trainerId, getTrainerDetails]);

  const handleChat = async (receiverId: string) => {
    try {
      const res = await conversation({
        senderId: userInfo?._id,
        receiverId,
      }).unwrap();
      navigate("/chat", {
        state: { conversationData: res.newConversation.data },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleTabClick = (tabId: number) => {
    setActiveTab(tabId);
  };

  return (
    <div className="bg-secondary text-white">
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
              TRAINER
            </span>
          </h1>
          <h1 className="text-3xl font-extrabold italic text-secondary mt-3">
            INFO
          </h1>
        </div>
      </div>

      {trainerDetails ? (
        <>
          <div className="md:flex md:text-center align-center md:px-52">
            <img
              src={trainerDetails?.profile_img}
              alt="user Profile Image"
              className="h-60 w-48 object-cover rounded-lg shadow-xl mt-16 "
            />
            <div className="mt-16 mx-16">
              <h1 className=" text-primary shadow-sm text-start font-bold text-2xl pb-2">
                {trainerDetails?.name}
              </h1>
              <div className="flex items-start  space-x-1">
                <input
                  type="radio"
                  id="star5"
                  name="rating"
                  value="5"
                  className="sr-only"
                />
                <label
                  htmlFor="star5"
                  className="text-yellow-400 text-2xl cursor-pointer"
                >
                  &#9733;
                </label>

                <input
                  type="radio"
                  id="star4"
                  name="rating"
                  value="4"
                  className="sr-only"
                />
                <label
                  htmlFor="star4"
                  className="text-yellow-400 text-2xl cursor-pointer"
                >
                  &#9733;
                </label>

                <input
                  type="radio"
                  id="star3"
                  name="rating"
                  value="3"
                  className="sr-only"
                />
                <label
                  htmlFor="star3"
                  className="text-yellow-400 text-2xl cursor-pointer"
                >
                  &#9733;
                </label>

                <input
                  type="radio"
                  id="star2"
                  name="rating"
                  value="2"
                  className="sr-only"
                />
                <label
                  htmlFor="star2"
                  className="text-yellow-400 text-2xl cursor-pointer"
                >
                  &#9733;
                </label>

                <input
                  type="radio"
                  id="star1"
                  name="rating"
                  value="1"
                  className="sr-only"
                />
                <label
                  htmlFor="star1"
                  className="text-yellow-400 text-2xl cursor-pointer"
                >
                  &#9733;
                </label>
                <button
                      onClick={() => handleChat(trainerDetails?._id)}
                      className="bg-gray-300 p-3 my-1 rounded-full shadow-md flex justify-center font-medium text-primary gap-2 items-center font-Sans "
                    >
                      <IoChatboxSharp />
                    </button>
              </div>

              <h3 className="text-white text-start pb-2 text-base">
                {trainerDetails?.specialisation}
              </h3>
              <p
                className="text-white text-start text-sm w-1/"
                style={{ whiteSpace: "pre-wrap" }}
              >
                {trainerDetails?.description}
              </p>
            </div>
          </div>
          <div className="max-w-3xk mx-auto px-8  sm:px-0 mt-16">
            <div className="sm:w-7/12 sm:mx-auto">
              <div
                role="tablist"
                aria-label="tabs"
                className="relative w-max mx-auto h-12 grid grid-cols-3 items-center px-[3xl] rounded-full overflow-hidden shadow-xl shadow-900/20 transition"
              >
                <div className="absolute top-0 left-0 bg-white shadow-md"></div>
                <button
                  role="tab"
                  aria-selected={activeTab === 1 ? "true" : "false"}
                  aria-controls="panel-1"
                  id="tab-1"
                  tabIndex={0}
                  className={`relative block h-10 px-6 tab rounded-full ${
                    activeTab === 1
                      ? "bg-primary text-secondary font-bold"
                      : "text-gray-500"
                  }`}
                  onClick={() => handleTabClick(1)}
                >
                  <span className="">EXPERIENCE</span>
                </button>
                <button
                  role="tab"
                  aria-selected={activeTab === 2 ? "true" : "false"}
                  aria-controls="panel-2"
                  id="tab-2"
                  tabIndex={1}
                  className={`relative block h-10 px-6 tab rounded-full ${
                    activeTab === 2
                      ? "bg-primary text-secondary font-bold"
                      : "text-gray-500"
                  }`}
                  onClick={() => handleTabClick(2)}
                >
                  <span>QUALIFICATION</span>
                </button>
                <button
                  role="tab"
                  aria-selected={activeTab === 3 ? "true" : "false"}
                  aria-controls="panel-3"
                  id="tab-3"
                  tabIndex={2}
                  className={`relative block h-10 px-6 tab rounded-full ${
                    activeTab === 3
                      ? "bg-primary text-secondary font-bold"
                      : "text-gray-500"
                  }`}
                  onClick={() => handleTabClick(3)}
                >
                  <span>REVIEWS</span>
                </button>
              </div>
              <div className="relative rounded-xl h-auto border border-opacity-5 border-gray-900 shadow-xl">
                <div
                  id="panel-1"
                  className={`tab-panel p-6 transition duration-300 ${
                    activeTab === 1 ? "block" : "hidden"
                  }`}
                  role="tabpanel"
                >
                  <p style={{ whiteSpace: "pre-wrap" }}>{trainerDetails?.experience}</p>
                </div>
                <div
                  id="panel-2"
                  className={`tab-panel p-6 transition duration-300 ${
                    activeTab === 2 ? "block" : "hidden"
                  }`}
                  role="tabpanel"
                >
                  <p className="text-white text-center mb-3 text-2xl font-bold  ">
                    Certificate
                  </p>
                  <div className="mt-3 flex justify-center">
                    <img
                      className="w-auto h-auto  object-cover cursor-pointer"
                      src={trainerDetails?.certificate}
                      alt="Test Result"
                    />
                  </div>
                </div>
                <div
                  id="panel-3"
                  className={`tab-panel p-6 transition duration-300 ${
                    activeTab === 3 ? "block" : "hidden"
                  }`}
                  role="tabpanel"
                >
                  <p>Third tab content goes here.</p>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center h-64">
          <p className="text-white">Loading...</p>
        </div>
      )}
      
      <Footer />
    </div>
  );
}

export default MyTrainer;
