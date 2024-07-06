"use client";

import React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Image from "next/image";
import { User } from "@/utils/types";

type Auctions = {
  _id: string;
  auctionItem: {
    itemName: string;
    basePrice: string;
    description: string;
    images: string[];
    endDate: Date;
  };
  user: User;
  bidAmount: number;
};

export default function AuctionCompletedTable({
  auctions,
}: {
  auctions: Auctions[];
}) {
  console.log(auctions);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Auction Name</TableCell>
            <TableCell>Image</TableCell>
            <TableCell align="right">Bidder</TableCell>
            <TableCell align="right">Base Price</TableCell>
            <TableCell align="right">Bid Price</TableCell>
            {/* <TableCell align="right">Invoice</TableCell> */}
            {/* <TableCell align="right">Bid Date</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {auctions &&
            auctions?.map((auction) => (
              <TableRow
                key={auction._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="auction">
                  {auction?.auctionItem?.itemName}
                </TableCell>
                <TableCell align="right">
                  <Image
                    width={96}
                    height={96}
                    src={auction.auctionItem?.images[0]}
                    alt={auction.auctionItem?.itemName}
                  />
                </TableCell>
                <TableCell align="right">{auction.user.name}</TableCell>
                <TableCell align="right">
                  {auction.auctionItem?.basePrice}
                </TableCell>
                <TableCell align="right">{auction.bidAmount}</TableCell>

                {/* <TableCell align="right">
                    {moment(auction?.).format("lll")}
                  </TableCell> */}
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
