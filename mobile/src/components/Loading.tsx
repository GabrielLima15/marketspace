import { ActivityIndicator, ActivityIndicatorProps, View } from "react-native";

type Props = ActivityIndicatorProps & {
  size: 'small' | 'large' | undefined
}

export default function Loading({ size }: Props) {
  return (
    <View className="flex-1 items-center justify-center">
      <ActivityIndicator color="#fff" size={size} />
    </View>
  )
}