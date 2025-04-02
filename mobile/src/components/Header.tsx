import { useNavigation } from "@react-navigation/native";
import { ArrowLeft, PencilLine, Plus } from "phosphor-react-native";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = {
  back?: boolean
  routeTitle?: boolean
  title?: string
  addAds?: boolean
  editAds?: boolean
  onPress?: () => void
}

export default function Header({ back, routeTitle, title, addAds, editAds, onPress }: Props) {

  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  }

  return (
    <SafeAreaView className="px-4 flex-row w-full justify-between">
      {back ? (
        <TouchableOpacity onPress={handleGoBack}>
          <ArrowLeft size={24} color="black" />
        </TouchableOpacity>
      ) : <View />}


      {routeTitle ? (
        <Text className="font-bold text-lg leading-base text-base-gray-1">{title}</Text>
      ) : <View />}

      {addAds ? (
        <TouchableOpacity onPress={onPress}>
          <Plus size={24} color="black" />
        </TouchableOpacity>
      ) : editAds ? (
        <TouchableOpacity onPress={onPress}>
          <PencilLine size={24} color="black" />
        </TouchableOpacity>
      ) : (
        <View />
      )}

    </SafeAreaView>
  )
}