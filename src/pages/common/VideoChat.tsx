import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import io from "socket.io-client";
import { FaPhoneSlash, FaMicrophone, FaMicrophoneSlash, FaVideo, FaVideoSlash } from 'react-icons/fa';
import Draggable from 'react-draggable';

const VideoChat = () => {
  const {sessionId}= useParams(); 
  const socketRef = useRef<any>();
  const peerConnection = useRef<RTCPeerConnection | null>(null);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [callStarted, setCallStarted] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoDisabled, setIsVideoDisabled] = useState(false);
  const [showStartButton, setShowStartButton] = useState(true); // State to manage showing the Start Call button
  const [showPartnerDisconnected, setShowPartnerDisconnected] = useState(false); // State for partner disconnected notification
  const navigate = useNavigate();

  useEffect(() => {

    const trainerJwt = localStorage.getItem('trainerInfo');
    const userJwt = localStorage.getItem('userInfo');

    if (!trainerJwt && !userJwt) {
      navigate('/'); 
      return;
    }

    const initSocket = () => {
      const socket = io("https://brandkicks.shop");
      socketRef.current = socket;

      socket.on("connect", () => {
        console.log("Connected to Socket.IO",sessionId);
        socket.emit("join-session", sessionId); 
      });

      socket.on("user-connected", (userId: string) => {
        console.log(`User ${userId} connected`);
      });

      socket.on("partner-disconnected", () => {
        console.log("Partner disconnected");
        setShowPartnerDisconnected(true);
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
  }, [sessionId]);

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
      setCallStarted(true);
      setShowStartButton(false); // Hide the Start Call button after starting the call
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

  const toggleMute = () => {
    if (localStream) {
      localStream.getAudioTracks()[0].enabled = !localStream.getAudioTracks()[0].enabled;
      setIsMuted(!localStream.getAudioTracks()[0].enabled);
    }
  };

  const toggleVideo = () => {
    if (localStream) {
      localStream.getVideoTracks()[0].enabled = !localStream.getVideoTracks()[0].enabled;
      setIsVideoDisabled(!localStream.getVideoTracks()[0].enabled);
    }
  };

  const hangUp = () => {
    cleanupWebRTC();
    if (socketRef.current) {
      socketRef.current.disconnect();
    }
    navigate("/"); // Navigate back to home or another appropriate route
  };

  const cleanupWebRTC = () => {
    if (peerConnection.current) {
      peerConnection.current.close();
      peerConnection.current = null;
    }
    if (localStream) {
      localStream.getTracks().forEach(track => track.stop());
    }
    setLocalStream(null);
    setRemoteStream(null);
    setCallStarted(false);
    setShowStartButton(true); // Show the Start Call button again when call is ended
    setShowPartnerDisconnected(false); // Reset partner disconnected notification
  };

  return (
    <div className="bg-secondary min-h-screen flex flex-col justify-center items-center relative">
      {showStartButton && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center mt-8 z-50">
          <div className="bg-primary shadow-2xl h-10 cursor-pointer w-40 m-auto rounded-xl flex items-center justify-center" onClick={startWebRTC}>
            <h1 className="text-black text-lg font-bold text-center justify-center">Start Session</h1>
            <FaVideo className="mx-2 text-secondary" />
          </div>
        </div>
      )}
      <div className="w-full h-full flex items-center justify-center">
        {callStarted ? (
          remoteStream ? (
            <div className="bg-white rounded-xl shadow-2xl overflow-hidden h-[620px] w-[1100px] transform scaleX(-1)">
              <video className="w-full h-full object-cover rounded-xl" autoPlay playsInline ref={(video) => { if (video) video.srcObject = remoteStream; }} />
            </div>
          ) : (
            <div className="w-auto h-auto flex items-center justify-center text-white text-xl">Waiting for other person to join...</div>
          )
        ) : (
          <div className="w-full h-full flex items-center justify-center  mb-16 text-white text-xl">Start the Call to Join</div>
        )}
      </div>
      {localStream && (
        <Draggable
          bounds="parent"
          onStart={() => setIsVideoDisabled(true)}
          onStop={() => setIsVideoDisabled(false)}
        >
          <div className="absolute bottom-0 right-0 m-4 rounded-lg bg-gray-800 cursor-move">
            <video className="w-48 h-36 rounded-lg" autoPlay playsInline ref={(video) => { if (video) video.srcObject = localStream; }} />
          </div>
        </Draggable>
      )}
      {callStarted && (
        <div className="absolute shadow-lg p-5 rounded-lg bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-4 z-50">
          <button onClick={hangUp} className="bg-red-600 p-2 rounded-full">
            <FaPhoneSlash className="text-white" />
          </button>
          <button onClick={toggleMute} className={`p-2 rounded-full bg-yellow-400`}>
            {isMuted ? <FaMicrophoneSlash className="text-white" /> : <FaMicrophone className="text-white" />}
          </button>
          <button onClick={toggleVideo} className={`p-2 rounded-full bg-blue-500`}>
            {isVideoDisabled ? <FaVideoSlash className="text-white" /> : <FaVideo className="text-white" />}
          </button>
        </div>
      )}
      {showPartnerDisconnected && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-600 text-white py-2 px-4 rounded-lg">
          Other person has disconnected.
        </div>
      )}
    </div>
  );
};

export default VideoChat;
