import CardsAds from "@components/CardsAds";
import Header from "@components/Header";
import MyAdsSummaryCard from "@components/MyAdsSummaryCard";
import SearchFilter from "@components/SearchFilter";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppAuthStackRoutes } from "@routes/app.auth.routes";
import { currentHeight } from "@utils/responsive";
import { FlatList, SafeAreaView, Text } from "react-native";

export default function Home() {
  const navigation = useNavigation<NativeStackNavigationProp<AppAuthStackRoutes>>();

  const data = [
    {
      id: 1,
      title: "Produto 1",
      isUsed: true,
      price: "50,00",
    },
    {
      id: 2,
      title: "Produto 2",
      isUsed: false,
      price: "50,00",
    },
    {
      id: 3,
      title: "Produto 3",
      isUsed: false,
      price: "50,00",
    },
    {
      id: 4,
      title: "Produto 4",
      isUsed: true,
      price: "50,00",
    },
    {
      id: 5,
      title: "Produto 5",
      isUsed: true,
      price: "50,00",
    },
    {
      id: 6,
      title: "Produto 5",
      isUsed: false,
      price: "50,00",
    },
  ]

  return (
    <SafeAreaView
      className="flex-1 mx-8"
      style={{ paddingTop: currentHeight }}
    >
      <Header />

      <Text className="pt-8 text-base text-base-gray-3 font-karla font-normal leading-base">
        Seus produtos anunciados para venda
      </Text>

      <MyAdsSummaryCard numberOfAds={3} />

      <Text className="mt-10 text-base text-base-gray-3 font-karla font-normal leading-base">
        Compre produtos variados
      </Text>

      <SearchFilter placeholder="Buscar anúncio" />

      <FlatList
        data={data}
        renderItem={
          ({ item }) => (
            <CardsAds
              onPress={() => navigation.navigate("adetails")}
              title={item.title}
              price={item.price}
              isUsed={item.isUsed}
            />
          )}
        keyExtractor={item => String(item.id)}
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

    </SafeAreaView>
  )
}