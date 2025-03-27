import { Image, Text, TouchableOpacity, View } from "react-native"
import User from '@assets/ads/user.svg'

type Props = {
  title?: string
  price?: string
  image?: string | null
  isUsed?: boolean
  onPress: () => void
}

export default function CardsAds({ title, price, image, isUsed, onPress }: Props) {
  const condition = isUsed ? 'USADO' : 'NOVO'

  return (
    <TouchableOpacity className="flex-1 mb-4 mx-1" onPress={onPress}>
      <View className="rounded-md overflow-hidden bg-gray-100">
        <View className="relative w-full h-40">
          <Image
            source={image ? { uri: image } : require('@assets/ads/shoes.png')}
            resizeMode="contain"
            className="w-full h-full"
          />

          <View className="absolute w-full top-5 left-0 right-0 flex-row justify-between items-center p-2">
            <User width={24} height={24} />

            <View className={`${isUsed ? 'bg-black' : 'bg-product-blue'} px-3 py-1 rounded-full`}>
              <Text className="text-white text-[11px] font-bold uppercase">{condition}</Text>
            </View>
          </View>
        </View>

        <View className="-mt-4">
          <Text className="text-base-gray-2 font-normal leading-base text-sm">{title}</Text>

          <View className="flex-row gap-1">
            <Text className="text-[12px] font-bold text-base-gray-1 align-bottom">R$</Text>
            <Text className="text-base-gray-1 text-[16px] font-bold leading-base">{price}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}
