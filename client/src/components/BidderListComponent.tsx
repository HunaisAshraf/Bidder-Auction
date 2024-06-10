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

type BidType = {
  _id: string;
  bidAmount: number;
  bidTime: Date;
  userId: string;
};

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
      }
    } catch (error) {
      console.log(error);
    }
  };

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
    <div>
      <TableContainer component={Paper}>
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
      </TableContainer>
    </div>
  );
}
