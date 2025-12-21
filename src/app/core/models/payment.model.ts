export interface CreatePaymentDto {
    amount: number;
    mode: string;
}

export enum PaymentMode {
    CASH = 'Cash',
    TRANSFER = 'Transfer',
    POS = 'POS'
}
