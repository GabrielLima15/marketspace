import { Plus, X } from "phosphor-react-native";
import { TouchableOpacity, View, Image } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { useProduct } from "@hooks/useProduct";

type ImageItem = {
  uri: string;
  id?: string;
};

type Props = {
  images: ImageItem[];
  setImages: (imgs: ImageItem[]) => void;
};

export default function UploadAdPhoto({ images, setImages }: Props) {

  const { deleteProductImages } = useProduct();

  async function handleUpload() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      if (images.length < 3) {
        setImages([...images, { uri: result.assets[0].uri }]);
      }
    }
  }

  async function handleRemoveImage(image: ImageItem) {
    // Se tiver `id`, chama delete na API
    if (image.id) {
      try {
        await deleteProductImages([image.id]);
      } catch (error) {
        console.error("Erro ao excluir imagem do servidor:", error);
      }
    }

    // Remove da lista local (sempre)
    setImages(images.filter((img) => img.uri !== image.uri));
  }

  return (
    <View className="flex-row gap-3">
      {images.map((image, index) => (
        <View key={index} className="relative rounded-md overflow-hidden">
          <Image source={{ uri: image.uri }} className="w-24 h-24 rounded-md" />
          <TouchableOpacity
            className="absolute top-1 right-1 bg-black/60 rounded-full p-1"
            onPress={() => handleRemoveImage(image)}
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

