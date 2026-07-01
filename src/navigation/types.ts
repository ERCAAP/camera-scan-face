import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Home: undefined;
  Camera: undefined;
  Results: { faceData: string };
};

export type NavigationProp = NativeStackNavigationProp<RootStackParamList>; 