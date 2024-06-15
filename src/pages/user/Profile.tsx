import React, {ChangeEvent,useState,useRef,useEffect } from "react";
import Navbar from "../../components/users/Navbar";
import Footer from "../../components/users/Footer";
// import ProfileData from "../../components/users/Profile/ProfileData";
import { MdModeEdit,MdFoodBank } from "react-icons/md";
import { CiMoneyCheck1 } from "react-icons/ci";
import { GoGoal } from "react-icons/go";
import { IoPersonSharp } from "react-icons/io5";
import { FaMobileAlt } from "react-icons/fa";
import { FaPerson,FaWeightScale } from "react-icons/fa6";
import { MdOutlineMail} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useUpdateProfileMutation } from "../../slices/userApiSlice";
import { RootState } from "../../app/store";
import { MyError,UpdateUser,UpdateHealth } from "../../validation/validationTypes";
import { validationForUserUpdate,validationForUserHealth } from "../../validation/yupValidation";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { setCredential } from "../../slices/authSlice";
import { useSetUserImgMutation } from "../../slices/userApiSlice";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../app/firebase/config";
import Spinner from "../../components/common/Spinner";
import { CiLineHeight } from "react-icons/ci";
import {useUpdateHealthMutation} from "../../slices/userApiSlice";
import { useNavigate } from "react-router-dom";
import TestResult from "../../components/users/Profile/TestResult";
import {useGetUserMutation} from "../../slices/userApiSlice";


function Profile() {
  const [activeTab, setActiveTab] = useState(1);
  const {userInfo} =useSelector((state:RootState)=> state.auth);
  const [userImg,setUserImg] = useState<File | null>(null);
  const [imagePreview,setImagePreview] = useState<string |null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isSubmit,setSubmit] = useState(false);
  const [addProfile]= useSetUserImgMutation();
  const [updateUser] = useUpdateProfileMutation();
  const [updateHealth] = useUpdateHealthMutation();
  const [getUser] = useGetUserMutation();
  const dispatch = useDispatch()
 const navigate = useNavigate();

 const email = userInfo?.email;

 const initialValues: UpdateUser = {
  name: userInfo?.name ?? '',
  mobile: userInfo?.mobile ?? '',
};

const healthValues: UpdateHealth = {
  age: userInfo?.age ?? '',
  weight: userInfo?.weight ?? '',
  height: userInfo?.height ?? '',
  goal: userInfo?.goal ?? '',
};


  const handleFileClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const { values, handleChange, handleSubmit, errors, touched } = useFormik({
    initialValues: initialValues,
    validationSchema: validationForUserUpdate,
    onSubmit: async (values) => {
      try {
        const _id = userInfo?._id;
        const { name, mobile } = values;
        const res = await updateUser({ _id, name, mobile }).unwrap();
        dispatch(setCredential({ ...res.user }));
        toast.success(res.message);
      } catch (err) {
        toast.error((err as MyError)?.data?.message || (err as MyError)?.error);
      }
    },
  });

  const {
    values: healthValuesFormik,
    handleChange: handleChangeHealth,
    handleSubmit: handleSubmitHealth,
    errors: healthErrors,
    touched: healthTouched,
  } = useFormik({
    initialValues: healthValues,
    validationSchema: validationForUserHealth,
    onSubmit: async (values) => {
      try {
        const _id = userInfo?._id;
        const { age, weight, height, goal } = values;
        const res = await updateHealth({ _id, age, weight, height, goal }).unwrap();
        dispatch(setCredential({ ...res.user }));
        toast.success(res.message);
      } catch (err) {
        toast.error((err as MyError)?.data?.message || (err as MyError)?.error);
      }
    },
  });

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if(file) {
      setUserImg(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }else{
      setImagePreview(null);
    }
  }

  const handleImageChange = async () => {
    setSubmit(true);
    const fileName = `${Date.now()}.jpg`;
    const storageRef = ref(storage,`/image/userProfile/${fileName}`);

    if(userImg) {
      const snapshot = await uploadBytes(storageRef,userImg);
      const downloadURL = await getDownloadURL(snapshot.ref);
      const profile_img = downloadURL;
      console.log(profile_img);

      const _id = userInfo?._id;
      console.log(_id);
      try{
        const res = await addProfile({profile_img,_id}).unwrap();
        console.log(res);
        
        setSubmit(false);
        toast.success(res.message);
        dispatch(setCredential({...res.user}))
      } catch(err) {
        toast.error((err as MyError)?.data?.message || (err as MyError)?.error);
        setSubmit(false);
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



  const handleTabClick = (tabId: number) => {
    setActiveTab(tabId);
  };

  return (
    <div className="bg-secondary">
      <Navbar />
      <div className="relative">
        <img
          src="../../../src/assets/header div.jpg"
          alt=""
          className="pt-20 h-56 w-full"
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center mt-8">
          <h1 className="text-3xl font-extrabold text-white mt-5">
            <span className="bg-secondary italic px-5 py-2 rounded-lg">MY</span>
          </h1>
          <h1 className="text-3xl font-extrabold italic text-secondary mt-3">
            PROFILE
          </h1>
        </div>
      </div>






      <div className="h-full max-[400px]:p-2 w-full flex items-center flex-col justify-center">
        <div className="w-full p-4 md:px-12  md:py-4 lg:py-16 flex max-md:flex-col sm:w-[80%] items-start shadow-xl text-white rounded-3xl">
          {/* <div className="my-auto">
            <div className="max-sm:w-[100px] my-auto max-sm:h-[100px] w-[150px] h-[150px] relative bg-black rounded-full overflow-hidden">
              <img className="object-cover h-full w-full" src={
                      imagePreview ||
                      userInfo?.profile_img ||
                      "/src/assets/images.png"
                    }
                    alt=""
                    onClick={handleFileClick} />
            </div>
            <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />
            <div className="cursor-pointer sm:w-[30px] w-[23px] h-[23px] sm:h-[30px] ml-20 -mt-10  rounded-full sm:ml-28 sm:-mt-10   bg-slate-800 flex  justify-center items-center absolute">
              <MdModeEdit color="white" />
            </div>
          </div> */}
          <div className="flex flex-col items-center ">
          <div className="my-auto ">
                <div className="mt-3 flex justify-center ">
                  <img
                    className="rounded-full w-40 h-40 object-cover cursor-pointer"
                    src={
                      imagePreview ||
                      userInfo?.profile_img ||
                      "/src/assets/images.png"
                    }
                    alt=""
                    onClick={handleFileClick}
                  />
                  
                </div>
                {/* Hide the input element */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />
              </div>
              {imagePreview ? (
                <div className=" justify-center mt-3 mb-3">
                  <button
                    onClick={handleImageChange}
                    className="bg-primary text-secondary rounded-md shadow-md w-20 h-8 font-medium"
                  >
                    {isSubmit ? <Spinner /> : "Upload"}
                  </button>
                </div>
              ) : (
                <div className=" justify-center mt-3 mb-3">
                  <button
                    onClick={handleFileClick}
                    className="bg-primary text-secondary rounded-md shadow-md w-20 h-8 font-medium"
                  >
                    Edit
                  </button>
                </div>
              )}
            </div>
            <div className="flex-grow w-full sm:w-[80%] p-4 ">
          <form action="" onSubmit={handleSubmit}>
          
          
            <div className="mt-5 grid grid-cols-2 gap-5 max-md:grid-cols-1">
              <div className=" shadow-xl p-3 flex rounded-lg ">
                <div className=" flex justify-center shadow-xl items-center w-12 h-12 rounded-lg">
                  <IoPersonSharp size={26} color="#3BE48B" />
                </div>
                <div className="ml-5">
                  <p className="font-medium text-primary">Name</p>
                  <input
                    name="name"
                    value={values.name}
                    placeholder={userInfo?.name}
                    type="text"
                    onChange={handleChange}
                    className="mt-1 w-full  bg-secondary text-white  outline-none"
                  />
                  {/* {errors.name && touched.name && (
                        <div className="text-red-500">{errors.name}</div>
                      )} */}
                </div>
              </div>
              <div className=" shadow-xl p-3 flex rounded-lg">
                <div className="  shadow-xl flex justify-center items-center w-12 h-12 rounded-lg">
                  <MdOutlineMail size={26} color="#3BE48B" />
                </div>
                <div className="ml-5">
                  <p className="font-medium text-primary">Email Address</p>
                  <p className="mt-1 w-full text-gray-400 bg-secondary  outline-none">
                    {userInfo?.email}
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
                    value={values.mobile}
                    placeholder={`${userInfo?.mobile}`}
                    onChange={handleChange}
                    type="text"
                    className="mt-1 w-full  bg-secondary  focus:border-black outline-none"
                  />
                  {/* {errors.mobile && touched.mobile && (
                    <div className="text-red-500">{errors.mobile}</div>
                  )} */}
                </div>
              </div>
              <div className=" shadow-xl p-3 flex rounded-lg">
                <div className="  shadow-xl flex justify-center items-center w-12 h-12 rounded-lg">
                  <CiMoneyCheck1 size={26} color="#3BE48B" />
                </div>
                <div className="ml-5">
                  <p className="font-medium text-primary">Subscription Plan</p>
                  <p className="mt-1 w-full text-gray-400 bg-secondary  outline-none">
                  {userInfo?.subscriptions && userInfo.subscriptions.length > 0 ? `${userInfo.subscriptions[userInfo.subscriptions.length - 1].plan} Plan` : 'No Plan'}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex w-full">
            <div className="flex justify-end w-1/2">
                <button className="bg-tertiary rounded-md mt-4 shadow-md w-28 h-10 font-medium">Save</button>
                
            </div>
           </div>
          
          </form> 
          </div> 
        </div>
        <div className="flex justify-center">
      <button onClick={()=> navigate("/subscriptionHistory")}
              className="bg-primary rounded-md mt-10 shadow-md mx-2 w-52 h-10 font-bold">
              SUBSCRIPTION HISTORY
            </button>

            <button onClick={()=> navigate("/mytrainer")}
              className="bg-primary rounded-md mt-10 shadow-md w-52 h-10 font-bold">
              MY TRAINER
            </button>
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
             <form onSubmit={handleSubmitHealth} className="mt-5">
                <div className="grid grid-cols-2 gap-5 max-md:grid-cols-1">
                  <div className="shadow-xl p-3 flex rounded-lg">
                    <div className="flex justify-center shadow-xl items-center w-12 h-12 rounded-lg">
                      <FaPerson size={26} color="#3BE48B" />
                    </div>
                    <div className="ml-5">
                      <p className="font-medium text-primary">Age</p>
                      <input
                        name="age"
                        value={healthValuesFormik.age}
                        placeholder={userInfo?.age?.toString()}
                        type="number"
                        onChange={handleChangeHealth}
                        className="mt-1 w-full bg-secondary text-white outline-none"
                      />
                      {healthErrors.age && healthTouched.age && <p className="text-red-500">{healthErrors.age}</p>}
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
                        value={healthValuesFormik.weight}
                        placeholder={userInfo?.weight?.toString()}
                        type="text"
                        onChange={handleChangeHealth}
                        className="mt-1 w-full bg-secondary text-white outline-none"
                      />
                      {healthErrors.weight && healthTouched.weight && <p className="text-red-500">{healthErrors.weight}</p>}
                    </div>
                  </div>
                  <div className="shadow-xl p-3 flex rounded-lg">
                    <div className="flex justify-center items-center w-12 h-12 rounded-lg">
                      <CiLineHeight size={26} color="#3BE48B" />
                    </div>
                    <div className="ml-5">
                      <p className="font-medium text-primary">Height (cm)</p>
                      <input
                        name="height"
                        value={healthValuesFormik.height}
                        placeholder={userInfo?.height?.toString()}
                        type="text"
                        onChange={handleChangeHealth}
                        className="mt-1 w-full bg-secondary text-white outline-none"
                      />
                      {healthErrors.height && healthTouched.height && <p className="text-red-500">{healthErrors.height}</p>}
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
                        value={healthValuesFormik.goal}
                        placeholder={userInfo?.goal}
                        type="text"
                        onChange={handleChangeHealth}
                        className="mt-1 w-full bg-secondary text-white outline-none"
                      />
                      {healthErrors.goal && healthTouched.goal && <p className="text-red-500">{healthErrors.goal}</p>}
                    </div>
                  </div>
                </div>
                <div className="mt-3 justify-center flex">
                  <button className="bg-primary text-secondary rounded-md shadow-md w-20 h-8 font-medium">Save</button>
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
              <div className="flex justify-center align-center">
                
                  <TestResult/>
              </div>
            </div>
            <div
              id="panel-3"
              className={`tab-panel p-6 transition duration-300 ${
                activeTab === 3 ? "block" : "hidden"
              }`}
              role="tabpanel"
            >
              <div className="mt-5 grid grid-cols-2 gap-5 max-md:grid-cols-1">
              <div className=" shadow-xl p-3 flex rounded-lg">
                <div className="  shadow-xl flex justify-center items-center w-12 h-12 rounded-lg">
                  <MdFoodBank size={26} color="#3BE48B" />
                </div>
                <div className="ml-5">
                  <p className="font-medium text-primary">Morning</p>
                  <p className="mt-1 w-full text-gray-400 bg-secondary  outline-none" style={{ whiteSpace: 'pre-wrap' }}>
                    {userInfo?.diet?.morning?userInfo?.diet?.morning:"Drop a hint to your trainer for an update"}
                  </p>
                </div>
              </div>
              <div className=" shadow-xl p-3 flex rounded-lg">
                <div className="  shadow-xl flex justify-center items-center w-12 h-12 rounded-lg">
                  <MdFoodBank size={26} color="#3BE48B" />
                </div>
                <div className="ml-5">
                  <p className="font-medium text-primary">Noon</p>
                  <p className="mt-1 w-full text-gray-400 bg-secondary  outline-none" style={{ whiteSpace: 'pre-wrap' }}>
                  {userInfo?.diet?.noon?userInfo?.diet?.noon:"Drop a hint to your trainer for an update"}

                  </p>
                </div>
              </div>
              <div className=" shadow-xl p-3 flex rounded-lg">
                <div className="  shadow-xl flex justify-center items-center w-12 h-12 rounded-lg" >
                  <MdFoodBank size={26} color="#3BE48B" />
                </div>
                <div className="ml-5">
                  <p className="font-medium text-primary">Evening</p>
                  <p className="mt-1 w-full text-gray-400 bg-secondary  outline-none" style={{ whiteSpace: 'pre-wrap' }}>
                  {userInfo?.diet?.evening ?userInfo?.diet?.evening :"Your evening meal is on vacation. Hydrate and chill!"}
                  </p>
                </div>
              </div>
              <div className=" shadow-xl p-3 flex rounded-lg">
                <div className="  shadow-xl flex justify-center items-center w-12 h-12 rounded-lg">
                  <MdFoodBank size={26} color="#3BE48B" />
                </div>
                <div className="ml-5">
                  <p className="font-medium text-primary">Night</p>
                  <p className="mt-1 w-full text-gray-400 bg-secondary  outline-none" style={{ whiteSpace: 'pre-wrap' }}>
                  {userInfo?.diet?.night?userInfo?.diet?.night:"Drop a hint to your trainer for an update"}
                  </p>
                </div>
              </div>
              </div>
              <div className="grid grid-cols-1 ">
              <div className=" shadow-xl p-3 flex rounded-lg">
                <div className="  shadow-xl flex justify-center items-center w-12  h-12 rounded-lg">
                  <MdFoodBank size={26} color="#3BE48B" />
                </div>
                <div className="ml-5">
                  <p className="font-medium text-primary">Additional Instructions</p>
                  <p className="mt-1 w-full text-gray-400 bg-secondary  outline-none" style={{ whiteSpace: 'pre-wrap' }}>
                  {userInfo?.diet?.additionalInstructions?userInfo?.diet?.additionalInstructions:"There is no additional Instructions!"}
                  </p>
                </div>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Profile;
