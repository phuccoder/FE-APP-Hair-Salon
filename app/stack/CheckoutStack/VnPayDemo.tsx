import { View, Text, NativeEventEmitter } from 'react-native';
import React from 'react';
import { Button } from 'react-native-elements';
import usePayment from '@/hooks/usePayment';
import { paymentApi } from '@/service/paymentServices';

export default function VnPayDemo({ navigation }: any) {
  const payment = usePayment(navigation);
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button
        onPress={() => payment.paymentMutation.mutate('5')}
        title={'TEST PAYMENT'}
      ></Button>
    </View>
  );
}
