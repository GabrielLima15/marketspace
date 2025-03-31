import { StatusBar, View } from 'react-native';
import { useFonts, Karla_400Regular, Karla_700Bold } from '@expo-google-fonts/karla';
import './global.css';
import { AuthContextProvider } from '@contexts/AuthContext';
import AppRoutes from '@routes/app.routes';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';


export default function App() {

  const [fontsLoaded] = useFonts({ Karla_400Regular, Karla_700Bold })
  console.log("🚀 ~ App ~ fontsLoaded:", fontsLoaded)

  return (
    <GestureHandlerRootView className='flex-1'>
      <AuthContextProvider>
        <StatusBar barStyle={'dark-content'} backgroundColor="transparent" translucent />
        {fontsLoaded ? <AppRoutes /> : <View />}
      </AuthContextProvider>
    </GestureHandlerRootView>
  );
}
