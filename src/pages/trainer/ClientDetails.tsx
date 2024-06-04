import React from 'react';
import Navbar from '../../components/trainers/Navbar';
import Footer from '../../components/trainers/Footer';
import { MdModeEdit } from "react-icons/md";
import { GoGoal } from "react-icons/go";
import { IoPersonSharp } from "react-icons/io5";
import { FaMobileAlt } from "react-icons/fa";
import { FaPerson, FaWeightScale } from "react-icons/fa6";
import { MdOutlineMail } from "react-icons/md";
import { useLocation } from 'react-router-dom';

function ClientDetails() {
  const location = useLocation();
  const { data } = location.state || { data: null }; // Provide a default value if location.state is null

  if (!data) {
    return <div>No client data available.</div>; // Handle case when data is null
  }

  return (
    <div className='bg-secondary'>
      <Navbar />
      <div className="relative">
        <img
          src="../../../src/assets/header div.jpg"
          alt=""
          className="pt-20 h-56 w-full"
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center mt-8">
          <h1 className="text-3xl font-extrabold text-white mt-5">
            <span className="bg-secondary italic px-5 py-2 rounded-lg">CLIENT</span>
          </h1>
          <h1 className="text-3xl font-extrabold italic text-secondary mt-3">
            DETAILS
          </h1>
        </div>
      </div>

      <h1>{data.name}</h1>

      {/* Add the remaining content here as needed */}
      
      <Footer />
    </div>
  );
}

export default ClientDetails;
