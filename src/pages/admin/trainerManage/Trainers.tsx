import React, { useEffect, useMemo, useState } from "react";
import { Avatar, Box, Typography } from "@mui/material";
import {
  DataGrid,
  GridCellParams,
  gridClasses,
  GridColDef,
} from "@mui/x-data-grid";
import moment from "moment";
import { grey } from "@mui/material/colors";
import { Selected } from "../../../@types/Props";
import { useGetJoinRequestsMutation } from "../../../slices/adminApiSlices";
import { ITrainer } from "../../../@types/schema";
import TrainerActions from "./TrainerActions";
import {toast} from 'react-toastify';
import { MyError } from "../../../validation/validationTypes";

const Trainers: React.FC<Selected> = ({ setSelectedLink, link }) => {
  const [rowId, setRowId] = useState<string | null>(null);
  const [trainers, setTrainers] = useState<ITrainer[]>([]);
  const [getJoinRequests] = useGetJoinRequestsMutation();

  useEffect(() => {
    setSelectedLink(link);

    async function fetchTrainers() {
      try {
        const res = await getJoinRequests("").unwrap();
        const pendingTrainers = res.data.filter(
          (trainer: Record<string, any>) => trainer.status === "accepted"
        );
        setTrainers(pendingTrainers);
      } catch (err) {
        console.error("Error fetching trainers:", err);
        toast.error((err as MyError)?.data?.message || (err as MyError)?.error);
      }
    }

    fetchTrainers();
  }, [link]);

  const columns: GridColDef[] = useMemo(
    () => [
      {
        field: "profile_img",
        headerName: "Profile",
        width: 130,
        renderCell: (params: GridCellParams) => (
          <Avatar src={params.row.profile_img} />
        ),
        sortable: false,
        filterable: false,
      },
      { field: "name", headerName: "Name", width: 130 },
      { field: "email", headerName: "Email", width: 170 },
      // { field: "mobile", headerName: "Mobile ", width: 120 },
      { field: "language", headerName: "Language", width: 150 },
      { field: "specialisation", headerName: "Specialisation", width: 150 },

      {
        field: "createdAt",
        headerName: "Joined On",
        width: 120,
        renderCell: (params: GridCellParams) =>
          moment(params.row.createdAt).format(" DD-MM-YYYY"),
      },
      {
        field: "isBlocked",
        headerName: "Blocked",
        width: 120,
        type: "boolean",
        editable: true,
      },
      {
        field: "actions",
        headerName: "Actions",
        type: "actions",
        renderCell: (params: GridCellParams) => (
          <TrainerActions {...{ params, rowId, setRowId }} />
        ),
      },
    ],
    [rowId]
  );

  return (
    <Box sx={{ height: 400, width: "95%" }}>
      <Typography
        variant="h4"
        component="h4"
        sx={{ textAlign: "center", mt: 2, mb: 3 }}
      >
        Manage Trainers
      </Typography>
      <DataGrid
        columns={columns}
        rows={trainers}
        getRowId={(row: any) => row._id}
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
        onCellEditStop={(params) => setRowId(params.id.toString())}
        onCellEditStart={(params) => setRowId(params.id.toString())}
      />
    </Box>
  );
};

export default Trainers;
