import { IAuctionRepository } from "../../application/interfaces/auction/IAuctionRepository";
import { Auction } from "../../entities/auction";
import { Bid } from "../../entities/bid";
import { AuctionModel } from "../../infrastructure/db/models/auctionModel";
import { BidModel } from "../../infrastructure/db/models/bidModel";

export class AuctionRepositry implements IAuctionRepository {
  async add(auction: Auction): Promise<Auction> {
    try {
      const data = new AuctionModel(auction);
      await data.save();
      return data;
    } catch (error: any) {
      console.log("error in adding auction to database", error);
      throw new Error(error.message);
    }
  }
  async find(): Promise<Auction[]> {
    try {
      const auctions = await AuctionModel.find({ isListed: true });

      if (!auctions) {
        throw new Error("no auction found");
      }

      return auctions;
    } catch (error: any) {
      console.log("error in getting all auction", error);
      throw new Error(error.message);
    }
  }

  async findByAuctionerId(id: string): Promise<Auction[]> {
    try {
      const auctions = await AuctionModel.find({ auctioner: id });

      if (!auctions) {
        throw new Error("no auction found");
      }

      return auctions;
    } catch (error: any) {
      console.log("error in getting all auction", error);
      throw new Error(error.message);
    }
  }

  async findOne(id: string): Promise<Auction> {
    try {
      const auction = await AuctionModel.findById(id);

      if (!auction) {
        throw new Error("auction not found");
      }

      return auction;
    } catch (error: any) {
      console.log("error in getting auction", error);
      throw new Error(error.message);
    }
  }
  async edit(id: string, value: Auction): Promise<Auction> {
    try {
      console.log(id, value);

      const auction = await AuctionModel.findByIdAndUpdate(id, value, {
        new: true,
      });
      console.log(auction);

      if (!auction) {
        throw new Error("error in editing auction");
      }

      return auction;
    } catch (error: any) {
      console.log("error in editing auction", error);
      throw new Error(error.message);
    }
  }

  async addBid(bid: Bid): Promise<Bid> {
    try {
      const newBid = new BidModel(bid);
      await newBid.save();
      if (!newBid) {
        throw new Error("Error in adding bid");
      }
      return newBid;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
