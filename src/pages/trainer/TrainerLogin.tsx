import { useFormik } from "formik";
import { FormLogin, MyError } from "../../validation/validationTypes";
import { loginValidation } from "../../validation/yupValidation";
import { useTrainerLoginMutation } from "../../slices/TrainerApiSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { setTrainerCredential } from "../../slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { RootState } from "../../app/store";

function TrainerLogin() {

    const [login] = useTrainerLoginMutation();
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { trainerInfo } = useSelector((state:RootState) => state.auth);

    useEffect(()=>{
      if(trainerInfo){
        navigate('/trainer')
      }
    })

    const initialValues : FormLogin= {
        password: "",
        email: "",
      };
    
      const { values, handleChange, handleSubmit, errors, touched } = useFormik({
        initialValues: initialValues,
        validationSchema: loginValidation,
        onSubmit: async (values) => {
          try {
    
            const { password, email } = values; // Destructure values
            const res = await login({ password, email }).unwrap();
            dispatch(setTrainerCredential({...res.data}))
            toast.success(res.message)
          } catch (err) { 
            toast.error((err as MyError)?.data?.message || (err as MyError)?.error);
          }
        },
      });

  return (
    <div className="flex w-screen flex-wrap text-slate-800">
      <div className="flex w-full flex-col md:w-1/2">
        <div className="flex justify-center pt-12 md:justify-start md:pl-12">
          <img className="w-28" src="/src/assets/icons/adhil-02.png" alt="" />
        </div>
        <div className="my-auto mx-auto flex flex-col justify-center text-center px-6 md:justify-start lg:w-[28rem]">
          <p className="font-Sans text-primary text-center text-xl font-bold md:leading-tight md:text-left md:text-5xl">
            Welcome back  
            to <span className="text-secondary">FitCall</span>
          </p>
          <p className="mt-6 text-center font-medium md:text-left">
            Sign in to your account below.
          </p>

          <form className="flex flex-col items-stretch pt-3 md:pt-8" onSubmit={handleSubmit}>
            <div className="flex flex-col pt-4">
              <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
                <input
                   name="email"
                   value={values.email}
                   onChange={handleChange}
                   placeholder="Email"
                   type="email"
                  className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                  />
              </div>
                  {errors.email && touched.email && (
                    <div className="text-red-500">{errors.email}</div>
                  )}
            </div>
            <div className="mb-4 flex flex-col pt-4">
              <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
                <input
                  name="password"
                  type="password"
                  id="login-password"
                  value={values.password}
                    onChange={handleChange}
                  className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                  placeholder="Password"
                  />
              </div>
                  {errors.password && touched.password && (
                    <div className="text-red-500">{errors.password}</div>
                  )}
            </div>
            {/* <a
              href="#"
              className="mb-6 text-center text-sm font-medium text-gray-600 md:text-left"
            >
              Forgot password?
            </a> */}
            <button
              type="submit"
              className="bg-primary hover:bg-black w-full text-white p-2 rounded-md"
            >
              Sign in
            </button>
          </form>
          <div className="py-6 text-center">
            <p className="text-gray-600">
              Don't have an account?
              <button
                onClick={()=>navigate('/trainer/signup')}
                className="whitespace-nowrap font-semibold text-gray-900 underline underline-offset-4 hover:text-blue-500"
              >
                Join our team for free.
              </button>
            </p>
          </div>
        </div>
      </div>
      <div className="relative hidden h-screen select-non bg-[url('../../src/assets/pexels-li-sun-2294361.jpg')] bg-gradient-to-br md:block md:w-1/2">
        <div className="py-16 px-8 text-white xl:w-[40rem]">
          
          <p className="mb-4">
            {/* Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt
            necessitatibus nostrum repellendus ab totam. */}
          </p>
          <a
            href="#"
            className="font-semibold tracking-wide text-white underline underline-offset-4"
          >
            {/* Learn More */}
          </a>
        </div>
        <img className="ml-8 w-11/12 max-w-lg rounded-lg object-cover" src="" />
      </div>
    </div>
  );
}

export default TrainerLogin;
