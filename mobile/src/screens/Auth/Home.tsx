import CardsAds from "@components/CardsAds";
import HeaderGroup from "@components/HeaderGroup";
import MyAdsSummaryCard from "@components/MyAdsSummaryCard";
import SearchFilter from "@components/SearchFilter";
import { useProduct } from "@contexts/ProductContext";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppAuthStackRoutes } from "@routes/app.auth.routes";
import { getImages } from "@utils/GetImages";
import { getUserAvatarUrl } from "@utils/GetUserAvatar";
import { FlatList, Text, View } from "react-native";

export default function Home() {
  const navigation = useNavigation<NativeStackNavigationProp<AppAuthStackRoutes>>();

  const handleNavigateToAddAds = () => navigation.navigate("addads");

  const { products } = useProduct();

  return (
    <View
      className="flex-1 mx-8"
    >
      <HeaderGroup onPress={handleNavigateToAddAds} />

      <MyAdsSummaryCard />

      <Text className="mt-10 text-base text-base-gray-3 font-karla font-normal leading-base">
        Compre produtos variados
      </Text>

      <SearchFilter placeholder="Buscar anúncio" />

      <FlatList
        data={products}
        renderItem={
          ({ item }) => (
            <CardsAds
              key={item.id}
              onPress={() =>
                navigation.navigate("adetails", {
                  data: {
                    id: item.id,
                    title: item.name,
                    isUsed: !item.is_new,
                    price: (item.price / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
                    image: getImages(item.product_images[0]?.path || '') || '',
                    user: {
                      id: item.user_id,
                      avatar: getUserAvatarUrl(item.user?.avatar || '') || undefined,
                      name: item.user?.name || 'Usuário'
                    }
                  }
                })
              }
              product={{
                id: item.id,
                title: item.name,
                isUsed: !item.is_new,
                price: (item.price / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
                image: getImages(item.product_images[0]?.path || '') || ''
              }}
              user={{
                id: item.user_id,
                avatar: getUserAvatarUrl(item.user?.avatar || '') || undefined,
                name: item.user?.name || 'Usuário'
              }}
            />
          )}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={{
          gap: 8,
        }}
        contentContainerStyle={{
          paddingTop: 10,
          paddingBottom: 40,
        }}
        showsVerticalScrollIndicator={false}
      />

    </View>
  )
}