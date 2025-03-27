import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Home from "@screens/Auth/Home";
import { House } from "phosphor-react-native";
import { Host } from "react-native-portalize";

export type AppRoutes = {
  home: undefined
}


const Tab = createBottomTabNavigator<AppRoutes>()

export function AuthRoutes() {

  return (
    <Host>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
        }}
      >
        <Tab.Screen
          name="home" component={Home} options={{
            tabBarIcon: ({ color, size }) => <House size={size} color={color}
            />
          }}
        />
      </Tab.Navigator>
    </Host>
  )
}