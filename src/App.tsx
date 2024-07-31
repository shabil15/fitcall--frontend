import "./App.css";
// import {Outlet} from 'react-router-dom';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserRoutes from "./routes/UserRoutes";
import TrainerRoutes from "./routes/TrainerRoutes";
import AdminRoutes from "./routes/adminRoutes";

import { createContext, useContext, useMemo } from "react";
import { io, Socket } from "socket.io-client";

const SocketContext = createContext<Socket | null>(null);

export const useSocket = (): Socket | null => useContext(SocketContext);

function App() {
  
  const socket = useMemo(() => {
    return io(import.meta.env.VITE_BASE_URL);
  }, []);
  return (
    <SocketContext.Provider value={socket}>
      <BrowserRouter>
      <div className="font-customFont" style={{ overflow: 'hidden' }}>
            <ToastContainer autoClose={3000} />
            <Routes>
              <Route path="/*" element={<UserRoutes />} />
              <Route path="/trainer/*" element={<TrainerRoutes />} />
              <Route path="/admin/*" element={<AdminRoutes />} />
            </Routes>
          </div>
      </BrowserRouter>
    </SocketContext.Provider>
  );
}

export default App;
