import { Plus, X } from "phosphor-react-native";
import { TouchableOpacity, View, Image } from "react-native";
import * as ImagePicker from 'expo-image-picker';

type Props = {
  images: string[];
  setImages: (imgs: string[]) => void;
};

export default function UploadAdPhoto({ images, setImages }: Props) {
  async function handleUpload() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      if (images.length < 3) {
        setImages([...images, result.assets[0].uri]);
      }
    }
  }

  function handleRemoveImage(uri: string) {
    setImages(images.filter((img) => img !== uri));
  }

  return (
    <View className="flex-row gap-3">
      {images.map((uri, index) => (
        <View key={index} className="relative rounded-md overflow-hidden">
          <Image source={{ uri }} className="w-24 h-24 rounded-md" />
          <TouchableOpacity
            className="absolute top-1 right-1 bg-black/60 rounded-full p-1"
            onPress={() => handleRemoveImage(uri)}
          >
            <X color="#fff" size={16} />
          </TouchableOpacity>
        </View>
      ))}

      {images.length < 3 && (
        <TouchableOpacity
          onPress={handleUpload}
          className="w-24 h-24 bg-base-gray-5 items-center justify-center rounded-md"
        >
          <Plus color="gray" size={24} />
        </TouchableOpacity>
      )}
    </View>
  );
}

