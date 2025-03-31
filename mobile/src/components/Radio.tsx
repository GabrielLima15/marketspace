import { TouchableOpacity, View, Text } from "react-native";

type Props = {
  label: string
  value: string
  selected: string
  onSelect: (value: string) => void
}

export default function Radio({ label, value, selected, onSelect }: Props) {
  const isSelected = selected === value;

  return (
    <TouchableOpacity
      onPress={() => onSelect(value)}
      className="flex-row items-center mr-4"
      activeOpacity={0.7}
    >
      <View className={`w-5 h-5 rounded-full border-2 items-center justify-center ${isSelected ? 'border-product-blue-light' : 'border-base-gray-5'}`}>
        {isSelected && <View className="w-2.5 h-2.5 rounded-full bg-product-blue-light" />}
      </View>
      <Text className="ml-2 text-base-gray-3 text-sm">{label}</Text>
    </TouchableOpacity>
  );
}
