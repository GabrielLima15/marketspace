import Header from "@components/Header";
import ImageCarousel from "@components/Carrousel";
import { RouteProp, useRoute } from "@react-navigation/native";
import { AppAuthStackRoutes } from "@routes/app.auth.routes";
import { Image, Text, View } from "react-native";
import { Bank, Barcode, CreditCard, Money, QrCode, User, WhatsappLogo } from "phosphor-react-native";
import Button from "@components/Button";

export default function AdDetails() {
  const route = useRoute<RouteProp<AppAuthStackRoutes, "adetails">>();
  const { data: { user, ...data } } = route.params;

  console.log("🚀 ~ AdDetails ~ data:", JSON.stringify(data, null, 2))

  const productImages = [data.image, data.image, data.image];

  const avatar = user?.avatar

  return (
    <View className="flex-1 bg-base-gray-7">
      <Header back />

      <ImageCarousel
        images={productImages}
        height={300}
        indicatorHeight={3}
      />

      <View className="mx-4 mt-4">
        <View className="flex-row items-center gap-2">
          {avatar ?
            <View className="border-[2px] border-product-blue-light rounded-full">
              <Image source={{ uri: avatar }} className="w-8 h-8 rounded-full" />
            </View>
            :
            <View className="border-[2px] border-product-blue-light rounded-full p-1">
              <User />
            </View>
          }
          <Text className="text-base-gray-1 text-sm font-normal leading-base">{user?.name}</Text>
        </View>

        <View className="bg-base-gray-5 rounded-full mt-8 w-20 h-w-14 items-center p-2">
          <Text className="text-base-gray-2 text-xs leading-base font-bold">{data.isUsed ? "USADO" : "NOVO"}</Text>
        </View>

        <View className="flex-row justify-between mt-4">
          <Text className="text-base-gray-1 text-lg font-bold leading-base">{data.title}</Text>

          <View className="flex-row">
            <Text className="text-product-blue-light text-sm font-bold align-bottom">R$ </Text>
            <Text className="text-product-blue-light text-lg font-bold">{data.price}</Text>
          </View>
        </View>

        <Text className="mt-5 text-base-gray-2 text-sm font-normal leading-base">
          {data.description ? data.description : 'Não há descrição para este produto'}
        </Text>

        <View className="flex-row gap-2 mt-2">
          <Text className="mt-5 text-base-gray-2 text-sm font-bold leading-base">
            Aceita troca?
          </Text>

          <Text className="mt-5 text-base-gray-2 text-sm font-normal leading-base">
            Sim
          </Text>
        </View>

        <View className="flex-col mt-2 gap-2">
          <Text className="mt-5 text-base-gray-2 text-sm font-bold leading-base">
            Meios de pagamento:
          </Text>

          <View className="flex-row items-center gap-2">
            <Barcode />
            <Text className="text-base-gray-2 text-sm font-normal leading-base">
              Boleto
            </Text>
          </View>
          <View className="flex-row items-center gap-2">
            <QrCode />
            <Text className="text-base-gray-2 text-sm font-normal leading-base">
              Pix
            </Text>
          </View>
          <View className="flex-row items-center gap-2">
            <Money />
            <Text className="text-base-gray-2 text-sm font-normal leading-base">
              Dinheiro
            </Text>
          </View>
          <View className="flex-row items-center gap-2">
            <CreditCard />
            <Text className="text-base-gray-2 text-sm font-normal leading-base">
              Cartão de Crédito
            </Text>
          </View>
          <View className="flex-row items-center gap-2">
            <Bank />
            <Text className="text-base-gray-2 text-sm font-normal leading-base">
              Depósito Bancário
            </Text>
          </View>

        </View>
      </View>

      <View className="w-full h-20 bg-white absolute bottom-0 justify-center">
        <View className="flex-row justify-between items-center gap-4 mx-8">
          <View className="flex-row">
            <Text className="text-product-blue-light text-sm font-bold align-bottom">R$ </Text>
            <Text className="text-product-blue-light text-lg font-bold">{data.price}</Text>
          </View>

          <Button
            color="primary" title="Entrar em contato" icon={<WhatsappLogo weight="fill" size={20} color="#fff" />}
          />
        </View>
      </View>


    </View>
  );
}
