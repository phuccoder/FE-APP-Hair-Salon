import { useState, useEffect } from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as Linking from 'expo-linking';
import { useMutation } from '@tanstack/react-query';
import { paymentApi } from '@/service/paymentServices';

const usePayment = (navigation: any) => {
  const [isPending, setIsPending] = useState(false);
  const [paymentData, setPaymentData] = useState(null);

  const paymentMutation = useMutation({
    mutationFn: (appointmentID: string) => {
      return paymentApi.createPaymentIntent(appointmentID);
    },
    onSuccess: async (data) => {
      setPaymentData(data.data.url);
      if (data.data.url) {
        // Example of navigation action
        navigation.navigate('VnPayPage', {
          data: data.data.url,
        });
      }
    },
    onError: (error) => {
      console.error('Payment error:', error);
    },
  });

  useEffect(() => {
    setIsPending(paymentMutation.isPending);
  }, [paymentMutation.isPending]);

  return { paymentMutation, isPending, paymentData };
};

export default usePayment;
