import {Routes,Route} from 'react-router-dom';
import Home from '../pages/trainer/Home';
import JoinFitcall from '../pages/trainer/JoinFitcall';
import TrainerLogin from '../pages/trainer/TrainerLogin';
// import TrainerPrivateRoute from '../components/trainers/TrainerPrivateRoute';
import Profile from '../pages/trainer/Profile';
import Clients from '../pages/trainer/Clients';
import ClientDetails from '../pages/trainer/ClientDetails';


function TrainerRoutes() {
  return (
    <Routes>
      <Route path= "/*" element= {<Home/>}/>
      <Route path="/login" element={<TrainerLogin/>}/>
      <Route path="signup" element={<JoinFitcall/>} />
      <Route path= "/profile" element={<Profile/>}/>
      <Route path="/clients" element={<Clients/>}/>
      <Route path="/clients/clientsDetails" element={<ClientDetails/>}/>
    </Routes>     
  )
}

export default TrainerRoutes;