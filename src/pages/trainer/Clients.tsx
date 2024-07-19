import React, { useEffect, useState } from 'react';
import { useGetClientsMutation } from '../../slices/TrainerApiSlice';
import { RootState } from '../../app/store';
import { useSelector } from 'react-redux';
import Navbar from '../../components/trainers/Navbar';
import Footer from '../../components/trainers/Footer';
import { useNavigate } from 'react-router-dom';
import { IUser } from '../../@types/schema';

const ClientsList: React.FC = () => {
  const { trainerInfo } = useSelector((state: RootState) => state.auth);
  const trainerId = trainerInfo?._id;

  const [clients, setClients] = useState<IUser[]>([]);
  const [getClients] = useGetClientsMutation();
  const navigate = useNavigate(); // Ensure this is at the top level

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await getClients(trainerId);
        
        if ('data' in response) {
          setClients(response.data || []);
        } else {
          console.error('Error fetching clients:', response.error);
        }
      } catch (error) {
        console.error('Error fetching clients:', error);
      }
    };

    if (trainerId) {
      fetchClients();
    }
  }, [trainerId, getClients]);

  return (
    <div className="bg-secondary">
      <Navbar />
      <div className="relative">
        <img
          src="/assets/header div.jpg"
          alt=""
          className="pt-20 h-56 w-full"
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center mt-8">
          <h1 className="text-3xl font-extrabold text-white mt-5">
            <span className="bg-secondary italic px-5 py-2 rounded-lg">MY</span>
          </h1>
          <h1 className="text-3xl font-extrabold italic text-secondary mt-3">
            CLIENTS
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:px-44 md:px-14 px-3">
        {clients.map((client) => (
          <div
            onClick={() => navigate("clientsDetails", { state: { data: client } })}
            key={client?._id}
            className="max-w-52 shadow-lg rounded-lg overflow-hidden mt-4 cursor-pointer mx-2 lg:my-16 group"
          >
            <img
              className="w-full h-60 object-cover"
              src={client?.profile_img}
              alt="Client"
            />
            <div className="bg-secondary text-center py-4 transition-transform duration-300 transform translate-y-0 group-hover:-translate-y-4">
              <h3 className="text-xl font-semibold text-white">{client?.name}</h3>
              <p className="text-white text-sm">{client?.mobile}</p>
              <p className="text-xs text-white">{client?.goal}</p>
            </div>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default ClientsList;
