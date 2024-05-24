import { ObjectId } from "mongoose";

export class User {
  constructor(
    public id: ObjectId | string,
    public name: string,
    public email: string,
    public phone: number,
    public password: string,
    public role: string,
    public isActive: boolean,
    public profilePicture: string,
  ) {}
}
