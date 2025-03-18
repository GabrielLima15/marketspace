import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack";
import Login from "@screens/NoAuth/Login";
import Register from "@screens/NoAuth/Register";


type NoAuthRoutes = {
  login: undefined;
  register: undefined;
}

export type NoAuthNavigatorRoutesProps = NativeStackNavigationProp<NoAuthRoutes>

const { Navigator, Screen } = createNativeStackNavigator();
export function NoAuthRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="login" component={Login} />
      <Screen name="register" component={Register} />
    </Navigator>
  )
}