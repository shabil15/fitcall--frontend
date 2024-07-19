import { useFormik } from "formik";
import { FormLogin, MyError } from "../../validation/validationTypes";
import { loginValidation } from "../../validation/yupValidation";
import { useAdminLoginMutation } from "../../slices/adminApiSlices";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { setAdminCredentials } from "../../slices/authSlice";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const dispatch = useDispatch();
  const [login] = useAdminLoginMutation();
  const navigate = useNavigate();

  const initialValues: FormLogin = {
    password: "",
    email: "",
  };
  const { values, handleChange, handleSubmit, errors, touched } = useFormik({
    initialValues: initialValues,
    validationSchema: loginValidation,
    onSubmit: async (values) => {
      try {
        console.log(values);
        
        const { password, email } = values; // Destructure values
        const res = await login({ password, email }).unwrap();
        dispatch(setAdminCredentials({ ...res.data}));
        navigate('/admin')
        toast.success(res.message);
      } catch (err) {
        toast.error((err as MyError)?.data?.message || (err as MyError)?.error);
      }
    },
  });

  return (
    <main className="mx-auto flex min-h-screen w-full items-center justify-center text-xl font-customFont bg-white text-black">
      <form action="" onSubmit={handleSubmit} className="w-[30rem] flex flex-col space-y-10">
        <img src="../../../public/assets/Group 880.png" className="mx-auto w-44 " alt="" />
        <div className="text-center text-4xl font-extrabold">Admin Log In</div>
        <div className="relative">
          <input
            name="email"
            value={values.email}
            onChange={handleChange}
            placeholder="Email"
            type="email"
            className="w-full py-2 px-4 rounded border border-gray-300 placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          />
          {errors.email && touched.email && (
            <div className="text-red-500">{errors.email}</div>
          )}
        </div>

        <div className="relative">
          <input
            name="password"
            value={values.password}
            onChange={handleChange}
            placeholder="Password"
            type="password"
            className="w-full py-2 px-4 rounded border border-gray-300 placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          />
          {errors.password && touched.password && (
            <div className="text-red-500">{errors.password}</div>
          )}
        </div>

        <button type="submit" className="transform rounded-2xl bg-primary shadow-xl py-2 font-bold font-customFont duration-300 hover:bg-secondary hover:text-primary">
          LOG IN
        </button>
      </form>
    </main>
  );
}

export default AdminLogin;
