export interface IPaymentInteractor {
  createPaymentIntent(amount: number): Promise<string>;
  retrievePaymentIntent(paymentIntent: string,id:string): Promise<any>;
}
