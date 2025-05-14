import React from "react"
import { Image, Text, TouchableOpacity, View } from "react-native"

type Props = {
  product: {
    id: string
    title: string
    price: string
    image?: string | null
    isUsed?: boolean
  },
  user: {
    id: string
    avatar?: string
    name?: string
  }
  isDisabled?: boolean
  showAvatar?: boolean
  onPress?: () => void
}

export default function CardsAds({ product: { title, price, image, isUsed, }, showAvatar = true, isDisabled, user: { id, avatar }, onPress }: Props) {
  const condition = isUsed ? 'USADO' : 'NOVO'

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ width: '48%' }}
      className="mb-4">
      <View className="rounded-lg overflow-hidden bg-gray-100">
        <View className="relative w-full h-40">
          <Image
            source={image ? { uri: image } : require('@assets/ads/shoes.png')}
            resizeMode="contain"
            className="w-full h-full"
          />

          {isDisabled && (
            <>
              <View className="absolute top-0 left-0 right-0 bottom-0 bg-black/25 h-32 mt-4 z-10" />

              <View className="absolute left-0 right-10 top-[7.5rem] justify-center items-center z-20">
                <Text className="text-white font-bold text-sm">
                  ANÚNCIO DESATIVADO
                </Text>
              </View>
            </>
          )}

          <View className="absolute w-full top-5 left-0 right-0 flex-row justify-between items-center p-2">
            {showAvatar ? (
              !isDisabled ? (
                avatar ? (
                  <Image source={{ uri: avatar }} className="w-8 h-8 rounded-full" />
                ) : (
                  <View className="w-8 h-8" />
                )
              ) : (
                <View className="w-8 h-8" />
              )
            ) : (
              <View className="w-8 h-8" />
            )}

            <View className={`${isUsed ? 'bg-black' : 'bg-product-blue'} px-3 py-1 rounded-full`}>
              <Text className="text-white text-[11px] font-bold uppercase">{condition}</Text>
            </View>
          </View>

        </View>

        <View className="-mt-2">
          <Text className={` font-normal leading-base text-sm ${isDisabled ? 'text-base-gray-4' : 'text-base-gray-2'}`}>{title}</Text>

          <View className="flex-row gap-1">
            <Text className={`text-[12px] font-bold align-bottom ${isDisabled ? 'text-base-gray-4' : 'text-base-gray-1'}`}>R$</Text>
            <Text className={`text-base-gray-1 font-bold align-bottom ${isDisabled ? 'text-base-gray-4' : 'text-base-gray-1'}`}>{price}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}
