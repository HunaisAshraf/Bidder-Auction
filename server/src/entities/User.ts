import { ObjectId } from "mongoose";

export class User {
  constructor(
    public _id: ObjectId | string,
    public name: string,
    public email: string,
    public phone: number,
    public password: string,
    public role: string,
    public isActive: boolean,
    public profilePicture: string,
    public verifyToken: string,
    public verifyTokenExpiry: Date,
    public forgotPasswordToken: string,
    public forgotPasswordTokenExpiry: Date
  ) {}
}
