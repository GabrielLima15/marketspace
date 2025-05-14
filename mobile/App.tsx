import { StatusBar, View } from 'react-native';
import { useFonts, Karla_400Regular, Karla_700Bold } from '@expo-google-fonts/karla';
import './global.css';
import AppRoutes from '@routes/app.routes';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';
import AppContext from '@contexts/AppContext';


export default function App() {

  const [fontsLoaded] = useFonts({ Karla_400Regular, Karla_700Bold })

  return (
    <GestureHandlerRootView className='flex-1'>
      <AppContext>
        <StatusBar barStyle={'dark-content'} backgroundColor="transparent" translucent />
        {fontsLoaded ? <AppRoutes /> : <View />}
      </AppContext>
    </GestureHandlerRootView>
  );
}
