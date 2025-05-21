import CardsAds from "@components/CardsAds";
import Header from "@components/Header";
import Select from "@components/Select";
import { useAuth } from "@contexts/AuthContext";
import { useProduct } from "@contexts/ProductContext";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppAuthStackRoutes } from "@routes/app.auth.routes";
import { api } from "@services/api";
import { useState } from "react";
import { FlatList, Text, View } from "react-native";

export default function MyAds() {
  const navigation = useNavigation<NativeStackNavigationProp<AppAuthStackRoutes>>();
  const [filter, setFilter] = useState<string | undefined>();
  const { products } = useProduct();
  const { user } = useAuth();

  const filteredProducts = products.filter((p) => {
    if (filter === "Ativos") return p.is_active;
    if (filter === "Inativos") return !p.is_active;
    return true;
  });

  return (
    <View>
      <Header
        onPress={() => navigation.navigate("addads")}
        addAds
        title="Meus anúncios"
        routeTitle
      />

      <View className="mx-8">
        <View className="flex-row items-center justify-between mt-8">
          <Text className="text-base-gray-2 text-sm font-normal leading-base">
            {filteredProducts.length} anúncios
          </Text>

          <Select
            title="Todos"
            options={["Todos", "Inativos", "Ativos"]}
            value={filter}
            onSelect={(option) => {
              setFilter(option === "Todos" ? undefined : option);
            }}
          />
        </View>

        <FlatList
          data={filteredProducts}
          renderItem={({ item }) => (
            <CardsAds
              onPress={() => navigation.navigate("myadsdetails", { product: item })}
              isDisabled={!item.is_active}
              product={{
                id: item.id,
                title: item.name,
                isUsed: !item.is_new,
                price: (item.price / 100).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }),
                image: `${api.defaults.baseURL}/images/${item.product_images[0]?.path}`,
              }}
              user={{
                id: user.id,
                avatar: user.avatar,
                name: user.name,
              }}
              showAvatar={false}
            />
          )}
          keyExtractor={item => item.id}
          numColumns={2}
          columnWrapperStyle={{ gap: 8 }}
          contentContainerStyle={{
            paddingTop: 10,
            paddingBottom: 40,
          }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
}
