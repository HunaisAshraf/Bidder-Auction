import { ObjectId } from "mongoose";
import { Auction } from "../../../entities/auction";
import { IAuctionInteractor } from "../../interfaces/auction/IAuctionInteractor";
import { IAuctionRepository } from "../../interfaces/auction/IAuctionRepository";
import { IUserRepository } from "../../interfaces/user/IUserRepository";
import { Bid } from "../../../entities/bid";
import { io } from "../../..";

export class AuctionInteractor implements IAuctionInteractor {
  private repository: IAuctionRepository;
  private userRepository: IUserRepository;
  constructor(repository: IAuctionRepository, userRepository: IUserRepository) {
    this.repository = repository;
    this.userRepository = userRepository;
  }

  async getAuction(id: string): Promise<Auction[]> {
    try {
      const data = await this.repository.findByAuctionerId(id);
      return data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async getAllAuctions(): Promise<Auction[]> {
    try {
      const data = await this.repository.find();
      return data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async getSingleAuctoin(id: string): Promise<Auction | null> {
    try {
      const auction = await this.repository.findOne(id);
      return auction;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async addAuction(id: string, auction: Auction): Promise<Auction> {
    try {
      auction.auctioner = id;
      console.log(auction);

      const data = await this.repository.add(auction);

      return data;
    } catch (error: any) {
      console.log("error in add auction interactor", error);
      throw new Error(error.message);
    }
  }

  async editAuction(id: string, value: Auction): Promise<Auction> {
    try {
      const auction = await this.repository.edit(id, value);
      return auction;
    } catch (error: any) {
      console.log("error in editing auction", error);

      throw new Error(error.message);
    }
  }

  async changeAuctionStatus(id: string, status: string): Promise<Auction> {
    try {
      const auction = await this.repository.findOne(id);

      if (auction.isListed) {
        auction.isListed = false;
      } else {
        auction.isListed = true;
      }

      const updatetdAuction = await this.repository.edit(id, auction);

      return updatetdAuction;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async placeBid(
    bidAmount: number,
    auctionId: string,
    userId: string
  ): Promise<Bid> {
    try {
      const auction = await this.repository.findOne(auctionId);

      if (auction.startDate > new Date()) {
        throw new Error("Auction has not started yet");
      }

      if (auction.endDate < new Date()) {
        throw new Error("Auction has ended");
      }

      if (auction.currentBid >= bidAmount) {
        throw new Error("Bid amount must be greater than current bid");
      }

      const bid: Bid = {
        auctionId,
        userId,
        bidAmount,
        bidTime: new Date(),
        isCancelled: false,
      };

      const newBid = await this.repository.addBid(bid);

      auction.currentBid = bidAmount;
      const updatedAuction = await this.repository.edit(
        auction._id.toString(),
        auction
      );

      io.emit("updatedAuction", updatedAuction);
      io.emit("newBid", newBid);

      return newBid;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async getBids(id: string): Promise<Bid[]> {
    try {
      const bids = await this.repository.getBid(id);
      return bids;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
