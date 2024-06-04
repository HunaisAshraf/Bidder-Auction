import mongoose, { Schema, model } from "mongoose";
import { Auction } from "../../../entities/auction";

const auctionSchema = new Schema<Auction>({
  itemName: {
    type: String,
    required: true,
  },
  basePrice: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  auctioner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  startTime: {
    type: Date,
    // required: true,
  },
  endTime: {
    type: Date,
    // required: true,
  },
  isListed: {
    type: Boolean,
    default: true,
  },
  images: [],
});

export const AuctionModel = model<Auction>("Auction", auctionSchema);
