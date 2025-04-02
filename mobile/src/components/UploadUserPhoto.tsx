import { User, PencilSimpleLine } from "phosphor-react-native";
import { TouchableOpacity, View } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { Image } from "react-native";

type UploadUserPhotoProps = {
  onChange: (uri: string) => void;
  value?: string | null;
}

export default function UploadUserPhoto({ onChange, value }: UploadUserPhotoProps) {
  async function handleUpload() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0].uri) {
      onChange(result.assets[0].uri);
    }
  }

  return (
    <View className='border-2 rounded-full bg-base-gray-5 border-product-blue-light mt-5 w-24 h-24 items-center justify-center'>
      {value ? (
        <Image className="rounded-full w-full h-full" source={{ uri: value }} />
      ) : (
        <User size={40} color="#5F5B62" />
      )}
      <TouchableOpacity
        className='absolute -bottom-1 -right-1 bg-product-blue-light rounded-full p-2'
        onPress={handleUpload}
      >
        <PencilSimpleLine color='#fff' size={16} />
      </TouchableOpacity>
    </View>
  )
}