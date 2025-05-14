import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { House, SignOut, Tag } from "phosphor-react-native";
import { Host } from "react-native-portalize";

import Home from "@screens/Auth/Home";
import AdDetails from "@screens/Auth/AdDetails";
import MyAds from "@screens/Auth/MyAds";
import MyAdsDetails from "@screens/Auth/MyAdsDetails";
import AddAds from "@screens/Auth/AddAds";
import PreviewAds from "@screens/Auth/PreviewAds";
import EditAdsDetails from "@screens/Auth/EditAdsDetails";
import { TouchableOpacity } from "react-native";
import { AuthContext } from "@contexts/AuthContext";
import { useContext } from "react";
import { ProductDTO } from "@dtos/ProductDTO";

// Tabs
export type AppAuthBottomTabRoutes = {
  home: undefined;
  myads: undefined;
  logout: undefined
};

// Stack
export type AppAuthStackRoutes = {
  tabs: { screen: keyof AppAuthBottomTabRoutes };
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
  myadsdetails: {
    product: ProductDTO;
  };
  addads: undefined;
  previewads: {
    data: {
      title: string;
      description: string;
      price: string;
      images: string[];
      condition: "novo" | "usado";
      acceptTrade: boolean;
      paymentMethods: string[];
      user: {
        name: string;
        avatar?: string | null;
      };
    }
  };
  editadsdetails: {
    product: ProductDTO;
  },
};

const Tab = createBottomTabNavigator<AppAuthBottomTabRoutes>();
const Stack = createNativeStackNavigator<AppAuthStackRoutes>();

function BottomTabs() {

  const { signOut } = useContext(AuthContext);


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
      <Tab.Screen
        name="logout"
        component={() => null}
        options={{
          tabBarButton: () => (
            <TouchableOpacity
              onPress={async () => await signOut()}
              style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
            >
              <SignOut size={24} color="red" />
            </TouchableOpacity>
          ),
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
        <Stack.Screen name="myadsdetails" component={MyAdsDetails} />
        <Stack.Screen name="addads" component={AddAds} />
        <Stack.Screen name="previewads" component={PreviewAds} />
        <Stack.Screen name="editadsdetails" component={EditAdsDetails} />
      </Stack.Navigator>
    </Host>
  );
}
