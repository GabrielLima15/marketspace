import CardsAds from "@components/CardsAds";
import Header from "@components/Header";
import { useNavigation } from "@react-navigation/native";
import { FlatList, View } from "react-native";

export default function MyAds() {

  const navigation = useNavigation();

  const products = [
    {
      product: {
        id: "1",
        title: "Notebook Gamer",
        isUsed: false,
        price: "4.500,00",
        image: "https://picsum.photos/id/180/600/400"
      },
      user: {
        id: "1",
        avatar: "https://github.com/gabriellima15.png",
        name: "Gabriel Lima"
      }
    },
    {
      product: {
        id: "2",
        title: "Fone Over Ear",
        isUsed: true,
        price: "300,00",
        image: "https://picsum.photos/id/237/600/400"
      },
      user: {
        id: "2",
        avatar: "https://github.com/gabriellima15.png",
        name: "Gabriel Lima"
      }
    },
    {
      product: {
        id: "3",
        title: "Câmera DSLR Canon",
        isUsed: true,
        price: "2.000,00",
        image: "https://picsum.photos/id/250/600/400"
      },
      user: {
        id: "3",
        avatar: "https://github.com/gabriellima15.png",
        name: "Gabriel Lima"
      }
    },
    {
      product: {
        id: "4",
        title: "Tênis de Corrida Adidas",
        isUsed: false,
        price: "450,00",
        image: "https://picsum.photos/id/1084/600/400"
      },
      user: {
        id: "4",
        avatar: "https://github.com/gabriellima15.png",
        name: "Gabriel Lima"
      }
    },
    {
      product: {
        id: "5",
        title: "Relógio Digital Casio",
        isUsed: true,
        price: "120,00",
        image: "https://picsum.photos/id/1027/600/400"
      },
      user: {
        id: "5",
        avatar: "https://github.com/gabriellima15.png",
        name: "Gabriel Lima"
      }
    },
    {
      product: {
        id: "6",
        title: "Tablet Samsung Galaxy",
        isUsed: false,
        price: "1.800,00",
        image: "https://picsum.photos/id/1074/600/400"
      },
      user: {
        id: "6",
        avatar: "https://github.com/gabriellima15.png",
        name: "Gabriel Lima"
      }
    }
  ];

  return (
    <View className="">
      <Header addAds title="Meus anúncios" routeTitle />

      <View className="mx-8">
        <FlatList
          data={products}
          renderItem={
            ({ item }) => (
              <CardsAds
                key={item.product.id}
                product={item.product}
                user={item.user}
              />
            )}
          keyExtractor={item => item.product.id}
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
    </View>
  )
}