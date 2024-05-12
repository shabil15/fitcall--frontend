import React, { useState, useEffect } from "react";
import Navbar from "../../components/users/Navbar";
import Footer from "../../components/users/Footer";
import { useGetTrainersMutation } from "../../slices/userApiSlice";

function Trainers() {
  const [getTrainers] = useGetTrainersMutation();
  const [trainers, setTrainers] = useState([]); 
  const [currentPage,setCurrentPage]= useState(1);
  const [totalPages,setTotalPages] = useState(1)
  const itemsPerPage = 1;

  useEffect(() => {
    async function fetchTrainers() { // Renamed the function to avoid name collision
      try {
        const res = await getTrainers("").unwrap();
        setTrainers(res.data);
        setTotalPages(Math.ceil(res.total/itemsPerPage));
      } catch (error) {
        console.error("Error fetching trainers:", error);
      }
    }
    fetchTrainers();
  }, [currentPage]);

  const handlePageChange = (pageNumber:number) => {
    setCurrentPage(pageNumber);
  }

  return (
    <div className="bg-secondary h-auto">
      <Navbar />
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
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:px-44 md:px-14 px-3">
        {trainers.map((trainer, index) => ( // Changed 'users' to 'trainers'
          <div key={index} className="max-w-52 shadow-lg rounded-lg  overflow-hidden mt-4 cursor-pointer mx-2 lg:my-16 group">
            <img
              className="w-full h-60 object-cover"
              src={trainer.profile_img} // Assuming trainer object has a profileImage property
              alt="Trainer"
            />
            <div className="bg-secondary text-center py-4 transition-transform duration-300 transform translate-y-0 group-hover:-translate-y-4">
              <h3 className="text-xl font-semibold text-white">{trainer.name}</h3>
              <p className="text-white text-sm">{trainer.specialisation}</p>
            <p className="text-xs text-white">{trainer.language}</p>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default Trainers;
