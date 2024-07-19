
function Navbar() {
  return (
    <div className="absolute">
      <nav className=" fixed w-full z-20 top-0 start-0 ">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="" className="flex items-center mb-3">
            <img
              src="/assets/FITcALL lOGO.png"
              className="h-8"
              alt="Flowbite Logo"
            />
            <span className="self-center text-customFont text-2xl font-extrabold whitespace-nowrap text-white">
              FitCall
            </span>
          </a>
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <button
              type="button"
              className="text-secondary bg-primary hover:bg-primary font-medium rounded-lg text-sm px-4 py-2 text-center .bg-primary-600 .hover:bg-primary "
            >
              Get started
            </button>
            <button
              data-collapse-toggle="navbar-sticky"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 text-gray-400 .hover:bg-gray-700 .focus:ring-gray-600"
              aria-controls="navbar-sticky"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-sticky"
          >
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border  md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0  md:.bg-gray-900 ">
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 text-white bg-primary  text-customFont rounded md:bg-transparent md:text-primary md:p-0 md:text-primary"
                  aria-current="page"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 rounded text-customFont hover:bg-gray-100 md:hover:bg-transparent md:hover:text-primary md:p-0 md:.hover:text-primary text-white .hover:bg-gray-700 .hover:text-white md:.hover:bg-transparent .border-gray-700"
                >
                  Trainers
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-3  rounded text-customFont hover:bg-gray-100 md:hover:bg-transparent md:hover:text-primary md:p-0 md:.hover:text-primary text-white .hover:bg-gray-700 .hover:text-white md:.hover:bg-transparent .border-gray-700"
                >
                  About us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-primary md:p-0 md:.hover:text-primary text-white .hover:bg-gray-700 .hover:text-white md:.hover:bg-transparent .border-gray-700"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
