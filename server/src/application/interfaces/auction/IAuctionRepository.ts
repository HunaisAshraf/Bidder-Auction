import { Auction } from "../../../entities/auction";

export interface IAuctionRepository {
  add(auction: Auction): Promise<Auction>;
  find(): Promise<Auction[]>;
  findByAuctionerId(id: string): Promise<Auction[]>;
  findOne(id: string): Promise<Auction>;
  edit(id: string, value: Auction): Promise<Auction>;
}
