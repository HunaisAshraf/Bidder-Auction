import { IAuctionRepository } from "../../application/interfaces/auction/IAuctionRepository";
import { Auction } from "../../entities/auction";
import { AuctionModel } from "../../infrastructure/db/models/auctionModel";

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
      const auctions = await AuctionModel.find();

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
      const auction = await AuctionModel.findOne({ _id: id });

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
      const a = await AuctionModel.findById(id);
      console.log(a);

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
}
