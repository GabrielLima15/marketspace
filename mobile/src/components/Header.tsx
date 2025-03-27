import { useAuth } from "@hooks/useAuth";
import { Plus } from "phosphor-react-native";
import { Text, View } from "react-native";
import Button from "./Button";
import Avatar from "./Avatar";

export default function Header() {
  const { user } = useAuth();

  return (
    <View className="flex-row justify-between items-center mt-4">
      <View className="flex-row items-center gap-2">
        <Avatar />

        <View>
          <Text className="text-sm text-gray-500">Boas vindas,</Text>
          <Text className="font-bold text-base">
            {user?.name ? user.name : "Usuário"}!
          </Text>
        </View>
      </View>

      <Button
        color="dark"
        title="Criar anúncio"
        className="px-4 py-2 rounded-md w-full"
        icon={<Plus size={20} color="#fff" />}
      />
    </View>
  );
}
