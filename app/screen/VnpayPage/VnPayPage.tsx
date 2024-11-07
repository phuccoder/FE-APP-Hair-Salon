import { RootStackParamList } from '@/utils/navigation';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';
interface VNpayProps {
  route?: any;
  navigation: any;
}

const VnPayPage = ({ route }: VNpayProps) => {
  const { url } = route.params;

  useNavigation<StackNavigationProp<RootStackParamList, 'VnPayPage'>>();
  const vnpay_return = route.params;

  const handleMessage = (event: any) => {
    // if (event.nativeEvent.data === 'continueShopping') {
    //   navigation.navigate('Home');
    // }
    console.log(event.nativeEvent.data);
  };

  console.log('data', url);

  return (
    // <WebView
    //   source={{uri:  }}
    //   originWhitelist={['*']}
    //   style={{flex: 1}}
    //   onMessage={handleMessage}
    // />
    <></>
  );
};

export default VnPayPage;
