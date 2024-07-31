
import React, { useState, useEffect } from "react";
import Navbar from "../../components/users/Navbar";
import Footer from "../../components/users/Footer";
import { useGetTrainersMutation } from "../../slices/userApiSlice";
import { IoSearchOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import {ITrainer} from '../../@types/schema';
import { motion } from 'framer-motion';

function Trainers() {
  
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [trainers, setTrainers] = useState<ITrainer[]>([]); 
  const [currentPage,setCurrentPage]= useState<number>(1);
  const [totalPages,setTotalPages] = useState<number>(1)
  const itemsPerPage:number = 4;
  const [specialisationFilter, setSpecialisationFilter] = useState<string>("");
  const [languageFilter, setLanguageFilter] = useState<string>("");
  const [searchQuery,setSearchQuery] = useState<string>("");
  const [getTrainers] = useGetTrainersMutation();
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchTrainers() {
      try {
        const res = await getTrainers({
          page: currentPage,
          per_page: itemsPerPage,
          specialisation: specialisationFilter,
          language: languageFilter,
          search: searchQuery 
        }).unwrap();
        setTrainers(res.data);
        setTotalPages(Math.ceil(res.total / itemsPerPage));
      } catch (error) {
        console.error("Error fetching trainers:", error);
      }
    }
  
    fetchTrainers();
  }, [currentPage, specialisationFilter, languageFilter, searchQuery,getTrainers]);

  const handlePageChange = (pageNumber:number) => {
    setCurrentPage(pageNumber);
  }

  const handleSpecialisationChange = (event: React.FormEvent<HTMLSelectElement>) => {
    setSpecialisationFilter(event.currentTarget.value);
  };

  const handleLanguageChange = (event: React.FormEvent<HTMLSelectElement>) => {
    setLanguageFilter(event.currentTarget.value);
  };

  const handleSearch = (event: React.FormEvent<HTMLInputElement>) => {
    setSearchQuery(event.currentTarget.value);
  };

  const handleSearchClick = () => {
    setShowSearchInput(!showSearchInput);
    if (!showSearchInput) {
      const searchInput = document.getElementById('searchInput');
      if (searchInput) {
        searchInput.focus();
      }
    }
  };

  const handleCardClick = (trainer:ITrainer) => {
    navigate('/trainerDetails', { state: { data: trainer } });
  };

  const specialisations: string[] = [
    "Weight Loss", "Muscle Gain", "Cardio Fitness",
    "Mind-Body Wellness", "Nutrition and Diet",
  ];
  
  const languages: string[] = [
    "English", "Malayalam", "Chinese", "Spanish", "Hindi", "French",
    "Standard Arabic", "Bengali", "Russian", "Portuguese", "Urdu",
    "German", "Japanese", "Swahili", "Telugu",
  ];

  const TrainerCardSkeleton = () => (
    <div className="max-w-52 shadow-lg rounded-lg overflow-hidden mt-4 mx-2 lg:my-16 animate-pulse">
      <div className="bg-gray-300 h-60 w-full"></div>
      <div className="bg-secondary text-center py-4 transition-transform duration-300 transform translate-y-0 group-hover:-translate-y-4">
        <h3 className="text-xl font-semibold text-white">Loading...</h3>
        <p className="text-white text-sm">Loading...</p>
        <p className="text-xs text-white">Loading...</p>
      </div>
    </div>
  );

  return (
    <div className="bg-secondary h-auto">
      <Navbar />
      <div className="relative">
        <img src="/assets/header div.jpg" alt="" className="pt-20 h-56 w-full" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center mt-8">
          <h1 className="text-3xl font-extrabold text-white mt-5">
            <span className="bg-secondary italic px-5 py-2 rounded-lg">OUR</span>
          </h1>
          <h1 className="text-3xl font-extrabold italic text-secondary mt-3">TRAINERS</h1>
        </div>
      </div>

      <div className="py-4 px-8 flex items-center justify-between text-white rounded-lg shadow-lg">
        <div className="items-start flex">
          <div className="flex items-center">
            <label htmlFor="specialisation" className="mr-2"></label>
            <select
              id="specialisation"
              value={specialisationFilter}
              onChange={handleSpecialisationChange}
              className="bg-secondary rounded-lg px-2 py-1 appearance-none focus:outline-none focus:border-none"
            >
              <option value="">Specialisations</option>
              {specialisations.map((specialisation, index) => (
                <option key={index} value={specialisation} className="hover:bg-primary hover:text-white">
                  {specialisation}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center">
            <select
              id="language"
              value={languageFilter}
              onChange={handleLanguageChange}
              className="bg-secondary rounded-lg px-2 py-1 appearance-none focus:border-none focus:outline-none"
            >
              <option value="">Languages</option>
              {languages.map((language, index) => (
                <option key={index} value={language} className="focus:bg-primary">
                  {language}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="items-end flex">
          <button
            className="text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={handleSearchClick}
          >
            {showSearchInput ? "" : <IoSearchOutline />}
          </button>
        </div>
        {showSearchInput && (
          <div>
            <input
              type="text"
              id="searchInput"
              className="focus:outline-none bg-secondary focus:bg-secondary transition border-b border-grey-600"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:px-44 md:px-14 px-3">
      {trainers.length > 0 ? (
      trainers.map((trainer) => (
        <motion.div
          key={trainer._id}
          onClick={() => handleCardClick(trainer)}
          className="max-w-52 shadow-lg rounded-lg overflow-hidden mt-4 cursor-pointer mx-2 lg:my-16 group"
          layoutId={`trainer-${trainer._id}`}
        >
          <motion.img
            layoutId={`trainer-img-${trainer._id}`}
            className="w-full h-60 object-cover"
            src={trainer.profile_img}
            alt="Trainer"
          />
          <div className="bg-secondary text-center py-4 transition-transform duration-300 transform translate-y-0 group-hover:-translate-y-4">
            <h3 className="text-xl font-semibold text-white">{trainer.name}</h3>
            <p className="text-white text-sm">{trainer.specialisation}</p>
            <p className="text-xs text-white">{trainer.language}</p>
          </div>
        </motion.div>
      ))
      ):(
        Array.from({ length: itemsPerPage }).map((_, index) => <TrainerCardSkeleton key={index} />)
      )
    }
    </div>

      <div className="pagingation text-center text-primary">
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          {"< Previous"}
        </button>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`px-2 ${currentPage === page ? "active" : ""}`}
          >
            {page}
          </button>
        ))}
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          {"Next >"}
        </button>
      </div>

      <Footer />
    </div>
  );
}

export default Trainers;
