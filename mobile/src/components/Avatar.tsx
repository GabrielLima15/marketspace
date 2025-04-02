import { useAuth } from "@hooks/useAuth";
import { api } from "@services/api";
import { User } from "phosphor-react-native";
import { Image, View } from "react-native";

export default function Avatar() {

  const { user } = useAuth()

  return (
    <View className="border-2 border-product-blue-light rounded-full">
      {user?.avatar ? <Image
        className="w-10 h-10 rounded-full"
        source={{ uri: `${api.defaults.baseURL}/images/${user.avatar}` }}
        onError={(e) => console.log("Erro ao carregar imagem:", e.nativeEvent)}
      /> : <User size={32} />}
    </View>
  )
}