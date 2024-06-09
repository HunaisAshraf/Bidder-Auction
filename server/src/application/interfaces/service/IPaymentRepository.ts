export interface IPaymentRepository {
  add(id: string, amount: number, message: any): Promise<any>;
  get(id: string): Promise<any>;
}
