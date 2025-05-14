import { useProduct } from "@hooks/useProduct";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppAuthBottomTabRoutes } from "@routes/app.auth.routes";
import { ArrowRight, Tag } from "phosphor-react-native";
import { Text, TouchableOpacity, View } from "react-native";

export default function MyAdsSummaryCard() {

  const navigation = useNavigation<NativeStackNavigationProp<AppAuthBottomTabRoutes>>();

  const handleNavigateToMyAds = () => navigation.navigate("myads");

  const { products } = useProduct();

  return (
    products.length > 0 ? (
      <View className="w-full flex-row items-center justify-between h-20 px-4 mt-4 bg-[rgba(100,121,199,0.3)] rounded-md">
        <View className="flex-row items-center gap-3">
          <Tag size={20} color="#364D9D" weight="regular" />
          <View>
            <Text className="font-bold text-base text-base-gray-2">{products.length}</Text>
            <Text className="text-sm text-base-gray-2">anúncios ativos</Text>
          </View>
        </View>

        <TouchableOpacity onPress={handleNavigateToMyAds} className="flex-row items-center gap-2">
          <Text className="text-sm text-product-blue-light font-bold">
            Meus anúncios
          </Text>
          <ArrowRight size={16} color="#364D9D" />
        </TouchableOpacity>
      </View>
    ) : null
  );
}
