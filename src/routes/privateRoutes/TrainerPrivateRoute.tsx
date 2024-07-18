import { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { openLoginModal } from "../../slices/modalSlices/loginModal";
import {Outlet,useNavigate} from 'react-router-dom';

const UserPrivateRoute=() => {
    const {trainerInfo} = useSelector((state:RootState)=>state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if(!trainerInfo){
            navigate("/");
            dispatch(openLoginModal());
        }
    }, [dispatch,navigate,trainerInfo]);

    return trainerInfo ?<Outlet/> : null;
}

export default UserPrivateRoute;