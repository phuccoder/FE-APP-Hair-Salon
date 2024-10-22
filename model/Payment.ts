export type Payment = {
    id: string;
    amount: number;
    date: Date;
    method: 'cash' | 'credit_card' | 'debit_card' | 'online';
    status: 'pending' | 'completed' | 'failed';
    customerId: string;
};