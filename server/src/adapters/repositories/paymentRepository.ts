import { IPaymentRepository } from "../../application/interfaces/service/IPaymentRepository";
import { WalletModel } from "../../infrastructure/db/models/walletModel";

export class PaymentRepository implements IPaymentRepository {
  async add(id: string, amount: number, details: any): Promise<any> {
    try {
      const walletData = await WalletModel.updateOne(
        { user: id },
        {
          $set: {
            balance: amount,
          },
          $push: {
            transcation: details,
          },
        },
        {
          upsert: true,
        }
      );

      console.log(walletData);

      if (!walletData) {
        throw new Error("error in adding payment");
      }
      return walletData;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async get(id: string): Promise<any> {
    try {
      const data = await WalletModel.findOne({ user: id });
      return data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
