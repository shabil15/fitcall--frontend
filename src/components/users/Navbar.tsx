import { Fragment, useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Menu, Transition } from '@headlessui/react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
import Login from "../../components/common/login";
import { RootState } from "../../app/store";
import { userLogout } from "../../slices/authSlice";
import { useLogoutMutation } from "../../slices/userApiSlice";
import { toast } from "react-toastify";
import { ButtonsCard } from '../ui/ButtonCards';
import { FaRegBell } from "react-icons/fa";
import Notifications from './Notifications';

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const [logOut] = useLogoutMutation();

  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for off-canvas menu

  const menuRef = useRef(null); // Ref for off-canvas menu

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos, visible]);

  useEffect(() => {
    // Function to close menu when clicking outside
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up the event listener on unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLoginButtonClick = () => {
    dispatch(openLoginModal());
  };

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3BE48B",
      cancelButtonColor: "#3d3636",
      confirmButtonText: "Yes, log me out!",
      customClass: {
        popup: "swal-custom-background",
        title: "swal2-title",
        content: "swal2-content",
        confirmButton: "swal2-confirm",
      },
    });

    if (result.isConfirmed) {
      try {
        navigate("/");
        dispatch(userLogout());
        const res = await logOut("").unwrap();
        toast.success(res.message);
      } catch (error) {
        console.error(error);
        toast.error("Failed to logout");
      }
    }
  };

  return (
    <div className={`fixed top-0 right-0 w-full z-20 transition-transform duration-300 ${visible ? 'translate-y-0' : '-translate-y-full'}`}>
      <nav className="max-w-screen-xl flex items-center justify-between mx-auto p-4 text-white">
        <a href="/" className="flex items-center">
          <img
            src="../../../src/assets/FITcALL lOGO.png"
            className="h-8"
            alt="FitCall Logo"
          />
          <span className="ml-2 text-2xl font-extrabold whitespace-nowrap">
            FitCall
          </span>
        </a>
        
        {/* Off-canvas menu on the right */}
        <div ref={menuRef} className={`fixed inset-y-0 right-0 w-64 shadow-lg rounded-lg z-20 py-6 px-4 transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 `}>
          <ul className="space-y-4 bg-secondary rounded-xl">
            <li>
              <Link
                to={"/"}
                className="block py-2 px-3 text-white rounded hover:bg-gray-900"
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to={"/trainers"}
                className="block py-2 px-3 text-white rounded hover:bg-gray-900"
              >
                Trainers
              </Link>
            </li>
            <li>
              <Link
                to={"/pricing"}
                className="block py-2 px-3 text-white rounded hover:bg-gray-900"
              >
                Pricing
              </Link>
            </li>
            <li>
              <Link
                to={"/aboutus"}
                className="block py-2 px-3 text-white rounded hover:bg-gray-900"
              >
                About us
              </Link>
            </li>
            <li>
              <Link
                to={"/contactus"}
                className="block py-2 px-3 text-white rounded hover:bg-gray-900"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div className="items-center hidden w-full md:flex md:w-auto">
          <ul className="flex flex-col md:flex-row md:space-x-8">
            <li>
              <Link
                to={"/"}
                className="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-primary"
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to={"/trainers"}
                className="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-primary"
              >
                Trainers
              </Link>
            </li>
            <li>
              <Link
                to={"/pricing"}
                className="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-primary"
              >
                Pricing
              </Link>
            </li>
            <li>
              <Link
                to={"/aboutus"}
                className="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-primary"
              >
                About us
              </Link>
            </li>
            <li>
              <Link
                to={"/contactus"}
                className="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-primary"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Hamburger menu button for mobile */}
        

        <div className="flex items-center space-x-3">
          {userInfo ? (
            <div className="relative">
              <FaRegBell className='cursor-pointer mr-3' onClick={() => setShowNotifications(!showNotifications)} />
              {showNotifications && <Notifications userId={userInfo._id} />}
            </div>
          ) : ""}
          {userInfo ? (
            <div className="flex">
              <Menu as="div" className="relative">
                <div>
                  <Menu.Button className="relative flex items-center justify-center w-8 h-8 rounded-full bg-primary text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    {userInfo.profile_img ? (
                      <img
                        className="w-full h-full rounded-full"
                        src={userInfo.profile_img}
                        alt="User Profile"
                      />
                    ) : (
                      <img
                        className="w-full h-full rounded-full"
                        src="/src/assets/images.png"
                        alt="Default Profile"
                      />
                    )}
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-secondary py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to={"/profile"}
                          className={`block px-4 py-2 text-sm text-white hover:bg-gray-700 `}
                        >
                          Your Profile
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to={"/myplan"}
                          className={`block px-4 py-2 text-sm text-white  hover:bg-gray-700 hover:text-secondary'}`}
                        >
                          My Plan
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          onClick={handleLogout}
                          href="#"
                          className={`block px-4 py-2 text-sm text-white hover:bg-gray-700 hover:text-secondary'}`}
                        >
                          Sign out
                        </a>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
              <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            type="button"
            className="inline-flex items-center justify-center w-10 h-10 p-2 text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-controls="mobile-menu"
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className={`${isMenuOpen ? 'hidden' : 'block'} w-6 h-6`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
            <svg
              className={`${isMenuOpen ? 'block' : 'hidden'} w-6 h-6`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
            </div>
          ) : (
            <ButtonsCard>
              <button
                onClick={handleLoginButtonClick}
                className="inline-flex h-12 animate-shimmer bg-primary items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
              >
                Get started
              </button>
            </ButtonsCard>
          )}
        </div>
      </nav>
      <Login />
    </div>
  );
}
