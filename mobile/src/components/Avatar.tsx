import { useAuth } from "@contexts/AuthContext";
import { getUserAvatarUrl } from "@utils/GetUserAvatar";
import { User } from "phosphor-react-native";
import { Image, View } from "react-native";

export default function Avatar() {

  const { user } = useAuth()

  const avatarUrl = getUserAvatarUrl(user?.avatar);


  return (
    <View className="border-2 border-product-blue-light rounded-full">
      {avatarUrl ? <Image
        className="w-10 h-10 rounded-full"
        source={{ uri: avatarUrl }}
        onError={(e) => console.log("Erro ao carregar imagem:", e.nativeEvent)}
      /> : <User size={32} />}
    </View>
  )
}