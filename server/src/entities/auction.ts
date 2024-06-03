import { ObjectId } from "mongoose";

export class Auction {
  constructor(
    public _id: ObjectId | string,
    public itemName: string,
    public basePrice: number,
    public description: string,
    public startTime: Date,
    public endTime: Date,
    public auctioner: ObjectId | string,
    public isListed: boolean
  ) {}
}
