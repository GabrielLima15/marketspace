import { BottomTabNavigationProp, createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { createNativeStackNavigator } from "@react-navigation/native-stack";



type AppRoutes = {
  homeStack: StackRoutes;
  history: undefined;
  profile: undefined;
  exercise: undefined;
}

type StackRoutes = {
  home: undefined;
  exercise: { exerciseId: string };
}

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>
export type HomeNavigatorRoutesProps = BottomTabNavigationProp<StackRoutes>

const Tab = createBottomTabNavigator<AppRoutes>();
const Stack = createNativeStackNavigator<StackRoutes>();

// function HomeStack() {
//   return (
//     <Stack.Navigator screenOptions={{ headerShown: false }}>

//     </Stack.Navigator>
//   )
// }

export function AuthRoutes() {

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
      }}
    >

    </Tab.Navigator>
  )
}