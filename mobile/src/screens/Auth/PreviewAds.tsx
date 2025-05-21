import ImageCarousel from "@components/Carrousel";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { AppAuthStackRoutes } from "@routes/app.auth.routes";
import { Image, ScrollView, Text, View } from "react-native";
import { ArrowLeft, Bank, Barcode, CreditCard, Money, QrCode, Tag, User } from "phosphor-react-native";
import Button from "@components/Button";
import { useAuth } from "@contexts/AuthContext";
import { useState } from "react";
import { getUserAvatarUrl } from "@utils/GetUserAvatar";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Toast from "react-native-toast-message";
import { useProduct } from "@contexts/ProductContext";
import { ProductDTO } from "@dtos/ProductDTO";

const paymentIcons: any = {
  "Boleto": <Barcode />,
  "Pix": <QrCode />,
  "Dinheiro": <Money />,
  "Cartão de Crédito": <CreditCard />,
  "Depósito Bancário": <Bank />
};

type FormDataProps = {
  title: string;
  description: string;
  price: string;
  images: string[];
  condition: "novo" | "usado";
  acceptTrade: boolean;
  paymentMethods: string[];
  id?: string;
};

export default function PreviewAds() {
  const route = useRoute<RouteProp<AppAuthStackRoutes, "previewads">>();
  const { product, isEdit } = route.params;

  const { user } = useAuth()
  const { createProduct, updateProduct } = useProduct()

  const avatarUrl = getUserAvatarUrl(user?.avatar);

  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation<NativeStackNavigationProp<AppAuthStackRoutes>>();

  const publishOrUpdateAd = async (data: FormDataProps) => {
    try {
      setIsLoading(true);

      if (isEdit && data.id) {
        await updateProduct(data, data.id);
        Toast.show({
          type: 'success',
          text1: 'Anúncio atualizado com sucesso!',
        });
      } else {
        await createProduct(data);
        Toast.show({
          type: 'success',
          text1: 'Anúncio criado com sucesso!',
        });
      }

      navigation.navigate('tabs', { screen: 'myads' });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: isEdit ? 'Erro ao atualizar anúncio' : 'Erro ao criar anúncio',
      });
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-base-gray-7">

      <View className="w-full h-44 -mb-4 z-50 bg-product-blue-light justify-center">
        <View className="flex-col items-center mt-20 w-full gap-2">
          <Text className="text-base-gray-7 text-base font-bold">Pré visualização do anúncio</Text>
          <Text className="text-base-gray-7 text-sm">É assim que seu produto vai aparecer!</Text>
        </View>
      </View>

      <ImageCarousel
        images={product.images}
        height={300}
        indicatorHeight={3}
      />

      <ScrollView showsVerticalScrollIndicator={false} className="mx-4 mt-4">
        <View className="flex-row items-center gap-2">
          {avatarUrl ? (
            <View className="border-[2px] border-product-blue-light rounded-full">
              <Image source={{ uri: avatarUrl }} className="w-8 h-8 rounded-full" />
            </View>
          ) : (
            <View className="border-[2px] border-product-blue-light rounded-full p-1">
              <User />
            </View>
          )}
          <Text className="text-base-gray-1 text-sm font-normal leading-base">{user?.name}</Text>
        </View>

        <View className="bg-base-gray-5 rounded-full mt-8 w-14 h-w-14 items-center p-2">
          <Text className="text-base-gray-2 text-xs leading-base font-bold">
            {product.condition ? "Novo" : "Usado"}
          </Text>
        </View>

        <View className="flex-row justify-between mt-4">
          <Text className="text-base-gray-1 text-lg font-bold leading-base">{product.title}</Text>

          <View className="flex-row">
            <Text className="text-product-blue-light text-sm font-bold align-bottom">R$ </Text>
            <Text className="text-product-blue-light text-lg font-bold">{product.price}</Text>
          </View>
        </View>

        <Text className="mt-5 text-base-gray-2 text-sm font-normal leading-base">
          {product.description}
        </Text>

        <View className="flex-row gap-2 mt-2">
          <Text className="mt-5 text-base-gray-2 text-sm font-bold leading-base">
            Aceita troca?
          </Text>

          <Text className="mt-5 text-base-gray-2 text-sm font-normal leading-base">
            {product.acceptTrade ? "Sim" : "Não"}
          </Text>
        </View>

        <View className="flex-col mt-2 gap-2 mb-8">
          <Text className="mt-5 text-base-gray-2 text-sm font-bold leading-base">
            Meios de pagamento:
          </Text>

          {product.paymentMethods?.map((method, index) => (
            <View key={index} className="flex-row items-center gap-2">
              {paymentIcons[method] ?? <Money />}
              <Text className="text-base-gray-2 text-sm font-normal leading-base">{method}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <View className="w-full h-20 bg-white justify-center">
        <View className="flex-row justify-center w-full gap-4">
          <View className="w-[45%]">
            <Button
              title="Voltar e editar"
              color="gray"
              icon={<ArrowLeft size={20} color="#000" />}
              onPress={() => navigation.goBack()}
            />
          </View>

          <View className="w-[45%]">
            <Button
              title={isEdit ? "Salvar alterações" : "Publicar"}
              color="primary"
              icon={<Tag size={20} color="#fff" />}
              isLoading={isLoading}
              onPress={() => publishOrUpdateAd(product)}
            />
          </View>
        </View>
      </View>
    </View>
  );
}