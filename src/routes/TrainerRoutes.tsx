import {Routes,Route} from 'react-router-dom';
import Home from '../pages/trainer/Home';
import JoinFitcall from '../pages/trainer/JoinFitcall';
import TrainerLogin from '../pages/trainer/TrainerLogin';
// import TrainerPrivateRoute from '../components/trainers/TrainerPrivateRoute';


function TrainerRoutes() {
  return (
    <Routes>
      <Route path= "/*" element= {<Home/>}/>
      <Route path="/login" element={<TrainerLogin/>}/>
      <Route path="signup" element={<JoinFitcall/>} />
    </Routes>     
  )
}

export default TrainerRoutes;