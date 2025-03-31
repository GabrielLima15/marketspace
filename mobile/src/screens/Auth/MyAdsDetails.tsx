import Header from "@components/Header";
import ImageCarousel from "@components/Carrousel";
import { RouteProp, useRoute } from "@react-navigation/native";
import { AppAuthStackRoutes } from "@routes/app.auth.routes";
import { Image, ScrollView, Text, View } from "react-native";
import { Bank, Barcode, CreditCard, Money, Power, QrCode, Trash, User } from "phosphor-react-native";
import Button from "@components/Button";

export default function MyAdsDetails() {
  const route = useRoute<RouteProp<AppAuthStackRoutes, "myadsdetails">>();
  const { product: { image, isDisabled, ...data }, user } = route.params;

  const productImages = [image, image, image];

  const avatar = user?.avatar

  return (
    <ScrollView className="flex-1 bg-base-gray-7">
      <Header back editAds />

      <View className="relative">
        <ImageCarousel
          images={productImages}
          height={300}
          indicatorHeight={3}
        />

        {isDisabled && (
          <>
            <View className="absolute top-0 left-0 right-0 bottom-0 bg-black/30 z-10 mt-4" />
            <View className="absolute top-0 left-0 right-0 bottom-0 justify-center items-center z-20">
              <Text className="text-white font-bold text-base">
                ANÚNCIO DESATIVADO
              </Text>
            </View>
          </>
        )}
      </View>

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

        <View className="bg-base-gray-5 rounded-full mt-8 w-14 h-w-14 items-center p-2">
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
          Cras congue cursus in tortor sagittis placerat nunc, tellus arcu. Vitae ante leo eget maecenas urna mattis cursus. Mauris metus amet nibh mauris mauris accumsan, euismod. Aenean leo nunc, purus iaculis in aliquam.
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

        <View className="flex-col gap-4 mt-4 mb-4 mx-3">
          <Button icon={<Power size={20} color="#fff" />} title={isDisabled ? "Reativar anúncio" : "Desativar anúncio"} color={isDisabled ? "primary" : "dark"} />
          <Button icon={<Trash size={20} color="#5F5B62" />} title="Excluir anúncio" color="gray" />
        </View>
      </View>

    </ScrollView>
  );
}
