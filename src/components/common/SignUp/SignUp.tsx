


const Signup = () => {



  return (
    <>
      <section>
        <div className="flex h-screen">
          {/* Left Pane */}
          <img
            
            src="/images/FlexifyBlack.png"
            className="absolute w-28 m-8 lg:block hidden"
            alt=""
          />
          <div className="w-full bg-white lg:w-1/2 flex items-center justify-end sm:justify-center">
            <div className="max-w-md w-full mx-auto">
              {/* Your form elements go here */}
              <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-screen bg-white md:mt-0 sm:max-w-lg xl:p-0">
                  <div className="p-6 space-y-1 md:space-y-6 sm:p-8">
                    <img
                      src="/images/FlexifyBlack.png"
                      className="w-52 mx-auto sm:mb-12 lg:hidden"
                      alt=""
                    />
                    <h1 className="text-xl lg:text-2xl m-0 p-0 font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                      Welcome Back 
                    </h1>
                    <p
                      className="font-poppins text-lg font-light"
                      style={{ marginTop: "0.5rem" }}
                    >
                      Begin Your Transformation
                    </p>
                    <form
                      className="space-y-4 "
                      
                    >
                      <div className="w-full flex justify-between mt-8">
                        <div className="w-full m-1">
                          <label className="block mb-2 text-sm font-medium text-gray-900 ">
                            User Name
                          </label>
                          <input
                            type="text"
                            
                            name="username"
                            
                            className="bg-cyan-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                            placeholder="Set a name"
                          />
                        </div>
                        <div className="w-full m-1">
                          <label className="block mb-2 text-sm font-medium text-gray-900">
                            Email
                          </label>
                          <input
                            type="email"
                            
                            name="email"
                            
                            className="bg-cyan-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="example@flexify.com"
                          />
                        </div>
                      </div>

                      <div className="w-full flex justify-between">
                        <div className="w-80 m-1">
                          <label className="block mb-2 text-sm font-medium text-gray-900 ">
                            Password
                          </label>
                          <input
                            type="password"
                            
                            name="password"
                            
                            className="bg-cyan-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="At least 8 characters"
                          />

                          {/* validation instructuions */}
                          <div
                           
                           
                          >
                            <div className="hs-tooltip-toggle block text-center">
                              {/* Here should go your password validation component */}
                            </div>
                          </div>
                        </div>
                        <div className="w-80 m-1">
                          <label className="block mb-2 text-sm font-medium text-gray-900 ">
                            Confirm password
                          </label>
                          <input
                            type="password"
                            name="confirmPassword"
                           
                            className="bg-cyan-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="Confirm password"
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="w-full text-white bg-zinc-950 hover:bg-zinc-900 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                      >
                        Sign Up
                      </button>

                      <hr />
                      <div className="flex justify-center"></div>

                      <p className="cursor-pointer text-sm text-center font-light text-gray-500 ">
                        Already have an account?{" "}
                        <span
                          
                          className="font-medium text-blue-600 hover:underline  cursor-pointer"
                        >
                          Sign in
                        </span>
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Right Pane */}
          <div className="hidden signup-banner lg:flex bg-[url('../../../src/assets/pexels-li-sun-2294361.jpg')] items-center justify-center flex-1 bg-white text-black">
            <div className=" text-center"></div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signup;
