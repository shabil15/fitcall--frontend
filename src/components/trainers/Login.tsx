import { useState } from "react";


interface FormData {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    password: "",
  });

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    // Add your form submission logic here, e.g., sending data to a server
    // For now, let's just log the form data
    console.log(formData);
  };

  return (
    <>
      <section>
        <div className="flex h-screen ">
          {/* Left Pane */}
          <img
            src="/assets/Group 880.png"
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
                    <h1 className="text-xl text-center lg:text-2xl m-0 p-0 font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                      Welcome to FitCall 
                    </h1>
                    <p
                      className="font-poppins text-lg text-center font-light"
                      style={{ marginTop: "0.5rem" }}
                    >
                      Trainer Sign In
                    </p>
                    <form className="space-y-3" onSubmit={handleSubmit}>
                      <div className="w-4/5 mx-auto flex justify-between mt-4">
                        <div className="w-full m-1">
                          <label className="block mb-2 text-sm font-medium text-gray-900 ">
                            Email
                          </label>
                          <input
                            type="text"
                            value={formData.username}
                            name="username"
                            onChange={handleChange}
                            className="bg-cyan-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="Set a name"
                          />
                        </div>
                      </div>

                      <div className="w-4/5 mx-auto flex justify-between">
                        <div className="w-full m-1">
                          <label className="block mb-2 text-sm font-medium text-gray-900 ">
                            Password
                          </label>
                          <input
                            type="password"
                            value={formData.password}
                            name="password"
                            onChange={handleChange}
                            className="bg-cyan-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="At least 8 characters"
                          />
                        </div>
                      </div>
                      <p
                        className="text-end mx-12 text-sm text-blue-600 cursor-pointer"
                      >
                        Forgot Password?
                      </p>
                      <button
                        type="submit"
                        className="w-4/5 mx-11 text-white bg-zinc-950 hover:bg-zinc-900 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                      >
                        Sign In
                      </button>
                      <hr />
                      <div className="flex justify-center"></div>
                      <p className="cursor-pointer text-sm text-center font-light text-gray-500">
                        Don't have an account yet?{" "}
                        <span
                          className="font-medium text-blue-600 hover:underline "
                        >
                          Sign up
                        </span>
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Right Pane */}
          <div className="hidden signup-banner lg:flex bg-[url('/assets/pexels-li-sun-2294361.jpg')] items-center justify-center flex-1 object-center bg-white text-black">
            <div className="text-center"></div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
