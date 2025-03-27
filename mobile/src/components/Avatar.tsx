import { User } from "phosphor-react-native";
import { View } from "react-native";

export default function Avatar() {
  return (
    <View className="border-2 border-product-blue-light rounded-full p-2">
      <User size={32} />
    </View>
  )
}