import { useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "../../components/users/Navbar";
import Footer from "../../components/users/Footer";
import { useLocation } from "react-router-dom";
import { useSetTrainerMutation } from "../../slices/userApiSlice";
import { RootState } from "../../app/store";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

function TrainerProfile() {
  const [activeTab, setActiveTab] = useState(1);
  const location = useLocation();
  const { data } = location.state;
  const [setTrainer] = useSetTrainerMutation();
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const userId = userInfo ? userInfo?._id : null;
  const trainerId = data?._id;

  const handleClick = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This will be your Trainer until your subscription ends",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3BE48B",
      cancelButtonColor: "#3d3636",
      confirmButtonText: "Yes, I am Sure",
      customClass: {
        popup: "swal-custom-background",
        title: "swal2-title",
        content: "swal2-content",
        confirmButton: "swal2-confirm",
      },
    });

    if (result.isConfirmed) {
      try {
        const res = await setTrainer({ userId, trainerId }).unwrap();
        toast.success(res.message);
      } catch (error) {
        // toast.error(res.message);
      }
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

      <div className="md:flex md:text-center align-center md:px-52">
        <img
          src={data?.profile_img}
          alt="user Profile Image"
          className="h-60 w-48 object-cover rounded-lg shadow-xl mt-16 "
        />
        <div className="mt-16 mx-16">
          <h1 className=" text-primary shadow-sm text-start font-bold text-2xl pb-2">
            {data?.name}
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
          </div>

          <h3 className="text-white text-start pb-2 text-base">
            {data?.specialisation}
          </h3>
          <p
            className="text-white text-start text-sm w-1/"
            style={{ whiteSpace: "pre-wrap" }}
          >
            {data?.description}
          </p>
        </div>
      </div>
      {userInfo?.isSubscribed && !userInfo?.trainerId? (

        <div className="flex justify-center items-center">
          <button
            className="bg-primary m-4 text-secondary py-2 px-2 rounded-lg shadow-lg"
            onClick={handleClick}
          >
            SET AS TRAINER
          </button>
        </div>
) : (
        ""
      )}
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
              <p style={{ whiteSpace: "pre-wrap" }}>{data?.experience}</p>
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
                  src={data?.certificate}
                  alt="Test Result"
                  // onClick={handleFileClick}
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

      {/* <div className="px-60 py-16">
        <h2 className="text-primary font-bold">SPECIALISATION</h2>
        <ul className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-2">
          <li className="flex items-center">
            <svg
              className="w-4 h-4 mr-2 "
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5l7 7-7 7"
              ></path>
            </svg>
            <span>Weight Loss</span>
          </li>
          <li className="flex items-center">
            <svg
              className="w-4 h-4 mr-2 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5l7 7-7 7"
              ></path>
            </svg>
            <span>Diet and Nutrition</span>
          </li>
        </ul>
      </div> */}
      <Footer />
    </div>
  );
}

export default TrainerProfile;
