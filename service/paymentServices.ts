import axios from 'axios';
import { ApplicationConstants } from '@/constants/ApplicationConstants';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type PaymentIntent = {
  vnp_BankCode: string;
  vnp_OrderInfo: string;
  vnp_ResponseCode: string;
  vnp_TransactionNo: string;
};

const getToken = async () => {
  const token = await AsyncStorage.getItem(ApplicationConstants.ACCESS_TOKEN);
  return token;
};

export const api = axios.create({
  baseURL: ApplicationConstants.BASE_URL_WITHOUT_VERSION,
});

export const paymentApi = {
  async createPaymentIntent(appointmentID: string) {
    const token = await getToken();
    return await api.get(
      `/customer/payments/create-payment?appointmentID=${appointmentID}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  },
  async paymentReturn(data: PaymentIntent) {
    const token = await getToken();
    return await api.get(
      `/customer/payments/vnpay-return?vnp_BankCode=${data.vnp_BankCode}&vnp_OrderInfo=${data.vnp_OrderInfo}&vnp_ResponseCode=${data.vnp_ResponseCode}&vnp_TransactionNo=${data.vnp_TransactionNo}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  },
};
