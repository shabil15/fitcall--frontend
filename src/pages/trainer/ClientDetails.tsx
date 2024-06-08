
import React, { useState } from 'react';
import Navbar from '../../components/trainers/Navbar';
import Footer from '../../components/trainers/Footer';
import { MdModeEdit,MdFoodBank } from "react-icons/md";
import { CiMoneyCheck1 } from "react-icons/ci";
import { GoGoal } from "react-icons/go";
import { IoPersonSharp } from "react-icons/io5";
import { FaMobileAlt } from "react-icons/fa";
import { FaPerson, FaWeightScale } from "react-icons/fa6";
import { MdOutlineMail } from "react-icons/md";
import { useLocation } from 'react-router-dom';
import {useUpdateDietMutation} from '../../slices/userApiSlice';
import Spinner from "../../components/common/Spinner";
import { toast } from "react-toastify";


function ClientDetails() {
  const [activeTab, setActiveTab] = useState(1);
  const location = useLocation();
  const { data } = location.state;

  const [morning, setMorning] = useState(data?.diet?.morning || '');
  const [noon, setNoon] = useState(data?.diet?.noon || '');
  const [evening, setEvening] = useState(data?.diet?.evening || '');
  const [night, setNight] = useState(data?.diet?.night || '');
  const [additionalInstructions, setAdditionalInstructions] = useState(data?.diet?.additionalInstructions || '');
  const [updateDiet, { isLoading, error }] = useUpdateDietMutation();

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  const  handleSubmit = async(e) =>  {
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
      toast.success(res.message)
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
                      {`${data?.subscriptions[data.subscriptions.length-1].plan} Plan`}
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
              tabIndex={1}
              className={`relative block h-10 px-6 tab rounded-full ${
                activeTab === 2
                  ? "bg-primary text-secondary font-bold"
                  : "text-gray-500"
              }`}
              onClick={() => handleTabClick(2)}
            >
              <span>PROGRESS</span>
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
              <span>DIET PLAN</span>
            </button>
          </div>
          <div className="relative rounded-xl h-auto  border border-opacity-5 border-gray-900 shadow-xl">
            <div
              id="panel-1"
              className={`tab-panel p-6 transition duration-300 ${
                activeTab === 1 ? "block" : "hidden"
              }`}
              role="tabpanel"
            >
              <div className="flex-grow items-center w-full p-4 ">
                <form className="mt-5">
                  <div className="grid grid-cols-2 gap-5 max-md:grid-cols-1">
                    <div className="shadow-xl p-3 flex rounded-lg">
                      <div className="flex justify-center shadow-xl items-center w-12 h-12 rounded-lg">
                        <FaPerson size={26} color="#3BE48B" />
                      </div>
                      <div className="ml-5">
                        <p className="font-medium text-primary">Age</p>
                        <input
                          name="age"
                          value={data?.age}
                          placeholder={data?.age?.toString()}
                          type="number"
                          className="mt-1 w-full bg-secondary text-white outline-none"
                        />
                      </div>
                    </div>
                    <div className="shadow-xl p-3 flex rounded-lg">
                      <div className="shadow-xl flex justify-center items-center w-12 h-12 rounded-lg">
                        <FaWeightScale size={26} color="#3BE48B" />
                      </div>
                      <div className="ml-5">
                        <p className="font-medium text-primary">Weight (kg)</p>
                        <input
                          name="weight"
                          value={data?.weight}
                          placeholder={data?.weight?.toString()}
                          type="text"
                          className="mt-1 w-full bg-secondary text-white outline-none"
                        />
                      </div>
                    </div>
                    <div className="shadow-xl p-3 flex rounded-lg">
                      <div className="flex justify-center items-center w-12 h-12 rounded-lg">
                        {/* <CiLineHeight size={26} color="#3BE48B" /> */}
                      </div>
                      <div className="ml-5">
                        <p className="font-medium text-primary">Height (cm)</p>
                        <input
                          name="height"
                          value={data?.height}
                          placeholder={data?.height?.toString()}
                          type="text"
                          className="mt-1 w-full bg-secondary text-white outline-none"
                        />
                      </div>
                    </div>
                    <div className="shadow-xl p-3 flex rounded-lg">
                      <div className="flex justify-center items-center w-12 h-12 rounded-lg">
                        <GoGoal size={26} color="#3BE48B" />
                      </div>
                      <div className="ml-5">
                        <p className="font-medium text-primary">Fitness Goal</p>
                        <input
                          name="goal"
                          value={data?.goal}
                          placeholder={data?.goal}
                          type="text"
                          className="mt-1 w-full bg-secondary text-white outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div
              id="panel-2"
              className={`tab-panel p-6 transition duration-300 ${
                activeTab === 2 ? "block" : "hidden"
              }`}
              role="tabpanel"
            >
              <div className=" ">
                <h1 className="text-3xl text-center font-bold text-white ">Latest Medical Report</h1>
                <div className="mt-3 flex justify-center">
          <img
            className="w-auto h-auto  object-cover cursor-pointer"
            src={data?.testResult}
            alt="Test Result"
          />
        </div>
                <div className="">
                  
                </div>
              </div>
            </div>
            <div
              id="panel-3"
              className={`tab-panel p-6 transition duration-300 ${
                activeTab === 3 ? "block" : "hidden"
              }`}
              role="tabpanel"
            >
              <form onSubmit={handleSubmit}>
                <div className="mt-5 grid grid-cols-2 gap-5 max-md:grid-cols-1">
                <div className="shadow-xl p-3 flex rounded-lg">
                  <div className="shadow-xl flex justify-center items-center w-12 h-12 rounded-lg">
                    <MdFoodBank size={26} color="#3BE48B" />
                  </div>
                  <div className="ml-5 flex-grow">
                    <p className="font-medium text-primary">Morning</p>
                    <textarea
                      className="mt-1 w-full text-gray-400 bg-secondary outline-none"
                      value={morning}
                      onChange={(e) => setMorning(e.target.value)}
                    />
                  </div>
                </div>
                <div className="shadow-xl p-3 flex rounded-lg">
                  <div className="shadow-xl flex justify-center items-center w-12 h-12 rounded-lg">
                    <MdFoodBank size={26} color="#3BE48B" />
                  </div>
                  <div className="ml-5 flex-grow">
                    <p className="font-medium text-primary">Noon</p>
                    <textarea
                      className="mt-1 w-full text-gray-400 bg-secondary outline-none"
                      value={noon}
                      onChange={(e) => setNoon(e.target.value)}
                    />
                  </div>
                </div>
                <div className="shadow-xl p-3 flex rounded-lg">
                  <div className="shadow-xl flex justify-center items-center w-12 h-12 rounded-lg">
                    <MdFoodBank size={26} color="#3BE48B" />
                  </div>
                  <div className="ml-5 flex-grow">
                    <p className="font-medium text-primary">Evening</p>
                    <textarea
                      className="mt-1 w-full text-gray-400 bg-secondary outline-none"
                      value={evening}
                      onChange={(e) => setEvening(e.target.value)}
                    />
                  </div>
                </div>
                <div className="shadow-xl p-3 flex rounded-lg">
                  <div className="shadow-xl flex justify-center items-center w-12 h-12 rounded-lg">
                    <MdFoodBank size={26} color="#3BE48B" />
                  </div>
                  <div className="ml-5 flex-grow">
                    <p className="font-medium text-primary">Night</p>
                    <textarea
                      className="mt-1 w-full text-gray-400 bg-secondary outline-none"
                      value={night}
                      onChange={(e) => setNight(e.target.value)}
                    />
                  </div>
                </div>
                </div>
              <div className="grid grid-cols-1 ">
                <div className="shadow-xl p-3 flex rounded-lg">
                  <div className="shadow-xl flex justify-center items-center w-12 h-12 rounded-lg">
                    <MdFoodBank size={26} color="#3BE48B" />
                  </div>
                  <div className="ml-5 flex-grow">
                    <p className="font-medium text-primary">Additional Instructions</p>
                    <textarea 
                      className="mt-1 w-full text-gray-400 bg-secondary outline-none"
                      value={additionalInstructions}
                      onChange={(e) => setAdditionalInstructions(e.target.value)}
                    />
                  </div>
                </div>
               <div className="btn bg-primary rounded mt-3 p-2 text-center  shadow-md"> {isLoading?<Spinner/>:<button type="submit"  className="text-center w-full">Submit</button>}</div>
                </div>
                
              </form>
              {/* {isLoading && <p>Loading...</p>} */}
              {/* {error && <p className="text-red-500">{error}</p>} */}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default ClientDetails;
