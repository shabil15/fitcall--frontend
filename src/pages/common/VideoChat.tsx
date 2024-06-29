import React, { useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import io from "socket.io-client";

const VideoChat = () => {
  const { sessionId } = useParams<{ sessionId: string }>();
  const socketRef = useRef<any>();
  const peerConnection = useRef<RTCPeerConnection | null>(null);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const location = useLocation();

  useEffect(() => {
    const initSocket = () => {
      const socket = io("http://localhost:3000");
      socketRef.current = socket;

      socket.on("connect", () => {
        console.log("Connected to Socket.IO");
        socket.emit("join-session", sessionId, location.pathname === "/videochat/user" ? "userId" : "trainerId");
      });

      socket.on("user-connected", (userId: string) => {
        console.log(`User ${userId} connected`);
        startWebRTC();
      });

      socket.on("offer", (offer: RTCSessionDescriptionInit) => {
        handleOffer(offer);
      });

      socket.on("answer", (answer: RTCSessionDescriptionInit) => {
        handleAnswer(answer);
      });

      socket.on("ice-candidate", (candidate: RTCIceCandidateInit) => {
        handleIceCandidate(candidate);
      });

      socket.on("disconnect", () => {
        console.log("Disconnected from Socket.IO");
        cleanupWebRTC();
      });
    };

    initSocket();

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
      cleanupWebRTC();
    };
  }, [sessionId, location.pathname]);

  const startWebRTC = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setLocalStream(stream);

      const configuration = { iceServers: [{ urls: "stun:stun.l.google.com:19302" }] };
      peerConnection.current = new RTCPeerConnection(configuration);

      stream.getTracks().forEach(track => peerConnection.current?.addTrack(track, stream));

      peerConnection.current.ontrack = handleRemoteStreamAdded;
      peerConnection.current.onicecandidate = handleIceCandidateEvent;

      const offer = await peerConnection.current.createOffer();
      await peerConnection.current.setLocalDescription(offer);
      socketRef.current.emit("offer", sessionId, peerConnection.current.localDescription);
    } catch (error) {
      console.error("Error starting WebRTC:", error);
    }
  };

  const handleOffer = async (offer: RTCSessionDescriptionInit) => {
    try {
      if (!peerConnection.current) return;

      await peerConnection.current.setRemoteDescription(offer);
      const answer = await peerConnection.current.createAnswer();
      await peerConnection.current.setLocalDescription(answer);
      socketRef.current.emit("answer", sessionId, peerConnection.current.localDescription);
    } catch (error) {
      console.error("Error handling offer:", error);
    }
  };

  const handleAnswer = async (answer: RTCSessionDescriptionInit) => {
    try {
      if (!peerConnection.current) return;
      await peerConnection.current.setRemoteDescription(answer);
    } catch (error) {
      console.error("Error handling answer:", error);
    }
  };

  const handleIceCandidateEvent = (event: RTCPeerConnectionIceEvent) => {
    if (event.candidate) {
      socketRef.current.emit("ice-candidate", sessionId, event.candidate);
    }
  };

  const handleIceCandidate = async (candidate: RTCIceCandidateInit) => {
    try {
      if (!peerConnection.current) return;
      await peerConnection.current.addIceCandidate(candidate);
    } catch (error) {
      console.error("Error handling ICE candidate:", error);
    }
  };

  const handleRemoteStreamAdded = (event: RTCTrackEvent) => {
    setRemoteStream(event.streams[0]);
  };

  const cleanupWebRTC = () => {
    if (peerConnection.current) {
      peerConnection.current.close();
    }
    setLocalStream(null);
    setRemoteStream(null);
  };

  return (
    <div className="bg-secondary min-h-screen flex flex-col justify-center items-center">
      <div className="relative">
        <img src="../../../src/assets/header div.jpg" alt="" className="pt-20 h-56 w-full object-cover" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center mt-8">
          <h1 className="text-3xl font-extrabold text-white mt-5">
            <span className="bg-secondary px-5 py-2 rounded-lg">VIDEO</span>
          </h1>
          <h1 className="text-3xl font-black text-secondary mt-3">CHAT</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 lg:px-44 md:px-14 px-3 mt-5 w-full max-w-screen-lg">
        <div className="bg-secondary w-full h-80 shadow-2xl rounded-lg flex text-white justify-between">
          <div className="m-auto">
            <h1 className="text-white font-bold text-2xl mb-2">Your Video</h1>
            {localStream && <video className="w-full h-full rounded-lg" autoPlay playsInline ref={(video) => { if (video) video.srcObject = localStream; }} />}
          </div>

          <div className="bg-primary shadow-2xl h-10 cursor-pointer w-40 m-auto rounded-xl flex items-center justify-center" onClick={startWebRTC}>
            <h1 className="text-black text-lg font-bold text-center">Start Call</h1>
          </div>
        </div>

        <div className="bg-secondary w-full h-80 shadow-2xl rounded-lg flex text-white justify-between mt-5">
          <div className="m-auto">
            <h1 className="text-white font-bold text-2xl mb-2">Remote Video</h1>
            {remoteStream && <video className="w-full h-full rounded-lg" autoPlay playsInline ref={(video) => { if (video) video.srcObject = remoteStream; }} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoChat;
