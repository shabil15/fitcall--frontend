
// import { useState, useEffect } from "react";
// import Navbar from "../../components/trainers/Navbar";
// import Footer from "../../components/trainers/Footer";
// import { RootState } from "../../app/store";
// import { useSelector } from "react-redux";
// import {
//   useGetClientsMutation,
//   useAddSessionMutation,
//   useGetSessionsMutation
// } from "../../slices/TrainerApiSlice";
// import { toast } from 'react-toastify';

// function MySessions() {
//   const { trainerInfo } = useSelector((state: RootState) => state.auth);
//   const [clients, setClients] = useState([]);
//   const [sessions, setSessions] = useState([]);
//   const trainerId = trainerInfo?._id;
//   const [getClients] = useGetClientsMutation();
//   const [addSession] = useAddSessionMutation();
//   const [getSessions] = useGetSessionsMutation();
//   const [selectedClient, setSelectedClient] = useState("");
//   const [selectedTime, setSelectedTime] = useState("");
//   const [availableTimes, setAvailableTimes] = useState([
//     "04:00 AM", "05:15 AM", "06:30 AM", "07:45 AM",
//     "09:00 AM", "10:15 AM", "11:30 AM", "12:45 PM",
//     "02:00 PM", "03:15 PM", "04:30 PM", "05:45 PM",
//     "07:00 PM", "08:15 PM", "09:30 PM", "10:45 PM",
//   ]);

//   useEffect(() => {
//     const fetchClients = async () => {
//       try {
//         const { data } = await getClients(trainerId);
//         setClients(data || []);
//       } catch (error) {
//         console.error("Error fetching clients:", error);
//       }
//     };

//     if (trainerId) {
//       fetchClients();
//     }
//   }, [trainerId, getClients]);

//   const fetchSessions = async () => {
//     try {
//       const { data } = await getSessions(trainerId);
//       setSessions(data || []);

//       const bookedTimes = data.map(session => session.startTime);
//       setAvailableTimes(prevTimes => prevTimes.filter(time => !bookedTimes.includes(time)));
//     } catch (error) {
//       console.error("Error fetching sessions:", error);
//     }
//   };

//   useEffect(() => {
//     if (trainerId) {
//       fetchSessions();
//     }
//   }, [trainerId, getSessions]);

//   const handleAddSession = async (e) => {
//     e.preventDefault();
//     try {
//       if (selectedClient && selectedTime) {
//         const res = await addSession({
//           trainerId,
//           userId: selectedClient,
//           startTime: selectedTime,
//         }).unwrap();
//         toast.success(res.message);
//         console.log("Session scheduled:", res);
//         fetchSessions();

//         setAvailableTimes(prevTimes => prevTimes.filter(time => time !== selectedTime));

//         setSelectedClient("");
//         setSelectedTime("");
//       } else {
//         console.error("Client and time selection required.");
//         toast.error("Client and time selection required.");
//       }
//     } catch (error) {
//       console.error("Failed to schedule session:", error);
//       toast.error("Failed to schedule session.");
//     }
//   };

//   return (
//     <div className="bg-secondary">
//       <Navbar />
//       <div className="relative">
//         <img
//           src="../../../src/assets/header div.jpg"
//           alt=""
//           className="pt-20 h-56 w-full"
//         />
//         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center mt-8">
//           <h1 className="text-3xl font-extrabold text-white mt-5">
//             <span className="bg-secondary  px-5 py-2 rounded-lg">MY</span>
//           </h1>
//           <h1 className="text-3xl font-black text-secondary mt-3">SESSIONS</h1>
//         </div>
//       </div>

//       <div className="bg-secondary text-center shadow-xl mt-4 mx-20 p-8">
//         <h1 className="text-white text-2xl font-bold mb-4">Add New Session</h1>
//         <form className="flex justify-center" onSubmit={handleAddSession}>
//           <div className="">
//             <select
//               id="Time"
//               className="w-full rounded-lg text-black border py-2 px-3"
//               value={selectedTime}
//               onChange={(e) => setSelectedTime(e.target.value)}
//             >
//               <option value="">Select Time</option>
//               {availableTimes.map((time, index) => (
//                 <option key={index} value={time}>
//                   {time}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div className="mx-4">
//             <select
//               id="Client"
//               className="w-full rounded-lg text-black border py-2 px-3"
//               value={selectedClient}
//               onChange={(e) => setSelectedClient(e.target.value)}
//             >
//               <option value="">Select Client</option>
//               {clients.map((client, index) => (
//                 <option key={index} value={client._id}>
//                   {client.name}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <button
//             type="submit"
//             className="text-secondary bg-primary hover:bg-primary font-medium rounded-lg text-sm px-4 py-2 text-center .bg-primary-600 .hover:bg-primary "
//           >
//             Add
//           </button>
//         </form>
//       </div>

//       <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:px-44 md:px-14 px-3 mt-5">
//         {sessions.map((session, index) => (
//           <div key={index} className="max-w-52 shadow-lg rounded-lg overflow-hidden mt-4 cursor-pointer mx-2 p-5 group">
//             <div className='text-white text-center'>
//               Time: <span className='text-primary font-extrabold'>{session.startTime}</span>
//             </div>
//             <hr />
//             <div className="mt-5 text-white text-center">
//               <span className='text-white font-extrabold'>Client Name</span><br />
//               <span className='text-primary font-extrabold'>{session.clientName}</span>
//             </div>
//           </div>
//         ))}
//       </div>

//       <Footer />
//     </div>
//   );
// }

// export default MySessions;


import React, { useState, useEffect } from "react";
import Navbar from "../../components/trainers/Navbar";
import Footer from "../../components/trainers/Footer";
import { RootState } from "../../app/store";
import { useSelector } from "react-redux";
import {
  useGetClientsMutation,
  useAddSessionMutation,
  useGetSessionsMutation,
} from "../../slices/TrainerApiSlice";
import { toast } from "react-toastify";

function MySessions() {
  const { trainerInfo } = useSelector((state: RootState) => state.auth);
  const [clients, setClients] = useState([]);
  const [sessions, setSessions] = useState([]);
  const trainerId = trainerInfo?._id;
  const [getClients] = useGetClientsMutation();
  const [addSession] = useAddSessionMutation();
  const [getSessions] = useGetSessionsMutation();
  const [selectedClient, setSelectedClient] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [availableTimes, setAvailableTimes] = useState([
    "04:00 AM", "05:15 AM", "06:30 AM", "07:45 AM",
    "09:00 AM", "10:15 AM", "11:30 AM", "12:45 PM",
    "02:00 PM", "03:15 PM", "04:30 PM", "05:45 PM",
    "07:00 PM", "08:15 PM", "09:30 PM", "10:45 PM",
  ]);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const { data } = await getClients(trainerId);
        setClients(data || []);
      } catch (error) {
        console.error("Error fetching clients:", error);
      }
    };

    if (trainerId) {
      fetchClients();
    }
  }, [trainerId, getClients]);

  const fetchSessions = async () => {
    try {
      const { data } = await getSessions(trainerId);
      setSessions(data || []);

      const bookedTimes = data.map(session => session.startTime);
      setAvailableTimes(prevTimes =>
        prevTimes.filter(time => !bookedTimes.includes(time))
      );
    } catch (error) {
      console.error("Error fetching sessions:", error);
    }
  };

  useEffect(() => {
    if (trainerId) {
      fetchSessions();
    }
  }, [trainerId, getSessions]);

  const handleAddSession = async (e) => {
    e.preventDefault();
    try {
      if (selectedClient && selectedTime) {
        const res = await addSession({
          trainerId,
          userId: selectedClient,
          startTime: selectedTime,
        }).unwrap();
        toast.success(res.message);
        console.log("Session scheduled:", res);
        fetchSessions();

        setAvailableTimes(prevTimes =>
          prevTimes.filter(time => time !== selectedTime)
        );
        setClients(prevClients =>
          prevClients.filter(client => client._id !== selectedClient)
        );

        setSelectedClient("");
        setSelectedTime("");
      } else {
        console.error("Client and time selection required.");
        toast.error("Client and time selection required.");
      }
    } catch (error) {
      console.error("Failed to schedule session:", error);
      toast.error("Failed to schedule session.");
    }
  };

  return (
    <div className="bg-secondary">
      <Navbar />
      <div className="relative">
        <img
          src="../../../src/assets/header div.jpg"
          alt=""
          className="pt-20 h-56 w-full"
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center mt-8">
          <h1 className="text-3xl font-extrabold text-white mt-5">
            <span className="bg-secondary  px-5 py-2 rounded-lg">MY</span>
          </h1>
          <h1 className="text-3xl font-black text-secondary mt-3">SESSIONS</h1>
        </div>
      </div>

      <div className="bg-secondary text-center shadow-xl mt-4 mx-20 p-8">
        <h1 className="text-white text-2xl font-bold mb-4">Add New Session</h1>
        <form className="flex justify-center" onSubmit={handleAddSession}>
          <div className="">
            <select
              id="Time"
              className="w-full rounded-lg text-black border py-2 px-3"
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
            >
              <option value="">Select Time</option>
              {availableTimes.map((time, index) => (
                <option key={index} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>
          <div className="mx-4">
            <select
              id="Client"
              className="w-full rounded-lg text-black border py-2 px-3"
              value={selectedClient}
              onChange={(e) => setSelectedClient(e.target.value)}
            >
              <option value="">Select Client</option>
              {clients.map((client, index) => (
                <option key={index} value={client._id}>
                  {client.name}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="text-secondary bg-primary hover:bg-primary font-medium rounded-lg text-sm px-4 py-2 text-center .bg-primary-600 .hover:bg-primary "
          >
            Add
          </button>
        </form>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:px-44 md:px-14 px-3 mt-5">
        {sessions.map((session, index) => (
          <div key={index} className="max-w-52 shadow-lg rounded-lg overflow-hidden mt-4 cursor-pointer mx-2 p-5 group">
            <div className='text-white text-center'>
              Time: <span className='text-primary font-extrabold'>{session.startTime}</span>
            </div>
            <hr />
            <div className="mt-5 text-white text-center">
              <span className='text-white font-extrabold'>Client Name</span><br />
              <span className='text-primary font-extrabold'>{session.clientName}</span>
            </div>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
}

export default MySessions;
