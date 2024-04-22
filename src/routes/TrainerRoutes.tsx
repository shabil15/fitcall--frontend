import {Routes,Route} from 'react-router-dom';
import Home from '../pages/trainer/Home';

function TrainerRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
    </Routes>     
  )
}

export default TrainerRoutes;