import {Routes,Route} from 'react-router-dom';
import AdminLogin from '../components/admin/adminLogin';
import AdminPrivateRoute from "./privateRoutes/AdminPrivateRoute";
import Navbar from "../pages/admin/Navbar";

function AdminRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<AdminLogin/>}/>
      <Route path='*' element={<AdminPrivateRoute/>}>
        <Route path='*' element={<Navbar/>}/>
      </Route>
    </Routes>
  )
}

export default AdminRoutes;