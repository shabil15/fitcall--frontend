import { Navigate,Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

const TrainerPrivateRoute = () => {
    const { trainerInfo } = useSelector((state:RootState) => state.auth);
  return trainerInfo ?<Outlet/> :  <Navigate to="/trainer/trainerLogin" replace />
}

export default TrainerPrivateRoute