import { Auction } from "../../../entities/auction";
import { Bid } from "../../../entities/bid";

export interface IAuctionInteractor {
  getAuction(id: string): Promise<Auction[]>;
  getAllAuctions(): Promise<Auction[]>;
  getSingleAuctoin(id: string): Promise<Auction | null>;
  addAuction(id: string, auction: Auction): Promise<Auction>;
  editAuction(id: string, value: Auction): Promise<Auction>;
  changeAuctionStatus(id: string, status: string): Promise<Auction>;
  placeBid(bidAmount: number, auctionId: string, userId: string): Promise<Bid>;
}
