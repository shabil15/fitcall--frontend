import {Routes,Route} from 'react-router-dom';
import Home from '../pages/user/Home';
import Trainers from '../pages/user/Trainers';
import TrainerProfile from '../pages/user/TrainerProfile';
import AboutUs from '../pages/user/AboutUs';
import ContactUs from '../pages/user/ContactUs';
import Profile from '../pages/user/Profile';

function UserRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/trainers" element={<Trainers/>}/>
      <Route path="/trainerDetails" element={<TrainerProfile/>}/>
      <Route path='/aboutus' element={<AboutUs/>}/>
      <Route path='/contactus' element={<ContactUs/>}/>
      <Route path='/profile' element={<Profile/>}/>
    </Routes>     
  )
}

export default UserRoutes;