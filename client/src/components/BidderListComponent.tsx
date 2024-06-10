"use client";

import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import AddAuctionModal from "./AddAuctionModal";
import { useSocket } from "@/utils/hooks/useSocket";

export default function BidderListComponent() {
  const [bid, setBid] = useState([]);

  const { socket } = useSocket();

  useEffect(() => {
    socket?.on("newBid", (bid) => {
      console.log(bid);
    });
  }, [socket]);

  return (
    <div>
        bidsss
      {/* <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Auction Name</TableCell>
              <TableCell>Image</TableCell>
              <TableCell align="right">Base Price</TableCell>
              <TableCell align="right">Start Date</TableCell>
              <TableCell align="right">End Date</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {auctions?.map((auction) => (
              <TableRow
                key={auction._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="auction">
                  {auction?.itemName}
                </TableCell>
                <TableCell align="right">
                  <img
                    className="h-24 w-24"
                    src={auction?.images[0]}
                    alt={auction?.itemName}
                  />
                </TableCell>
                <TableCell align="right">{auction?.basePrice}</TableCell>
                <TableCell align="right">
                  {moment(auction?.startDate).format("lll")}
                </TableCell>
                <TableCell align="right">
                  {moment(auction?.endDate).format("lll")}
                </TableCell>
                <TableCell align="right">
                  <button onClick={() => handleChangeStatus(auction._id)}>
                    {auction?.isListed ? (
                      <span className="bg-green-500 text-white font-semibold py-2 px-3 rounded">
                        listed
                      </span>
                    ) : (
                      <span className="bg-red-500 text-white font-semibold py-2 px-3 rounded">
                        Unlisted
                      </span>
                    )}
                  </button>
                </TableCell>
                <TableCell align="right">
                  <EditAuctionModal id={auction._id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer> */}
    </div>
  );
}
