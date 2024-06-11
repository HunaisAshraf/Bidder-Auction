"use client";

import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useSocket } from "@/utils/hooks/useSocket";
import moment from "moment";
import { axiosInstance } from "@/utils/constants";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

type BidType = {
  _id: string;
  bidAmount: number;
  bidTime: Date;
  userId: any;
};

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 300 },
  { field: "userId", headerName: "User", width: 200 },
  { field: "bidAmount", headerName: "Bid Amount", width: 200 },
  { field: "bidTime", headerName: "Bid Time", width: 200 },
];

let rows: BidType[] = [];

export default function BidderListComponent({
  auctionId,
}: {
  auctionId: string;
}) {
  const [bids, setBids] = useState<BidType[]>([]);

  const { socket } = useSocket();

  const getBids = async () => {
    try {
      const { data } = await axiosInstance.get(
        `/api/auction/get-bids/${auctionId}`
      );

      if (data.success) {
        setBids((prev) => [...data?.bids]);
        // console.log("rowssssssssss", bids);
        // rows.push(...bids);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const arr = [];

  for (let i = 0; i<bids.length; i++) {
    arr.push({
      id: bids.length - i,
      ...bids[i],
      userId:bids[i].userId.name,
      date: moment(bids[i].bidTime).format("lll"),
    });
  }

  rows = arr;

  useEffect(() => {
    getBids();
  }, []);

  useEffect(() => {
    socket?.on("newBid", (bid) => {
      console.log(bid);
      setBids((prev) => [bid, ...prev]);
    });
  }, [socket]);

  return (
    <div className="p-3">
      <h1 className="text-3xl my-4 font-semibold text-gray-500">Bidder List</h1>
      <div style={{ height: 350, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
        />
      </div>

      {/* <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Bidder</TableCell>
              <TableCell align="right">Bid Amount</TableCell>
              <TableCell align="right">Bid Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bids?.map((bid) => (
              <TableRow
                key={bid._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="auction">
                  {bid?.userId}
                </TableCell>

                <TableCell align="right">{bid?.bidAmount}</TableCell>
                <TableCell align="right">
                  {moment(bid?.bidTime).format("lll")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer> */}
    </div>
  );
}
