
import { Box, CircularProgress, Fab } from "@mui/material";
import { Check, Save } from "@mui/icons-material";
import { green } from "@mui/material/colors";
// import { updateStatus } from '../../../actions/user'; // Import your updateStatus function
import { useState } from "react";
// import { useBlockWorkerMutation } from "../../../slices/api/adminApiSlices";
import { useBlockTrainerMutation } from "../../../slices/adminApiSlices";
// import { workerLogOut } from "../../../slices/authSlice";
import { MyError } from "../../../validation/validationTypes";
import { toast } from "react-toastify";
import { GridCellParams } from "@mui/x-data-grid";

const TrainerActions = ({
  params,
  rowId,
  setRowId,
}: {
  params: GridCellParams;
  rowId: string | null;
  setRowId: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [blockTrainer] = useBlockTrainerMutation();
  // const dispatch = useDispatch();


  const handleSubmit = async () => {
    setLoading(true);
  
    const { _id } = params.row;
    console.log(_id);
    
    // Call your updateStatus function here
    try {
      const response = await blockTrainer(_id).unwrap();
      // if (trainerInfo && trainerInfo._id === _id) {
      //   dispatch(workerLogOut());
      // }
      toast.success(response.message);
      setSuccess(true);
      setRowId(null);
      setTimeout(() => {
        setSuccess(false)
      }, 5000);
    } catch (err) {
      toast.error((err as MyError)?.data?.message || (err as MyError)?.error);
      // Handle error appropriately, e.g., show error message
    } finally {
      setLoading(false);
    //   setSuccess(false); // Reset success state here
    }
  };
  

  return (
    <Box
      sx={{
        m: 1,
        position: "relative",
      }}
    >
      {success ? (
        <Fab
          color="primary"
          sx={{
            width: 40,
            height: 40,
            bgcolor: green[500],
            "&:hover": { bgcolor: green[700] },
          }}
        >
          <Check />
        </Fab>
      ) : (
        <Fab
          color="primary"
          sx={{
            width: 40,
            height: 40,
          }}
          disabled={params.id !== rowId || loading}
          onClick={handleSubmit}
        >
          <Save />
        </Fab>
      )}
      {loading && (
        <CircularProgress
          size={52}
          sx={{
            color: green[500],
            position: "absolute",
            top: -6,
            left: -6,
            zIndex: 1,
          }}
        />
      )}
    </Box>
  );
};

export default TrainerActions;
