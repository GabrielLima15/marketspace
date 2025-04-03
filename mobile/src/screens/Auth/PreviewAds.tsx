import ImageCarousel from "@components/Carrousel";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { AppAuthStackRoutes } from "@routes/app.auth.routes";
import { Image, ScrollView, Text, View } from "react-native";
import { ArrowLeft, Bank, Barcode, CreditCard, Money, QrCode, Tag, User } from "phosphor-react-native";
import Button from "@components/Button";
import { useAuth } from "@hooks/useAuth";
import { useState } from "react";
import { api } from "@services/api";
import { getUserAvatarUrl } from "@utils/GetUserAvatar";
import { uploadImages } from "@utils/UploadImages";

const paymentIcons: any = {
  "Boleto": <Barcode />,
  "Pix": <QrCode />,
  "Dinheiro": <Money />,
  "Cartão de Crédito": <CreditCard />,
  "Depósito Bancário": <Bank />
};

type PropsData = {
  title: string;
  description: string;
  price: string;
  images: string[];
  condition: "novo" | "usado";
  acceptTrade: boolean;
  paymentMethods: string[];
  user: {
    name: string;
    avatar?: string | null;
  };
};

export default function PreviewAds() {
  const route = useRoute<RouteProp<AppAuthStackRoutes, "previewads">>();
  const { data } = route.params;

  const { user } = useAuth()
  console.log("🚀 ~ PreviewAds ~ user:", user)

  const avatarUrl = getUserAvatarUrl(user?.avatar);


  const productImages = data.images || [];
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigation();

  const handleCreateAd = async (data: PropsData) => {
    console.log("🚀 ~ handleCreateAd ~ data:", data);

    const paymentMethodMap: any = {
      "Boleto": "boleto",
      "Pix": "pix",
      "Dinheiro": "cash",
      "Cartão de Crédito": "card",
      "Depósito Bancário": "deposit"
    };

    try {
      setIsLoading(true);

      const response = await api.post('products', {
        name: data.title,
        description: data.description,
        is_new: data.condition === "novo",
        price: Number(data.price),
        accept_trade: data.acceptTrade,
        payment_methods: data.paymentMethods.map(method => paymentMethodMap[method])
      });

      const productId = response.data.id;
      await uploadImages({ images: data.images, productId });

      console.log("✅ Imagens enviadas com sucesso!");
    } catch (error) {
      console.error(error);
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
        images={productImages}
        height={300}
        indicatorHeight={3}
      />

      <ScrollView className="mx-4 mt-4">
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
            {data.condition === "usado" ? "USADO" : "NOVO"}
          </Text>
        </View>

        <View className="flex-row justify-between mt-4">
          <Text className="text-base-gray-1 text-lg font-bold leading-base">{data.title}</Text>

          <View className="flex-row">
            <Text className="text-product-blue-light text-sm font-bold align-bottom">R$ </Text>
            <Text className="text-product-blue-light text-lg font-bold">{data.price}</Text>
          </View>
        </View>

        <Text className="mt-5 text-base-gray-2 text-sm font-normal leading-base">
          {data.description}
        </Text>

        <View className="flex-row gap-2 mt-2">
          <Text className="mt-5 text-base-gray-2 text-sm font-bold leading-base">
            Aceita troca?
          </Text>

          <Text className="mt-5 text-base-gray-2 text-sm font-normal leading-base">
            {data.acceptTrade ? "Sim" : "Não"}
          </Text>
        </View>

        <View className="flex-col mt-2 gap-2">
          <Text className="mt-5 text-base-gray-2 text-sm font-bold leading-base">
            Meios de pagamento:
          </Text>

          {data.paymentMethods?.map((method, index) => (
            <View key={index} className="flex-row items-center gap-2">
              {paymentIcons[method] ?? <Money />}
              <Text className="text-base-gray-2 text-sm font-normal leading-base">{method}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <View className="w-full h-20 bg-white absolute bottom-0 justify-center">
        <View className="flex-row justify-center w-full gap-4">
          <View className="w-[45%]">
            <Button
              title="Voltar e editar"
              color="gray"
              icon={<ArrowLeft size={20} color="#000" />}
              onPress={() => navigate.goBack()}
            />
          </View>

          <View className="w-[45%]">
            <Button
              title="Publicar"
              color="primary"
              icon={<Tag size={20} color="#fff" />}
              isLoading={isLoading}
              onPress={() => handleCreateAd(data)}
            />
          </View>
        </View>
      </View>
    </View>
  );
}
