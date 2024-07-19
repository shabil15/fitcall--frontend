import { useEffect, useRef } from "react";
import Navbar from "../../components/users/Navbar";
import Footer from "../../components/users/Footer";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import io from "socket.io-client";
import { useNavigate } from "react-router-dom";

const Session = () => {
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const socketRef = useRef<any>();
  const navigate = useNavigate();

  useEffect(() => {
    const socket = io("http://localhost:3000");
    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("Connected to Socket.IO");
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from Socket.IO");
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const joinVideoCall = () => {
    try {
      // Emit signal to join the video call with the trainer
      socketRef.current.emit("join-call", userInfo?._id);
      // Navigate to the video chat page with session ID
      navigate(`/videochat/${userInfo?.sessionId}`);
    } catch (error) {
      console.error("Error joining video call:", error);
    }
  };

  return (
    <div className="bg-secondary">
      <Navbar />
      <div className="relative">
        <img
          src="../../../public/assets/header div.jpg"
          alt=""
          className="pt-20 h-56 w-full"
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center mt-8">
          <h1 className="text-3xl font-extrabold text-white mt-5">
            <span className="bg-secondary px-5 py-2 rounded-lg">MY</span>
          </h1>
          <h1 className="text-3xl font-black text-secondary mt-3">SESSION</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 lg:px-44 md:px-14 px-3 mt-5">
        <div className="bg-secondary w-full h-40 shadow-2xl rounded-lg flex text-white justify-between">
          <div className="m-auto">
            <h1 className="text-white font-bold text-2xl">{userInfo?.goal}</h1>
            <h1>
              Session Start Time: <span className="font-extrabold">{userInfo?.sessionTime}</span>
            </h1>
          </div>

          <div
            className="bg-primary shadow-2xl h-10 cursor-pointer w-40 m-auto rounded-xl"
            onClick={joinVideoCall}
          >
            <h1 className="text-black text-lg font-bold text-center">Join Now</h1>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Session;
