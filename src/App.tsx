import "./App.css";
// import {Outlet} from 'react-router-dom';
import { BrowserRouter,Route,Routes } from "react-router-dom";
import AdminRoutes from "./routes/adminRoutes";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  

  return (
    
      <BrowserRouter>
        <div>
          <ToastContainer autoClose={3000} />
            <Routes>
              <Route path="/admin/*" element={<AdminRoutes/>}/>
            </Routes>
        </div>
      </BrowserRouter>
   
  );
}

export default App;
