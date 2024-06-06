import { ObjectId } from "mongoose";
import { Auction } from "../../../entities/auction";
import { IAuctionInteractor } from "../../interfaces/auction/IAuctionInteractor";
import { IAuctionRepository } from "../../interfaces/auction/IAuctionRepository";
import { IUserRepository } from "../../interfaces/user/IUserRepository";

export class AuctionInteractor implements IAuctionInteractor {
  private repository: IAuctionRepository;
  private userRepository: IUserRepository;
  constructor(repository: IAuctionRepository, userRepository: IUserRepository) {
    this.repository = repository;
    this.userRepository = userRepository;
  }

  async getAuction(id:string): Promise<Auction[]> {
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
}
