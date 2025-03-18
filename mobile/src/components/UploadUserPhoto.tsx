import { User, PencilSimpleLine } from "phosphor-react-native";
import { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { Image } from "react-native";

export default function UploadUserPhoto() {
  const [image, setImage] = useState<string | null>(null);
  async function handleUpload() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  }

  return (
    <View className='border-2 rounded-full  bg-base-gray-5 border-product-blue-light mt-5'>
      {image ? <Image className="rounded-full p-12" source={{ uri: image }} width={50} height={50} /> : <View className="p-4"><User size={50} /></View>}
      <TouchableOpacity className='absolute top-14 left-12 bg-product-blue-light rounded-full p-3' onPress={handleUpload}>
        <PencilSimpleLine color='#fff' size={18} />
      </TouchableOpacity>
    </View>
  )
}