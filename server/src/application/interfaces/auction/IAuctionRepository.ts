import { Auction } from "../../../entities/auction";
import { Bid } from "../../../entities/bid";

export interface IAuctionRepository {
  add(auction: Auction): Promise<Auction>;
  find(): Promise<Auction[]>;
  findByAuctionerId(id: string): Promise<Auction[]>;
  findOne(id: string): Promise<Auction>;
  edit(id: string, value: Auction): Promise<Auction>;
  addBid(bid: Bid): Promise<Bid>;
}
