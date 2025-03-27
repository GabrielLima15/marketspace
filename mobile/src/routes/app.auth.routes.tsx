// auth.routes.tsx

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { House } from "phosphor-react-native";
import { Host } from "react-native-portalize";

import Home from "@screens/Auth/Home";
import AdDetails from "@screens/Auth/AdDetails";

// Tabs
export type AppAuthBottomTabRoutes = {
  home: undefined;
};

// Stack
export type AppAuthStackRoutes = {
  tabs: undefined;
  adetails: undefined;
};

const Tab = createBottomTabNavigator<AppAuthBottomTabRoutes>();
const Stack = createNativeStackNavigator<AppAuthStackRoutes>();

function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => <House size={size} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}

export function AuthRoutes() {
  return (
    <Host>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="tabs" component={BottomTabs} />
        <Stack.Screen name="adetails" component={AdDetails} />
      </Stack.Navigator>
    </Host>
  );
}
