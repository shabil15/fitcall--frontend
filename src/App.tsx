import "./App.css";
// import {Outlet} from 'react-router-dom';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserRoutes from "./routes/UserRoutes";
import TrainerRoutes from "./routes/TrainerRoutes";
import AdminRoutes from "./routes/adminRoutes";

function App() {
  return (
    <BrowserRouter>
      <div className="font-customFont">
        <ToastContainer autoClose={3000} />
        <Routes>
          <Route path="/*" element={<UserRoutes />} />
          <Route path="/trainer/*" element={<TrainerRoutes />} />
          <Route path="/admin/*" element={<AdminRoutes />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
