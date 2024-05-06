import React from "react";
import Navbar from "../../components/users/Navbar";
import Footer from "../../components/users/Footer";

function Trainers() {
  return (
    <div className="bg-secondary h-auto">
      <Navbar />
      {/* //////////////////////////////////////////////////////////////// */}
      <div className="relative">
        <img
          src="../../../src/assets/header div.jpg"
          alt=""
          className="pt-20 h-56 w-full"
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center mt-8">
          <h1 className="text-3xl font-extrabold text-white mt-5">
            <span className="bg-secondary italic px-5 py-2 rounded-lg">
              OUR
            </span>
          </h1>
          <h1 className="text-3xl font-extrabold italic text-secondary mt-3">
            TRAINERS
          </h1>
        </div>
      </div>
    {/* ///////////////////////////////////////////////////////////// */}
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:px-44 md:px-14 px-3">
  {[...Array(16)].map((_, index) => (
    <div key={index} className="max-w-52 shadow-lg rounded-lg hover:rounded-none overflow-hidden mt-4 mx-2 group">
      <img
        className="w-full h-60 object-cover"
        src="../../../src/assets/pexels-ivan-samkov-4162491.jpg"
        alt="Trainer"
      />
      <div className="bg-secondary text-center py-4 transition-transform duration-300 transform translate-y-0 group-hover:-translate-y-4">
        <h3 className="text-xl font-semibold text-white">John Doe</h3>
        <p className="text-white">Weight Loss</p>
      </div>
    </div>
  ))}
</div>




      <Footer />
    </div>
  );
}

export default Trainers;
