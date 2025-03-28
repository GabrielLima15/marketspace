// auth.routes.tsx

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { House, Tag } from "phosphor-react-native";
import { Host } from "react-native-portalize";

import Home from "@screens/Auth/Home";
import AdDetails from "@screens/Auth/AdDetails";
import MyAds from "@screens/Auth/MyAds";

// Tabs
export type AppAuthBottomTabRoutes = {
  home: undefined;
  myads: undefined;
};

// Stack
export type AppAuthStackRoutes = {
  tabs: undefined;
  adetails: {
    data: {
      id: string;
      title: string;
      isUsed: boolean;
      price: string;
      image: string;
      user: {
        id: string;
        avatar?: string;
        name: string;
      };
    };
  };
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
      <Tab.Screen
        name="myads"
        component={MyAds}
        options={{
          tabBarIcon: ({ color, size }) => <Tag size={size} color={color} />,
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
