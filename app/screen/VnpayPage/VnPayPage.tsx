import useToast from '@/hooks/useToast';
import { paymentApi, PaymentIntent } from '@/service/paymentServices';
import { RootStackParamList } from '@/utils/navigation';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useMutation } from '@tanstack/react-query';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';
interface VNpayProps {
  route?: any;
  navigation: any;
}

const VnPayPage = ({ navigation, route }: VNpayProps) => {
  const toast = useToast();
  const { data } = route.params;

  const checkPayment = useMutation({
    mutationFn: (data: PaymentIntent) => {
      return paymentApi.paymentReturn(data);
    },
    onSuccess: async (data) => {
      console.log('Payment success:', data.data);
      toast.success('Payment success');
      Alert.alert('Payment success');
      navigation.navigate('(tabs)');
    },
    onError: (error) => {
      console.error('Payment error:', error);
    },
  });

  const handleMessage = (data: any) => {
    // if (event.nativeEvent.data === 'continueShopping') {
    //   navigation.navigate('Home');
    // }
    console.log('event.nativeEvent.data:', data);

    const urlParams = new URLSearchParams(data);
    const vnp_ResponseCode = urlParams.get('vnp_ResponseCode');
    const vnp_TransactionNo = urlParams.get('vnp_TransactionNo');
    const vnp_BankCode = urlParams.get('vnp_BankCode');
    const vnp_OrderInfo = urlParams.get('vnp_OrderInfo');
    if (
      !vnp_ResponseCode ||
      !vnp_TransactionNo ||
      !vnp_BankCode ||
      !vnp_OrderInfo
    ) {
      console.error('Payment data is invalid');
      return;
    }
    const ordInf = vnp_OrderInfo.split(':')[1];
    const paymentData: PaymentIntent = {
      vnp_ResponseCode,
      vnp_TransactionNo,
      vnp_BankCode,
      vnp_OrderInfo: ordInf,
    };
    console.log('Payment data:', paymentData);
    checkPayment.mutate(paymentData);
  };

  return (
    <WebView
      source={{ uri: data }}
      originWhitelist={['*']}
      style={{ flex: 1 }}
      onError={(er) => handleMessage(er.nativeEvent.url)}
    />
  );
};

export default VnPayPage;
