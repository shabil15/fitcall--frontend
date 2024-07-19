import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { openLoginModal } from "../../slices/modalSlices/loginModal";

function Hero() {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state: RootState) => state.auth);

  const handleLoginButtonClick = () => {
    dispatch(openLoginModal());
  };

  return (
    <div>
      <section className="relative bg-[url(/assets/pexels-leon-ardho-1552242.jpg)] bg-cover bg-center bg-no-repeat">
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>

        <div className="absolute inset-0 sm:bg-transparent ltr:sm:bg-gradient-to-r rtl:sm:bg-gradient-to-l"></div>

        <div className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8">
          <div
            className="max-w-xl  ltr:sm:text-left rtl:sm:text-right "
            data-aos="fade-right"
            data-aos-offset="400"
            data-aos-easing="ease-in-sine"
          >
            <h1 className="text-7xl font-black text-primary sm:text-9xl ">
              Be Your
              <strong className="text-customFont text-white">
                {" "}
                Best Self{" "}
              </strong>
            </h1>

            <p className="mt-4 max-w-lg text-white text-2xl sm:text-xl/relaxed">
              with FitCall, Start now.
            </p>
            {userInfo ? (
              <div className="mt-8 flex  flex-wrap gap-4 text-center"></div>
            ) : (
              <div className="mt-8 flex  flex-wrap gap-4 text-center">
                <button
                  onClick={handleLoginButtonClick}
                  className="block rounded bg-primary px-12 py-3  font-medium text-secondary shadow focus:outline-none   "
                >
                  Get Started
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Hero;
