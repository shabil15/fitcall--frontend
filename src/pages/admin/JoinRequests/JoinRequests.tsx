import React, { useEffect, useMemo, useState } from "react";
import { Avatar, Box, Button, Typography } from "@mui/material";
import { DataGrid, GridCellParams, gridClasses, GridColDef } from "@mui/x-data-grid";
import moment from "moment";
import { grey } from "@mui/material/colors";
import { Selected } from "../../../@types/Props";
import { useGetJoinRequestsMutation } from "../../../slices/adminApiSlices";
import { ITrainer } from "../../../@types/schema"; 
import ViewRequestDetails from "./ViewRequestDetails";


const JoinRequests: React.FC<Selected> = ({ setSelectedLink, link }) => {
 const [trainers, setTrainers] = useState<ITrainer[]>([]); 
 const [getJoinRequests] = useGetJoinRequestsMutation();
 const [selectedTrainer, setSelectedTrainer] = useState<ITrainer | null>(null); 

 useEffect(() => {
    setSelectedLink(link);
    async function fetchTrainers() { 
      try {
        const res = await getJoinRequests("").unwrap();
        const pendingTrainers = res.data.filter((trainer:Record<string,any>)=> trainer.status === "pending"); 
        setTrainers(pendingTrainers);
      } catch (error) {
        console.error("Error fetching trainers:", error); 
      }
    }

    fetchTrainers();
 }, [link,selectedTrainer]); 

 const handleViewDetails = (trainer: ITrainer) => { 
    setSelectedTrainer(trainer); 
 };

 const handleCloseModal = () => {
    setSelectedTrainer(null); 
 };

 const columns: GridColDef[] = useMemo(
    () => [
      {
        field: "profile_img",
        headerName: "Profile",
        width: 100,
        renderCell: (params: GridCellParams) => <Avatar src={params.row.profile_img} />,
        sortable: false,
        filterable: false,
      },
      { field: "name", headerName: "Name", width: 130 },
      { field: "email", headerName: "Email", width: 170 },
      { field: "mobile", headerName: "Mobile", width: 170 },
      { field: "language", headerName: "Language", width: 150 },
      { field: "specialisation", headerName: "Specialisation ", width: 150 },
    
      {
        field: "createdAt",
        headerName: "Created At",
        width: 150,
        renderCell: (params: GridCellParams) =>
          moment(params.row.createdAt).format(" DD-MM-YYYY"),
      },
      {
        field: "actions",
        headerName: "View Details",
        width: 150,
        renderCell: (params: GridCellParams) => (
          <Button
            variant="contained"
            color="inherit"
            onClick={() => handleViewDetails(params.row as ITrainer)} 
          >
            View Details
          </Button>
        ),
      },
    ],
    []
 );

 return (
    <>
      <Box sx={{ height: 400, width: "95%" }}>
        <Typography variant="h4" component="h4" sx={{ textAlign: "center", mt: 2, mb: 3 }}>
          New Join Requests
        </Typography>
        <DataGrid
          columns={columns}
          rows={trainers} 
          getRowId={(row) => row._id}
          pageSizeOptions={[10, 25, 50, 75, 100]}
          getRowSpacing={(params) => ({
            top: params.isFirstVisible ? 0 : 5,
            bottom: params.isLastVisible ? 0 : 5,
          })}
          sx={{
            [`& .${gridClasses.row}`]: {
              bgcolor: (theme) =>
                theme.palette.mode === "light" ? grey[200] : grey[900],
            },
          }}
        />
      </Box>
      {selectedTrainer && ( 
        <ViewRequestDetails
          open={true}
          onClose={handleCloseModal}
          trainer={selectedTrainer} 
        />
      )}
    </>
 );
};

export default JoinRequests;
