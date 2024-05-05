import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { validationTrainerJoin } from "../../validation/yupValidation";
import { ITrainerJoin, MyError } from "../../validation/validationTypes";
import { toast } from "react-toastify";
import { useTrainerRegisterMutation } from "../../slices/TrainerApiSlice";
import { storage } from "../../app/firebase/config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useNavigate } from "react-router-dom";
// import Spinner from "../common/Spinner";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

function JoinFitcall() {
  const [language, setLanguage] = useState<string[]>();
  // const [getLanguage] = useGetServiceMutation();
  const [register] = useTrainerRegisterMutation();
  const [isSumbit, setSubmit] = useState(false);
  const navigate = useNavigate();
  const { trainerInfo } = useSelector((state: RootState) => state.auth);

  const initialValues: ITrainerJoin = {
    name: "",
    mobile: "",
    password: "",
    cpassword: "",
    email: "",
    description: "",
    language: "",
    specialisation: "",
    certificate: "",
    profile_img: "",
  };

  const { values, setFieldValue, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues: initialValues,
      validationSchema: validationTrainerJoin,
      onSubmit: async (values) => {
        console.log('button submit clicked')
        setSubmit(true);
        const profile:any = values.profile_img;
        let certificate:any = values.certificate;

        const profileFileName = `profile.${Date.now()}.jpg`;
        const certificateName= `certificate.${Date.now()}.jpg`;

        const profileStorageRef = ref(
          storage,
          `/images/trainer/profile/${profileFileName}`
        );
        const certificateStorageRef = ref(
          storage,
          `/images/trainer/certificate/${certificateName}`
        );
        // Upload the file
        const profilesnapshot = await uploadBytes(profileStorageRef, profile);
        const certificateSnapshot = await uploadBytes(certificateStorageRef, certificate);

        // Get the download URL of the uploaded image
        const profileDownloadURL = await getDownloadURL(profilesnapshot.ref);
        const certificateDownloadURL = await getDownloadURL(certificateSnapshot.ref);

        const profile_img = profileDownloadURL;
         certificate = certificateDownloadURL;

        try {
          const {
            name,
            mobile,
            password,
            cpassword,
            email,
            language,
            description,
            specialisation,
          } = values;
          
          const res = await register({
            name,
            mobile,
            password,
            cpassword,
            email,
            language,
            description,
            specialisation,
            certificate,
            profile_img,
          }).unwrap();
          navigate("/trainer");
          setSubmit(false);
          toast.success(res.message);
        } catch (err) {
          toast.error(
            (err as MyError)?.data?.message || (err as MyError)?.error
          );
          setSubmit(false);
        }
      },
    });

    const handleProfileImage = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.currentTarget.files?.[0];
      console.log(file,"pro")
      setFieldValue("profile_img", file || null);
    };
  
    const handleCertificateImage = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.currentTarget.files?.[0];
      console.log(file,"cert");
      setFieldValue("certificate", file || null);
    };

    

    const Goals: string[] = [
      "Weight Loss", "Muscle Gain", "Cardio Fitness",
      "Mind-Body Wellness", "Nutrition and Diet",
    ];
    
    const popularLanguages: string[] = [
      "English", "Malayalam", "Chinese", "Spanish", "Hindi", "French",
      "Standard Arabic", "Bengali", "Russian", "Portuguese", "Urdu",
      "German", "Japanese", "Swahili", "Telugu",
    ];
    return (
      <>
        <section>
          <div className="flex h-screen ">
            {/* Left Pane */}
            <img
              src="../../../src/assets/Group 880.png"
              className="absolute  w-40 m-8 lg:block hidden"
              alt=""
            />
            <div className="w-full bg-white lg:w-1/2 flex items-center justify-end sm:justify-center">
              <div className="max-w-md w-full mx-auto">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                  <div className="w-screen bg-white md:mt-0 sm:max-w-lg xl:p-0">
                    <div className="p-6 space-y-1 md:space-y-6 sm:p-8">
                      <img
                        src="/images/FlexifyBlack.png"
                        className="w-52 mx-auto sm:mb-12 lg:hidden"
                        alt=""
                      />
                      <h1 className="text-xl text-center lg:text-2xl m-0 p-0 font-bold leading-tight tracking-tight text-secondary md:text-2xl">
                        Welcome to FitCall 
                      </h1>
                      <p
                        className="font-poppins text-lg text-center text-secondary font-bold "
                        style={{ marginTop: "0.5rem" }}
                      >
                        Trainer Sign In
                      </p>
                      <form onSubmit={handleSubmit}>
            <div className="mb-6 mt-5 text-black">
              <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
                <div>
                  <input
                    type="text"
                    id="name"
                    className="w-full rounded-lg border py-2 px-3"
                    placeholder="Name"
                    value={values.name}
                    onChange={handleChange}
                  />
                  {errors.name && touched.name && (
                    <div className="text-red-500">{errors.name}</div>
                  )}
                </div>
                <div>
                  <input
                    type="text"
                    id="mobile"
                    className="w-full rounded-lg border py-2 px-3"
                    placeholder="Mobile"
                    value={values.mobile}
                    onChange={handleChange}
                  />
                  {errors.mobile && touched.mobile && (
                    <div className="text-red-500">{errors.mobile}</div>
                  )}
                </div>
                <div>
                  <input
                    type="text"
                    id="email"
                    className="w-full rounded-lg text-black border py-2 px-3"
                    placeholder="Email"
                    value={values.email}
                    onChange={handleChange}
                  />
                  {errors.email && touched.email && (
                    <div className="text-red-500">{errors.email}</div>
                  )}
                </div>
                <div className="text-gray-400">
                  <select
                    id="language"
                    className="w-full rounded-lg border text-black py-2 px-3"
                    value={values.language}
                    onChange={handleChange}
                  >
                    <option value="">Select Language</option>
                    {popularLanguages?.map((popularLanguage, index) => (
                      <option key={index} value={popularLanguage}>
                        {popularLanguage}
                      </option>
                    ))}
                  </select>
                  {errors.language && touched.language && (
                    <div className="text-red-500">{errors.language}</div>
                  )}
                </div>
                <div className="text-gray-400">
                  <select
                    id="specialisation"
                    className="w-full rounded-lg  text-black border py-2 px-3"
                    value={values.specialisation}
                    onChange={handleChange}
                  >
                    <option value="">Select Specialisation</option>
                    {Goals?.map((Goal, index) => (
                      <option key={index} value={Goal}>
                        {Goal}
                      </option>
                    ))}
                  </select>
                  {errors.specialisation && touched.specialisation && (
                    <div className="text-red-500">{errors.specialisation}</div>
                  )}
                </div>
                <div>
                  <input
                    type="text"
                    id="description"
                    className="w-full rounded-lg text-black border py-2 px-3"
                    placeholder="Description "
                    value={values.description}
                    onChange={handleChange}
                  />
                  {errors.description && touched.description && (
                    <div className="text-red-500">{errors.description}</div>
                  )}
                </div>
                <div>
                  <input
                    type="password"
                    id="password"
                    className="w-full rounded-lg border py-2 px-3"
                    placeholder="Password"
                    value={values.password}
                    onChange={handleChange}
                  />
                  {errors.password && touched.password && (
                    <div className="text-red-500">{errors.password}</div>
                  )}
                </div>
                <div>
                  <input
                    type="password"
                    id="cpassword"
                    className="w-full rounded-lg border py-2 px-3"
                    placeholder="Confirm Password"
                    value={values.cpassword}
                    onChange={handleChange}
                  />
                  {errors.cpassword && touched.cpassword && (
                    <div className="text-red-500">{errors.cpassword}</div>
                  )}
                </div>
                <div className="">
                  <label htmlFor="profile" className="block text-gray-400 mb-1">
                    Profile Image
                  </label>
                  <input
                    type="file"
                    id="profile"
                    name="profile_img" // add name attribute for Formik
                    onChange={handleProfileImage}
                    className="w-full rounded-lg border py-2 px-3"
                  />
                  {errors.profile_img && touched.profile_img && (
                    <div className="text-red-500">{errors.profile_img}</div>
                  )}
                </div>
                <div className="">
  <label htmlFor="certificate" className="block text-gray-400 mb-1">
    Certificate
  </label>
  <input
    type="file"
    id="certificate"
    name="certificate" // Update the name attribute to match the validation schema
    onChange={handleCertificateImage}
    className="w-full rounded-lg border py-2 px-3"
  />
  {errors.certificate && touched.certificate && (
    <div className="text-red-500">{errors.certificate}</div>
  )}
</div>
              </div>
            </div>
            <div className="mt-8 flex justify-center">
              <button
                type="submit"
                className="bg-primary hover:bg-black  h-10 w-2/3 rounded font-Sans text-sm text-secondary font-bold text-2xl"
              >
              Join Our Team
              </button>
            </div>
            <div className="justify-center flex">
              <p className="mt-4 mb-0 leading-normal text-sm">
                Already have an account?
                <button onClick={()=>navigate('/trainer/login')} className="font-bold text-slate-700">Sign in</button>
              </p>
            </div>
          </form>

                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Right Pane */}
            <div className="hidden signup-banner lg:flex bg-[url('../../../src/assets/pexels-li-sun-2294361.jpg')] items-center justify-center flex-1 object-center bg-white text-black">
              <div className="text-center"></div>
            </div>
          </div>
        </section>
      </>
    );

}

export default JoinFitcall;