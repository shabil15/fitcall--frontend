import { Fragment } from 'react';
import React from "react";
import { Menu, Transition } from '@headlessui/react';
import { useDispatch, useSelector } from "react-redux";
import {Link,useNavigate} from 'react-router-dom';
import Swal from "sweetalert2";
import { openLoginModal } from "../../slices/modalSlices/loginModal";
import Login from "../../components/common/login";
import { RootState } from "../../app/store";
import { userLogout } from "../../slices/authSlice";
import { useLogoutMutation } from "../../slices/userApiSlice";
import "./alert.css";
import { toast } from "react-toastify";

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const [logOut] = useLogoutMutation();
  
  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
  }

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
      }
    }
  };

  return (
    <div className="absolute">
      <nav className=" fixed w-full z-20 top-0 start-0 ">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="" className="flex items-center mb-3">
            <img
              src="../../../src/assets/FITcALL lOGO.png"
              className="h-8"
              alt="FitCall Logo"
            />
            <span className="self-center text-customFont text-2xl font-extrabold whitespace-nowrap text-white">
              FitCall
            </span>
          </a>
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            {userInfo ? (
             <Menu as="div" className="relative ml-3">
             <div>
               <Menu.Button className="relative flex rounded-full bg-primary text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                 <span className="absolute -inset-1.5" />
                 <span className="sr-only">Open user menu</span>
                  {userInfo.profile_img ? 
                  <img
                  className="h-8 w-8 rounded-full"
                  src={userInfo.profile_img}
                   alt=""
                />:
                <img
                className="h-8 w-8 rounded-full"
                src='/src/assets/images.png'
                 alt=""
              />
              } 
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
                     <a
                      onClick={()=>navigate("/profile")}
                       className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-white hover:bg-primary hover:text-secondary')}
                     >
                       Your Profile
                     </a>
                   )}
                 </Menu.Item>
                 <Menu.Item>
                   {({ active }) => (
                     <a
                       href="#"
                       className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-white hover:bg-primary hover:text-secondary')}
                     >
                       Settings
                     </a>
                   )}
                 </Menu.Item>
                 <Menu.Item>
                   {({ active }) => (
                     <a onClick={handleLogout}
                       href="#"
                       className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-white hover:bg-primary hover:text-secondary')}
                     >
                       Sign out
                     </a>
                   )}
                 </Menu.Item>
               </Menu.Items>
             </Transition>
           </Menu> 
            ) : (
              <button
                onClick={handleLoginButtonClick}
                className="text-secondary bg-primary hover:bg-primary font-medium rounded-lg text-sm px-4 py-2 text-center .bg-primary-600 .hover:bg-primary "
              >
                Get started
              </button>
            )}

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
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
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
                  className="block py-2 px-3 text-white bg-primary  text-customFont rounded md:bg-transparent md:p-0 md:hover:text-primary "
                  aria-current="page"
                >
                 <Link to={"/"}>Home</Link>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 text-gray-900 rounded text-customFont hover:bg-gray-100 md:hover:bg-transparent md:hover:text-primary md:p-0 md:.hover:text-primary text-white .hover:bg-gray-700 .hover:text-white md:.hover:bg-transparent .border-gray-700"
                >
                  <Link to={"/trainers"}>Trainers</Link>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 text-gray-900 rounded text-customFont hover:bg-gray-100 md:hover:bg-transparent md:hover:text-primary md:p-0 md:.hover:text-primary text-white .hover:bg-gray-700 .hover:text-white md:.hover:bg-transparent .border-gray-700"
                >
                  <Link to={"/pricing"}>Pricing</Link>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 text-gray-900 rounded text-customFont hover:bg-gray-100 md:hover:bg-transparent md:hover:text-primary md:p-0 md:.hover:text-primary text-white .hover:bg-gray-700 .hover:text-white md:.hover:bg-transparent .border-gray-700"
                >
                  <Link to={"/aboutus"}>About us</Link>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-primary md:p-0 md:.hover:text-primary text-white .hover:bg-gray-700 .hover:text-white md:.hover:bg-transparent .border-gray-700"
                >
                  <Link to={"/contactus"}>Contact</Link>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Login />
    </div>
  );
}
