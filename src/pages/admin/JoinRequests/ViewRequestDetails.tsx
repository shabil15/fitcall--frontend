import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Dialog,
  Typography,
} from "@mui/material";
import { ITrainer } from "../../../@types/schema";
import { useReviewRequestsMutation } from "../../../slices/adminApiSlices";
import { MyError } from "../../../validation/validationTypes";
import { toast } from "react-toastify";
import Spinner from "../../../components/common/Spinner";

interface ViewRequestDetailsProps {
  open: boolean;
  onClose: () => void;
  trainer: ITrainer;
}

const ViewRequestDetails: React.FC<ViewRequestDetailsProps> = ({
  open,
  onClose,
  trainer,
}) => {
  const [reviewRequests] = useReviewRequestsMutation();
  const [isSubmit, setSubmit] = useState(false);

  const handleReviewRequest = async (status: string) => {
    try {
      setSubmit(true);
      const id = trainer._id;
      const res = await reviewRequests({ id, status }).unwrap();
      onClose()
      setSubmit(false)
      toast.success(res.message);
    } catch (err) {
      toast.error((err as MyError)?.data?.message || (err as MyError)?.error);
    }
  };
  return (
    <Dialog open={open} onClose={onClose}>
      <Box sx={{ maxHeight: '80vh', overflowY: 'auto', scrollbarWidth: 'none', '-ms-overflow-style': 'none' }}>
      <Card>
        <CardContent
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box >
            <Typography variant="h5" gutterBottom>
              {trainer.name}
            </Typography>
            <Typography variant="body1" color="textSecondary" gutterBottom>
              Email: {trainer.email}
            </Typography>
            <Typography variant="body1" color="textSecondary" gutterBottom>
              Mobile: {trainer.mobile}
            </Typography>
            {/* <Typography variant="body1" color="textSecondary" gutterBottom>
              {trainer.description}
            </Typography> */}
            <Typography variant="body1" color="textSecondary" gutterBottom>
              Language: {trainer.language}
            </Typography>
            <Typography variant="body1" color="textSecondary" gutterBottom>
              Specialisation: {trainer.specialisation}
            </Typography>
            <Typography variant="h6" gutterBottom>
              Certificate
            </Typography>
          </Box>
          <Avatar sx={{ width: 150, height: 150 }} src={trainer.profile_img} />
        </CardContent>
        <CardContent>
          <img
            src={trainer.certificate}
            alt="Certificate"
            style={{ width: "100%", maxWidth: "500px" }}
          />
        </CardContent>
        <CardActions
          sx={{
            display: "flex",
            alignItems: "end",
            justifyContent: "flex-end",
            padding: 2,
          }}
        >
          <div>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleReviewRequest("accepted")}
              disabled={isSubmit}
            >
              {isSubmit ? <Spinner /> : "Accept"}
            </Button>
          </div>
          <div>
            <Button
              variant="contained"
              color="error"
              onClick={() => handleReviewRequest("rejected")}
              disabled={isSubmit}
              sx={{ marginLeft: 1 }}
            >
              {isSubmit ? <Spinner /> : "Reject"}
            </Button>
          </div>
        </CardActions>
      </Card>
      </Box>
    </Dialog>
  );
};

export default ViewRequestDetails;
