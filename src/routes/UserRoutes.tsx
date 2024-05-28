import {Routes,Route} from 'react-router-dom';
import Home from '../pages/user/Home';
import Trainers from '../pages/user/Trainers';
import TrainerProfile from '../pages/user/TrainerProfile';
import AboutUs from '../pages/user/AboutUs';
import ContactUs from '../pages/user/ContactUs';
import Profile from '../pages/user/Profile';
import Pricing from '../pages/user/Pricing';
import Myplan from '../pages/user/Myplan';
import UserPrivateRoute from './privateRoutes/UserPrivateRoute';
import SubscriptionHistory from '../pages/user/SubscriptionHistory';

function UserRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="trainers" element={<Trainers/>}/>
      <Route path="trainerDetails" element={<TrainerProfile/>}/>
      <Route path='aboutus' element={<AboutUs/>}/>
      <Route path='contactus' element={<ContactUs/>}/>
      <Route path='*' element={<UserPrivateRoute/>}>
          <Route path='pricing' element={<Pricing/>}/>
          <Route path='profile' element={<Profile/>}/>
          <Route path ='myplan' element={<Myplan/>}/>
          <Route path='subscriptionHistory' element={<SubscriptionHistory/>}/>
      </Route>

    </Routes>     
  )
}

export default UserRoutes;