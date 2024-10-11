// @types/global.d.ts

import 'react-native';
import 'react-native-elements';

declare module 'react-native' {
  // Declare className for commonly used components
  interface TextProps {
    className?: string;
  }
  interface ViewProps {
    className?: string;
  }
  interface ScrollViewProps {
    className?: string;
  }
  interface TouchableOpacityProps {
    className?: string;
  }
  interface ImageProps {
    className?: string;
  }
  interface ButtonProps {
    className?: string;
  }
  // Add any other components you want to support with className
}

declare module 'react-native-elements' {
  // Declare className for React Native Elements components
  import { ButtonProps as RNEButtonProps, TextProps as RNETextProps } from 'react-native-elements';

  interface ButtonProps extends RNEButtonProps {
    className?: string;
  }

  interface TextProps extends RNETextProps {
    className?: string;
  }
  // Add other components from React Native Elements as needed
}
