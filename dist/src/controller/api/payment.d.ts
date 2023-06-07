declare const PaymentController: {
    payment: (req: any, res: any, next: any) => Promise<any>;
    checkPayment: (req: any, res: any, next: any) => Promise<void>;
};
export default PaymentController;
