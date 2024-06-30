import { IAuctionRepository } from "../../application/interfaces/auction/IAuctionRepository";
import { User } from "../../entities/User";
import { Auction } from "../../entities/auction";
import { AuctionWinner } from "../../entities/auctionWinner";
import { Bid } from "../../entities/bid";
import { AuctionModel } from "../../infrastructure/db/models/auctionModel";
import { AuctionWinnerModel } from "../../infrastructure/db/models/auctionWinner";
import { BidModel } from "../../infrastructure/db/models/bidModel";
import { ErrorResponse } from "../../utils/errors";

export class AuctionRepositry implements IAuctionRepository {
  async add(auction: Auction): Promise<Auction> {
    try {
      const data = new AuctionModel(auction);
      await data.save();
      return data;
    } catch (error: any) {
      console.log("error in adding auction to database", error);
      throw new ErrorResponse(error.message, error.status);
    }
  }
  async find(): Promise<Auction[]> {
    try {
      const auctions = await AuctionModel.find({
        isListed: true,

        endDate: { $gte: new Date() },
      });

      if (!auctions) {
        throw new ErrorResponse("no auction found", 404);
      }

      return auctions;
    } catch (error: any) {
      console.log("error in getting all auction", error);
      throw new ErrorResponse(error.message, error.status);
    }
  }

  async findByAuctionerId(id: string): Promise<Auction[]> {
    try {
      const auctions = await AuctionModel.find({ auctioner: id });

      if (!auctions) {
        throw new ErrorResponse("no auction found", 404);
      }

      return auctions;
    } catch (error: any) {
      console.log("error in getting all auction", error);
      throw new ErrorResponse(error.message, error.status);
    }
  }

  async findOne(id: string): Promise<Auction> {
    try {
      const auction = await AuctionModel.findById(id);

      if (!auction) {
        throw new ErrorResponse("auction not found", 404);
      }

      return auction;
    } catch (error: any) {
      console.log("error in getting auction", error);
      throw new ErrorResponse(error.message, error.status);
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
        throw new ErrorResponse("error in editing auction", 500);
      }

      return auction;
    } catch (error: any) {
      console.log("error in editing auction", error);
      throw new ErrorResponse(error.message, error.status);
    }
  }

  async addBid(bid: Bid): Promise<Bid> {
    try {
      // const newBid = new BidModel(bid);
      // await newBid.save();
      console.log(bid);

      const newBid = await BidModel.findOneAndUpdate(
        { auctionId: bid.auctionId, userId: bid.userId },
        bid,
        { new: true, upsert: true }
      );

      console.log(newBid);

      if (!newBid) {
        throw new ErrorResponse("Error in adding bid", 500);
      }
      return newBid;
    } catch (error: any) {
      console.log(error);
      throw new ErrorResponse(error.message, error.status);
    }
  }

  async getBid(id: string): Promise<any[]> {
    try {
      const bids = await BidModel.find({ auctionId: id })
        .populate("userId")
        .sort({ bidAmount: -1 });
      return bids;
    } catch (error: any) {
      throw new ErrorResponse(error.message, error.status);
    }
  }

  async getCompletedAuction(): Promise<Auction[]> {
    try {
      console.log("getting completed auctionn from database");

      const completedAuction = await AuctionModel.find({
        completed: false,
        endDate: { $lte: new Date() },
      });
      console.log(completedAuction);

      return completedAuction;
    } catch (error: any) {
      throw new ErrorResponse(error.message, error.status);
    }
  }

  async addWinner(data: AuctionWinner): Promise<AuctionWinner> {
    try {
      const winner = new AuctionWinnerModel(data);

      await winner.save();
      return winner;
    } catch (error: any) {
      throw new ErrorResponse(error.message, error.status);
    }
  }

  async getUserBid(id: string): Promise<Bid[]> {
    try {
      const bids = await BidModel.find({ userId: id }).populate("auctionId");
      return bids;
    } catch (error: any) {
      throw new ErrorResponse(error.message, error.status);
    }
  }

  async getAuctionWon(id: string): Promise<AuctionWinner[]> {
    try {
      const auctions = await AuctionWinnerModel.find({ user: id }).populate(
        "auctionItem"
      );
      return auctions;
    } catch (error: any) {
      throw new ErrorResponse(error.message, error.status);
    }
  }
}
