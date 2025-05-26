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
import { useCallback, useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { Read } from "@services/products";

type PaymentMethod = "pix" | "card" | "boleto" | "cash" | "deposit";

export default function Home() {
  const navigation = useNavigation<NativeStackNavigationProp<AppAuthStackRoutes>>();
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<{
    is_new?: boolean;
    accept_trade?: boolean;
    payment_methods?: PaymentMethod[];
  }>({});
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleNavigateToAddAds = () => navigation.navigate("addads");

  const fetchProducts = useCallback(async () => {
    try {
      setIsLoading(true);

      const activeFilters: any = {};
      
      if (searchQuery) {
        activeFilters.query = searchQuery;
      }
      
      if (filters.is_new !== undefined) {
        activeFilters.is_new = filters.is_new;
      }
      
      if (filters.accept_trade !== undefined) {
        activeFilters.accept_trade = filters.accept_trade;
      }
      
      if (filters.payment_methods && filters.payment_methods.length > 0) {
        activeFilters.payment_methods = filters.payment_methods;
      }
      
      const response = await Read(Object.keys(activeFilters).length > 0 ? activeFilters : undefined);
      
      if (Array.isArray(response)) {
        setProducts(response);
      } else if (response?.data && Array.isArray(response.data)) {
        setProducts(response.data);
      } else {
        console.error('Resposta da API inválida:', response);
        setProducts([]);
      }
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  }, [filters, searchQuery]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilter = (newFilters: {
    is_new?: boolean;
    accept_trade?: boolean;
    payment_methods: string[];
  }) => {
    
    if (
      newFilters.is_new === undefined && 
      newFilters.accept_trade === undefined && 
      newFilters.payment_methods.length === 0
    ) {
      setFilters({});
    } else {
      const validPaymentMethods = newFilters.payment_methods.filter(method => 
        ["pix", "card", "boleto", "cash", "deposit"].includes(method)
      ) as PaymentMethod[];

      setFilters({
        is_new: newFilters.is_new,
        accept_trade: newFilters.accept_trade,
        payment_methods: validPaymentMethods.length > 0 ? validPaymentMethods : undefined
      });
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      fetchProducts();
    }
  }, [filters, searchQuery]);

  return (
    <View
      className="flex-1 mx-8"
    >
      <HeaderGroup onPress={handleNavigateToAddAds} />

      <MyAdsSummaryCard />

      <Text className="mt-10 text-base text-base-gray-3 font-karla font-normal leading-base">
        Compre produtos variados
      </Text>

      <SearchFilter 
        placeholder="Buscar anúncio" 
        onSearch={handleSearch}
        onFilter={handleFilter}
        value={searchQuery}
      />

      {isLoading ? (
        <Text className="text-center mt-4">Carregando produtos...</Text>
      ) : products.length === 0 ? (
        <Text className="text-center mt-4">Nenhum produto encontrado</Text>
      ) : (
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
      )}
    </View>
  )
}