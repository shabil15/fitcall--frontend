import {Routes,Route} from 'react-router-dom';
import AdminLogin from '../components/admin/adminLogin';


function AdminRoutes() {
  return (
    <Routes>
      <Route path="/adminLogin" element={<AdminLogin/>}/>
    </Routes>
  )
}

export default AdminRoutes;