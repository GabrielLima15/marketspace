import { Dimensions, PixelRatio, Platform, StatusBar } from "react-native";

export const currentHeight: number | undefined = Platform.OS === 'android' ? StatusBar.currentHeight : 0;


export const WindowScreen: { width: number; height: number; landscape: boolean } = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
  landscape: (Dimensions.get('window').width > Dimensions.get('window').height)
}

export const getFontSize = (size: number): number => {
  const fontScale: number = PixelRatio.getFontScale();
  return size / fontScale;
}