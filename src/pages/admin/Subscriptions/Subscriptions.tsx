import { useEffect, useMemo, useState } from "react";
import * as React from 'react';
import { Box, Button, Grid, Typography } from "@mui/material";
import {
  DataGrid,
  GridCellParams,
  gridClasses,
  GridColDef,
  GridSortModel,
  useGridApiRef,
} from "@mui/x-data-grid";
import moment from "moment";
import { grey } from "@mui/material/colors";
import * as XLSX from "xlsx";
import { useGetSubscriptionsMutation } from "../../../slices/adminApiSlices";
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const Subscriptions = () => {
  const [rowId, setRowId] = useState<string | null>(null);
  const [getSubscriptions] = useGetSubscriptionsMutation();
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const [sortModel, setSortModel] = useState<GridSortModel>([]);
  const apiRef = useGridApiRef();
  const [fromDate, setFromDate] = React.useState<Dayjs | null>(null);
  const [toDate, setToDate] = React.useState<Dayjs | null>(null);

  useEffect(() => {
    async function fetchSubscriptions() {
      try {
        const res = await getSubscriptions().unwrap();
        console.log('Fetched Subscriptions:', res); // Log the response to inspect structure
        const flattenedSubscriptions = res.map((sub: any) => ({
          _id: sub._id,
          name: sub.name,
          goal: sub.goal,
          plan: sub.subscriptions.plan,
          start: sub.subscriptions.start,
          end: sub.subscriptions.end,
          paymentId: sub.subscriptions.paymentId,
          amount: sub.subscriptions.amount,
        }));
        setSubscriptions(flattenedSubscriptions); // Ensure subscriptions is an array of flattened objects
      } catch (error) {
        console.error("Error fetching subscriptions:", error);
      }
    }
  
    fetchSubscriptions();
  }, [getSubscriptions]);
  

  const formatId = (id: string) => id.slice(-8).toUpperCase();

  const columns: GridColDef[] = useMemo(
    () => [
      
      { field: "name", headerName: "Username", width: 170 },
      { field: "paymentId", headerName: "Payment Id", width: 170 },
      { field: "plan", headerName: "Plan", width: 120 },
      {
        field: "start",
        headerName: "Start Date",
        width: 170,
        renderCell: (params: GridCellParams) => moment(params.value).format("DD-MM-YYYY"),
      },
      {
        field: "end",
        headerName: "End Date",
        width: 170,
        renderCell: (params: GridCellParams) => moment(params.value).format("DD-MM-YYYY"),
      },
      { field: "amount", headerName: "Amount", width: 120 },
      { field: "goal", headerName: "User Goal", width: 170 },
    ],
    [rowId]
  );

  const filteredSubscriptions = useMemo(() => {
    if (!subscriptions) return []; // Handle undefined or empty subscriptions

    return subscriptions.filter((subscription) => {
      const subscriptionDate = dayjs(subscription.start);
      const from = fromDate ? fromDate.startOf('day') : null;
      const to = toDate ? toDate.endOf('day') : null;

      if (from && subscriptionDate.isBefore(from)) return false;
      if (to && subscriptionDate.isAfter(to)) return false;

      return true;
    });
  }, [subscriptions, fromDate, toDate]);

  const handleDownload = () => {
    if (!apiRef.current) return;

    const allRows = apiRef.current.getSortedRows();
    const transformedRows = allRows.map((row) => ({
      Username: row.name,
      PaymentId: row.paymentId,
      Plan: row.plan,
      StartDate: moment(row.start).format("DD-MM-YYYY"),
      EndDate: moment(row.end).format("DD-MM-YYYY"),
      Amount: `₹${row.amount}`,
      UserGoal: row.goal,
    }));

    const ws = XLSX.utils.json_to_sheet(transformedRows);

    // Set column widths
    const columnWidths = [
      { wch: 25 },
      { wch: 40 },
      { wch: 25 },
      { wch: 15 },
      { wch: 12 },
      { wch: 12 },
      { wch: 15 },
      { wch: 25 },
    ];

    ws["!cols"] = columnWidths;

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "SubscriptionReport");
    XLSX.writeFile(wb, "SubscriptionReport.xlsx");
  };

  return (
    <Box sx={{ height: 600, width: "95%", margin: '0 auto' }}>
      <Typography
        variant="h4"
        component="h4"
        sx={{ textAlign: "center", mb: 3 }}
      >
        Subscription Report
      </Typography>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item>
            <DatePicker
              label="From Date"
              value={fromDate}
              onChange={(newValue) => setFromDate(newValue)}
            />
          </Grid>
          <Grid item>
            <DatePicker
              label="To Date"
              value={toDate}
              onChange={(newValue) => setToDate(newValue)}
            />
          </Grid>
        </Grid>
      </LocalizationProvider>
      <DataGrid
        columns={columns}
        rows={filteredSubscriptions}
        getRowId={(row: any) => row._id}
        sortModel={sortModel}
        onSortModelChange={(model) => setSortModel(model)}
        getRowSpacing={(params) => ({
          top: params.isFirstVisible ? 0 : 5,
          bottom: params.isLastVisible ? 0 : 5,
        })}
        apiRef={apiRef}
        sx={{
          [`& .${gridClasses.row}`]: {
            bgcolor: (theme) =>
              theme.palette.mode === "light" ? grey[200] : grey[900],
          },
        }}
        onCellEditStop={(params) => setRowId(params.id.toString())}
        onCellEditStart={(params) => setRowId(params.id.toString())}
      />
      <Grid container sx={{ alignItems: "center", mt: 2 }}>
        <Grid item xs={4}>
          {/* Add total amount calculation here if needed */}
        </Grid>
        <Grid item xs={4} sx={{ textAlign: "center" }}>
          <Button
            variant="contained"
            sx={{ bgcolor: "gray", color: "white" }}
            onClick={handleDownload}
          >
            Download
          </Button>
        </Grid>
        <Grid item xs={4} sx={{ textAlign: "right" }}>
          {/* Add any additional information here */}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Subscriptions;
