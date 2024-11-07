import axios from 'axios';
import { ApplicationConstants } from '@/constants/ApplicationConstants';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
};
