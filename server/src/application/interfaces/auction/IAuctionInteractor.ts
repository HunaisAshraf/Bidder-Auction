import { Auction } from "../../../entities/auction";

export interface IAuctionInteractor {
  getAuction(): Promise<Auction[]>;
  getSingleAuctoin(id: string): Promise<Auction | null>;
  addAuction(id: string, auction: Auction): Promise<Auction>;
  editAuction(id: string, value: Auction): Promise<Auction>;
  changeAuctionStatus(id: string, status: string): Promise<Auction>;
}
