import  { ChangeEvent, useState, useRef } from "react";
import Navbar from "../../components/trainers/Navbar";
import Footer from "../../components/trainers/Footer";
import { IoPersonSharp } from "react-icons/io5";
import { FaMobileAlt } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useUpdateTrainerProfileMutation, useSetTrainerImgMutation } from '../../slices/TrainerApiSlice';
import { RootState } from "../../app/store";
import { MyError, UpdateTrainer } from "../../validation/validationTypes";
import { validationForTrainerUpdate } from "../../validation/yupValidation";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { setTrainerCredential } from "../../slices/authSlice";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../app/firebase/config";
import Spinner from "../../components/common/Spinner";

function Profile() {
  const [activeTab, setActiveTab] = useState(1);
  const { trainerInfo } = useSelector((state: RootState) => state.auth);
  const [trainerImg, setTrainerImg] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isSubmit, setSubmit] = useState(false);
  const [addProfile] = useSetTrainerImgMutation();
  const [updateTrainer] = useUpdateTrainerProfileMutation();
  const dispatch = useDispatch();

  const initialValues: UpdateTrainer = {
    name: trainerInfo?.name,
    mobile: trainerInfo?.mobile,
  };

  const handleFileClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();   
    }
  };

  const { values, handleChange, handleSubmit, errors, touched } = useFormik({
    initialValues: initialValues,
    validationSchema: validationForTrainerUpdate,
    onSubmit: async (values) => {
      try {
        const _id = trainerInfo?._id;
        const { name, mobile } = values;
        const res = await updateTrainer({ _id, name, mobile }).unwrap();
        dispatch(setTrainerCredential({ ...res.trainer }));
        toast.success(res.message);
      } catch (err) {
        toast.error((err as MyError)?.data?.message || (err as MyError)?.error);
      }
    }
  });
  
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setTrainerImg(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const handleImageChange = async () => {
    setSubmit(true);
    const fileName = `${Date.now()}.jpg`;
    const storageRef = ref(storage, `/image/trainerProfile/${fileName}`);

    if (trainerImg) {
      try {
        const snapshot = await uploadBytes(storageRef, trainerImg);
        const downloadURL = await getDownloadURL(snapshot.ref);
        const profile_img = downloadURL;
        const _id = trainerInfo?._id;

        const res = await addProfile({ profile_img, _id }).unwrap();
        setSubmit(false);
        toast.success(res.message);
        dispatch(setTrainerCredential({ ...res.trainer }));
      } catch (err) {
        toast.error((err as MyError)?.data?.message || (err as MyError)?.error);
        setSubmit(false);
      }
    }
  };

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
          <div className="flex flex-col items-center">
            <div className="my-auto">
              <div className="mt-3 flex justify-center">
                <img
                  className="rounded-full w-40 h-40 object-cover cursor-pointer"
                  src={
                    imagePreview ||
                    trainerInfo?.profile_img ||
                    "/src/assets/images.png"
                  }
                  alt=""
                  onClick={handleFileClick}
                />
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
            </div>
            {imagePreview ? (
              <div className="justify-center mt-3 mb-3">
                <button
                  onClick={handleImageChange}
                  className="bg-primary text-secondary rounded-md shadow-md w-20 h-8 font-medium"
                >
                  {isSubmit ? <Spinner /> : "Upload"}
                </button>
              </div>
            ) : (
              <div className="justify-center mt-3 mb-3">
                <button
                  onClick={handleFileClick}
                  className="bg-primary text-secondary rounded-md shadow-md w-20 h-8 font-medium"
                >
                  Edit
                </button>
              </div>
            )}
          </div>
          <div className="flex-grow w-full sm:w-[80%] p-4">
            <form onSubmit={handleSubmit}>
              <div className="mt-5 grid grid-cols-2 gap-5 max-md:grid-cols-1">
                <div className="shadow-xl p-3 flex rounded-lg">
                  <div className="flex justify-center shadow-xl items-center w-12 h-12 rounded-lg">
                    <IoPersonSharp size={26} color="#3BE48B" />
                  </div>
                  <div className="ml-5">
                    <p className="font-medium text-primary">Name</p>
                    <input
                      name="name"
                      value={values.name}
                      placeholder={trainerInfo?.name}
                      type="text"
                      onChange={handleChange}
                      className="mt-1 w-full bg-secondary text-white outline-none"
                    />
                    {errors.name && touched.name && (
                      <div className="text-red-500">{errors.name}</div>
                    )}
                  </div>
                </div>
                <div className="shadow-xl p-3 flex rounded-lg">
                  <div className="shadow-xl flex justify-center items-center w-12 h-12 rounded-lg">
                    <MdOutlineMail size={26} color="#3BE48B" />
                  </div>
                  <div className="ml-5">
                    <p className="font-medium text-primary">Email Address</p>
                    <p className="mt-1 w-full text-gray-400 bg-secondary outline-none">
                      {trainerInfo?.email}
                    </p>
                  </div>
                </div>
                <div className="shadow-xl p-3 flex rounded-lg">
                  <div className="flex justify-center items-center w-12 h-12 rounded-lg">
                    <FaMobileAlt size={26} color="#3BE48B" />
                  </div>
                  <div className="ml-5">
                    <p className="font-medium text-primary">Mobile</p>
                    <input
                      name="mobile"
                      value={values.mobile}
                      placeholder={trainerInfo?.mobile?.toString()}
                      type="text"
                      onChange={handleChange}
                      className="mt-1 w-full bg-secondary text-white outline-none"
                    />
                    {errors.mobile && touched.mobile && (
                      <div className="text-red-500">{errors.mobile}</div>
                    )}
                  </div>
                </div>
                <div className="shadow-xl p-3 flex rounded-lg">
                  <div className="shadow-xl flex justify-center items-center w-12 h-12 rounded-lg">
                    <MdOutlineMail size={26} color="#3BE48B" />
                  </div>
                  <div className="ml-5">
                    <p className="font-medium text-primary">Language</p>
                    <p className="mt-1 w-full text-gray-400 bg-secondary outline-none">
                      {trainerInfo?.language}
                    </p>
                  </div>
                </div>
                <div className="shadow-xl p-3 flex rounded-lg">
                  <div className="shadow-xl flex justify-center items-center w-12 h-12 rounded-lg">
                    <MdOutlineMail size={26} color="#3BE48B" />
                  </div>
                  <div className="ml-5">
                    <p className="font-medium text-primary">Specialisation</p>
                    <p className="mt-1 w-full text-gray-400 bg-secondary outline-none">
                      {trainerInfo?.specialisation}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex w-full">
                <div className="flex justify-end w-1/2">
                  <button className="bg-tertiary rounded-md mt-4 shadow-md w-28 h-10 font-medium">
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="max-w-3xk mx-auto px-8 sm:px-0 mt-16">
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
          <div className="relative rounded-xl h-auto border border-opacity-5 border-gray-900 shadow-xl">
            <div
              id="panel-1"
              className={`tab-panel p-6 transition duration-300 ${
                activeTab === 1 ? "block" : "hidden"
              }`}
              role="tabpanel"
            >
              <p>First tab content goes here.</p>
            </div>
            <div
              id="panel-2"
              className={`tab-panel p-6 transition duration-300 ${
                activeTab === 2 ? "block" : "hidden"
              }`}
              role="tabpanel"
            >
              <p>Second tab content goes here.</p>
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

      <Footer />
    </div>
  );
}

export default Profile;
