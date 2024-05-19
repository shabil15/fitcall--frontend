import {Routes,Route} from 'react-router-dom';
import Home from '../pages/trainer/Home';
import JoinFitcall from '../pages/trainer/JoinFitcall';
import TrainerLogin from '../pages/trainer/TrainerLogin';
// import TrainerPrivateRoute from '../components/trainers/TrainerPrivateRoute';
import Profile from '../pages/trainer/Profile';


function TrainerRoutes() {
  return (
    <Routes>
      <Route path= "/*" element= {<Home/>}/>
      <Route path="/login" element={<TrainerLogin/>}/>
      <Route path="signup" element={<JoinFitcall/>} />
      <Route path= "/profile" element={<Profile/>}/>
    </Routes>     
  )
}

export default TrainerRoutes;