import React, { useState } from 'react';
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import Navbar from '../../components/trainers/Navbar';
import Footer from '../../components/trainers/Footer';
import { MdFoodBank, MdOutlineMail } from "react-icons/md";
import { CiMoneyCheck1 } from "react-icons/ci";
import { GoGoal } from "react-icons/go";
import { FaMobileAlt } from "react-icons/fa";
import { IoPersonSharp, IoChatboxSharp } from "react-icons/io5";
import {   FaWeightScale } from "react-icons/fa6";
import { useLocation, useNavigate } from 'react-router-dom';
import { useUpdateDietMutation } from '../../slices/userApiSlice';
import Spinner from "../../components/common/Spinner";
import { toast } from "react-toastify";
import { useCreateConversationMutation } from '../../slices/chatApiSlice';

interface Diet {
  morning: string;
  noon: string;
  evening: string;
  night: string;
  additionalInstructions: string;
}

interface Subscription {
  plan: string;
}

interface UserData {
  _id: string;
  name: string;
  email: string;
  mobile: string;
  age: number;
  weight: number;
  height: number;
  goal: string;
  profile_img: string;
  diet: Diet;
  subscriptions: Subscription[];
  testResult: string;
}

interface LocationState {
  data: UserData;
}

const ClientDetails: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(1);
  const location = useLocation();
  const { trainerInfo } = useSelector((state: RootState) => state.auth);
  const { data } = location.state as LocationState;

  const [morning, setMorning] = useState<string>(data?.diet?.morning || '');
  const [noon, setNoon] = useState<string>(data?.diet?.noon || '');
  const [evening, setEvening] = useState<string>(data?.diet?.evening || '');
  const [night, setNight] = useState<string>(data?.diet?.night || '');
  const [additionalInstructions, setAdditionalInstructions] = useState<string>(data?.diet?.additionalInstructions || '');
  const [updateDiet, { isLoading }] = useUpdateDietMutation();
  const navigate = useNavigate();
  const [createConversation] = useCreateConversationMutation();

  const userId = data?._id;

  const handleTabClick = (tabId: number) => {
    setActiveTab(tabId);
  };

  const handleChat = async (receiverId: string) => {
    try {
      const res = await createConversation({
        senderId: trainerInfo?._id,
        receiverId,
      }).unwrap();
      navigate("/trainer/chat", {
        state: { conversationData: res.newConversation.data },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await updateDiet({
        userId: data._id,
        diet: {
          morning,
          noon,
          evening,
          night,
          additionalInstructions,
        },
      }).unwrap();
      toast.success(res.message);
    } catch (err) {
      console.error('Failed to update the diet:', err);
    }
  };

  return (
    <div className='bg-secondary'>
      <Navbar />
      <div className="relative">
        <img
          src="../../../src/assets/header div.jpg"
          alt=""
          className="pt-20 h-56 w-full"
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center mt-8">
          <h1 className="text-3xl font-extrabold text-white mt-5">
            <span className="bg-secondary italic px-5 py-2 rounded-lg">CLIENT</span>
          </h1>
          <h1 className="text-3xl font-extrabold italic text-secondary mt-3">
            DETAILS
          </h1>
        </div>
      </div>

      <div className="h-full max-[400px]:p-2 w-full flex items-center flex-col justify-center">
        <div className="w-full p-4 md:px-12  md:py-4 lg:py-16 flex max-md:flex-col sm:w-[80%] items-start shadow-xl text-white rounded-3xl">
          <div className="flex flex-col items-center ">
            <div className="my-auto ">
              <div className="mt-3 flex justify-center ">
                <img
                  className="rounded-full w-40 h-40 object-cover cursor-pointer"
                  src={data?.profile_img || "/src/assets/images.png"}
                  alt=""
                />
              </div>
              {/* Hide the input element */}
              <input
                type="file"
                style={{ display: "none" }}
              />
            </div>
            <button
              onClick={() => handleChat(userId)}
              className="bg-gray-300 p-3 my-1 rounded-full shadow-md flex justify-center font-medium text-primary gap-2 items-center font-Sans "
            >
              <IoChatboxSharp />
            </button>
          </div>
          <div className="flex-grow w-full sm:w-[80%] p-4 ">
            <form action="">
              <div className="mt-5 grid grid-cols-2 gap-5 max-md:grid-cols-1">
                <div className=" shadow-xl p-3 flex rounded-lg ">
                  <div className=" flex justify-center shadow-xl items-center w-12 h-12 rounded-lg">
                    <IoPersonSharp size={26} color="#3BE48B" />
                  </div>
                  <div className="ml-5">
                    <p className="font-medium text-primary">Name</p>
                    <input
                      name="name"
                      value={data?.name}
                      placeholder={data?.name}
                      type="text"
                      className="mt-1 w-full  bg-secondary text-white  outline-none"
                      readOnly
                    />
                  </div>
                </div>
                <div className=" shadow-xl p-3 flex rounded-lg">
                  <div className="  shadow-xl flex justify-center items-center w-12 h-12 rounded-lg">
                    <MdOutlineMail size={26} color="#3BE48B" />
                  </div>
                  <div className="ml-5">
                    <p className="font-medium text-primary">Email Address</p>
                    <p className="mt-1 w-full text-gray-400 bg-secondary  outline-none">
                      {data?.email}
                    </p>
                  </div>
                </div>
                <div className=" shadow-xl p-3 flex rounded-lg">
                  <div className=" flex justify-center items-center w-12 h-12 rounded-lg">
                    <FaMobileAlt size={26} color="#3BE48B" />
                  </div>
                  <div className="ml-5">
                    <p className="font-medium text-primary">Mobile</p>
                    <input
                      name="mobile"
                      value={data?.mobile}
                      placeholder={`${data?.mobile}`}
                      type="text"
                      className="mt-1 w-full  bg-secondary  focus:border-black outline-none"
                      readOnly
                    />
                  </div>
                </div>
                <div className=" shadow-xl p-3 flex rounded-lg">
                  <div className="  shadow-xl flex justify-center items-center w-12 h-12 rounded-lg">
                    <CiMoneyCheck1 size={26} color="#3BE48B" />
                  </div>
                  <div className="ml-5">
                    <p className="font-medium text-primary">Subscription Plan</p>
                    <p className="mt-1 w-full text-gray-400 bg-secondary  outline-none">
                      {`${data?.subscriptions[data.subscriptions.length - 1].plan} Plan`}
                    </p>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="max-w-3xk mx-auto px-8  sm:px-0 mt-16">
        <div className="sm:w-3/4 sm:mx-auto">
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
              <span className="">HEALTH DETAILS</span>
            </button>
            <button
              role="tab"
              aria-selected={activeTab === 2 ? "true" : "false"}
              aria-controls="panel-2"
              id="tab-2"
              tabIndex={-1}
              className={`relative block h-10 px-6 tab rounded-full ${
                activeTab === 2
                  ? "bg-primary text-secondary font-bold"
                  : "text-gray-500"
              }`}
              onClick={() => handleTabClick(2)}
            >
              <span className="">TEST RESULTS</span>
            </button>
            <button
              role="tab"
              aria-selected={activeTab === 3 ? "true" : "false"}
              aria-controls="panel-3"
              id="tab-3"
              tabIndex={-1}
              className={`relative block h-10 px-6 tab rounded-full ${
                activeTab === 3
                  ? "bg-primary text-secondary font-bold"
                  : "text-gray-500"
              }`}
              onClick={() => handleTabClick(3)}
            >
              <span className="">DIET DETAILS</span>
            </button>
          </div>
        </div>
      </div>

      <div className="mt-4  p-6 sm:w-3/4 mx-auto">
        {activeTab === 1 && (
          <div
            role="tabpanel"
            id="panel-1"
            aria-labelledby="tab-1"
            className="space-y-6"
          >
            <div className=" shadow-xl p-3 flex rounded-lg">
              <div className=" flex justify-center shadow-xl items-center w-12 h-12 rounded-lg">
                <FaWeightScale size={26} color="#3BE48B" />
              </div>
              <div className="ml-5">
                <p className="font-medium text-primary">Age</p>
                <input
                  name="age"
                  value={data?.age}
                  placeholder={`${data?.age} Years`}
                  type="text"
                  className="mt-1 w-full  bg-secondary text-white  outline-none"
                  readOnly
                />
              </div>
            </div>
            <div className=" shadow-xl p-3 flex rounded-lg">
              <div className=" flex justify-center shadow-xl items-center w-12 h-12 rounded-lg">
                <FaWeightScale size={26} color="#3BE48B" />
              </div>
              <div className="ml-5">
                <p className="font-medium text-primary">Weight</p>
                <input
                  name="weight"
                  value={data?.weight}
                  placeholder={`${data?.weight} KG`}
                  type="text"
                  className="mt-1 w-full  bg-secondary text-white  outline-none"
                  readOnly
                />
              </div>
            </div>
            <div className=" shadow-xl p-3 flex rounded-lg">
              <div className=" flex justify-center shadow-xl items-center w-12 h-12 rounded-lg">
                <FaWeightScale size={26} color="#3BE48B" />
              </div>
              <div className="ml-5">
                <p className="font-medium text-primary">Height</p>
                <input
                  name="height"
                  value={data?.height}
                  placeholder={`${data?.height} cm`}
                  type="text"
                  className="mt-1 w-full  bg-secondary text-white  outline-none"
                  readOnly
                />
              </div>
            </div>
            <div className=" shadow-xl p-3 flex rounded-lg">
              <div className=" flex justify-center shadow-xl items-center w-12 h-12 rounded-lg">
                <GoGoal size={26} color="#3BE48B" />
              </div>
              <div className="ml-5">
                <p className="font-medium text-primary">Goals</p>
                <input
                  name="goal"
                  value={data?.goal}
                  placeholder={`${data?.goal}`}
                  type="text"
                  className="mt-1 w-full  bg-secondary text-white  outline-none"
                  readOnly
                />
              </div>
            </div>
          </div>
        )}
        {activeTab === 2 && (
          <div
            role="tabpanel"
            id="panel-2"
            aria-labelledby="tab-2"
            className="space-y-6"
          >
            <div className=" shadow-xl p-3 flex rounded-lg">
              <div className=" flex justify-center shadow-xl items-center w-12 h-12 rounded-lg">
                <MdFoodBank size={26} color="#3BE48B" />
              </div>
              <div className="ml-5">
                <p className="font-medium text-primary">Test Results</p>
                <input
                  name="testResults"
                  value={data?.testResult}
                  placeholder={`${data?.testResult}`}
                  type="text"
                  className="mt-1 w-full  bg-secondary text-white  outline-none"
                  readOnly
                />
              </div>
            </div>
          </div>
        )}
        {activeTab === 3 && (
          <div
            role="tabpanel"
            id="panel-3"
            aria-labelledby="tab-3"
            className="space-y-6"
          >
            <div className="w-full flex items-center justify-center">
              <div className="bg-secondary w-full shadow-md rounded-lg p-8 mt-10">
                <form onSubmit={handleSubmit}>
                  <div className="flex justify-between items-center">
                    <div className="w-1/2 px-3">
                      <label
                        htmlFor="morning"
                        className="block text-white font-medium"
                      >
                        Morning
                      </label>
                      <input
                        id="morning"
                        type="text"
                        value={morning}
                        onChange={(e) => setMorning(e.target.value)}
                        className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50 text-white"
                      />
                    </div>
                    <div className="w-1/2 px-3">
                      <label
                        htmlFor="noon"
                        className="block text-white font-medium"
                      >
                        Noon
                      </label>
                      <input
                        id="noon"
                        type="text"
                        value={noon}
                        onChange={(e) => setNoon(e.target.value)}
                        className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50 text-white"
                      />
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <div className="w-1/2 px-3">
                      <label
                        htmlFor="evening"
                        className="block text-white font-medium"
                      >
                        Evening
                      </label>
                      <input
                        id="evening"
                        type="text"
                        value={evening}
                        onChange={(e) => setEvening(e.target.value)}
                        className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50 text-white"
                      />
                    </div>
                    <div className="w-1/2 px-3">
                      <label
                        htmlFor="night"
                        className="block text-white font-medium"
                      >
                        Night
                      </label>
                      <input
                        id="night"
                        type="text"
                        value={night}
                        onChange={(e) => setNight(e.target.value)}
                        className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50 text-white"
                      />
                    </div>
                  </div>
                  <div className="mt-4 px-3">
                    <label
                      htmlFor="additionalInstructions"
                      className="block text-white font-medium"
                    >
                      Additional Instructions
                    </label>
                    <textarea
                      id="additionalInstructions"
                      value={additionalInstructions}
                      onChange={(e) => setAdditionalInstructions(e.target.value)}
                      className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50 text-white"
                      rows={4}
                    />
                  </div>
                  <div className="flex justify-end mt-6">
                    <button
                      type="submit"
                      className="bg-primary text-secondary py-2 px-4 rounded-lg shadow-md hover:bg-green-700"
                      disabled={isLoading}
                    >
                      {isLoading ? <Spinner /> : 'Update Diet'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ClientDetails;
