import ImageCarousel from "@components/Carrousel";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { AppAuthStackRoutes } from "@routes/app.auth.routes";
import { Alert, Image, ScrollView, Text, View } from "react-native";
import { Bank, Barcode, CreditCard, Money, Power, QrCode, Trash, User } from "phosphor-react-native";
import Button from "@components/Button";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Header from "@components/Header";
import { api } from "@services/api";
import { getUserAvatarUrl } from "@utils/GetUserAvatar";
import React from "react";
import Toast from "react-native-toast-message";
import { useAuth } from "@contexts/AuthContext";
import { useProduct } from "@contexts/ProductContext";

export default function MyAdsDetails() {
  const route = useRoute<RouteProp<AppAuthStackRoutes, "myadsdetails">>();
  const { product } = route.params;

  const navigation = useNavigation<NativeStackNavigationProp<AppAuthStackRoutes>>();
  const { user } = useAuth();
  const { toggleProductActiveStatus, deleteProduct } = useProduct();

  const productImages = product.product_images.map(
    image => `${api.defaults.baseURL}/images/${image.path}`
  );

  const avatar = getUserAvatarUrl(user?.avatar);

  const handleEditAd = () => {
    navigation.navigate("editadsdetails", {
      product
    });
  };

  async function handleToggleActiveStatus() {
    try {
      const newStatus = !product.is_active;
      await toggleProductActiveStatus(product.id, newStatus);

      Toast.show({
        type: 'success',
        text1: `Anúncio ${newStatus ? 'reativado' : 'desativado'} com sucesso!`
      });

      navigation.navigate("tabs", { screen: "myads" });

    } catch (error) {
      Toast.show({
        type: 'error',
        text1: `Erro ao ${product.is_active ? 'desativar' : 'reativar'} anúncio`
      });
    }
  }

  async function handleDelete() {
    try {
      await deleteProduct(product.id);

      Toast.show({
        type: 'success',
        text1: 'Anúncio excluido com sucesso!'
      });
      navigation.navigate("tabs", { screen: "myads" });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Erro ao excluir anúncio'
      });
    }
  }

  return (
    <ScrollView className="flex-1 bg-base-gray-7">
      <Header back editAds onPress={handleEditAd} />

      <View className="relative">
        <ImageCarousel
          images={productImages}
          height={300}
          indicatorHeight={3}
        />

        {!product.is_active && (
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
          {avatar ? (
            <View className="border-[2px] border-product-blue-light rounded-full">
              <Image source={{ uri: avatar }} className="w-8 h-8 rounded-full" />
            </View>
          ) : (
            <View className="border-[2px] border-product-blue-light rounded-full p-1">
              <User />
            </View>
          )}
          <Text className="text-base-gray-1 text-sm font-normal leading-base">
            {user.name}
          </Text>
        </View>

        <View className="bg-base-gray-5 rounded-full mt-8 w-14 h-w-14 items-center p-2">
          <Text className="text-base-gray-2 text-xs leading-base font-bold">
            {product.is_new ? "NOVO" : "USADO"}
          </Text>
        </View>

        <View className="flex-row justify-between mt-4">
          <Text className="text-base-gray-1 text-lg font-bold leading-base">
            {product.name}
          </Text>

          <View className="flex-row">
            <Text className="text-product-blue-light text-sm font-bold align-bottom">R$ </Text>
            <Text className="text-product-blue-light text-lg font-bold">
              {(product.price / 100).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL"
              })}
            </Text>
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
            {product.accept_trade ? "Sim" : "Não"}
          </Text>
        </View>

        <View className="flex-col mt-2 gap-2">
          <Text className="mt-5 text-base-gray-2 text-sm font-bold leading-base">
            Meios de pagamento:
          </Text>

          {product.payment_methods.map(method => (
            <View key={method.key} className="flex-row items-center gap-2">
              {method.key === "boleto" && <Barcode />}
              {method.key === "pix" && <QrCode />}
              {method.key === "cash" && <Money />}
              {method.key === "card" && <CreditCard />}
              {method.key === "deposit" && <Bank />}
              <Text className="text-base-gray-2 text-sm font-normal leading-base">
                {method.name}
              </Text>
            </View>
          ))}
        </View>

        <View className="flex-col gap-4 mt-4 mb-4 mx-3">
          <Button
            icon={<Power size={20} color="#fff" />}
            title={product.is_active ? "Desativar anúncio" : "Reativar anúncio"}
            color={product.is_active ? "dark" : "primary"}
            submit={handleToggleActiveStatus}
          />
          <Button
            icon={<Trash size={20} color="#5F5B62" />}
            title="Excluir anúncio"
            color="gray"
            submit={() => {
              Alert.alert(
                "Excluir anúncio",
                "Tem certeza que deseja excluir este anúncio?",
                [
                  { text: "Cancelar", style: "cancel" },
                  {
                    text: "Excluir",
                    style: "destructive",
                    onPress: handleDelete
                  }
                ]
              );
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
}
