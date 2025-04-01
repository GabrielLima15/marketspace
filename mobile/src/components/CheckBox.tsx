import { Check } from "phosphor-react-native";
import { TouchableOpacity, View, Text } from "react-native";

type Props = {
  label: string;
  value: string;
  selectedValues: string[];
  onSelect: (value: string) => void;
};

export default function CheckBox({ label, value, selectedValues, onSelect }: Props) {
  const isSelected = selectedValues.includes(value);

  return (
    <TouchableOpacity
      onPress={() => onSelect(value)}
      className="flex-row items-center mr-4 mb-2"
      activeOpacity={0.7}
    >
      <View className={`w-5 h-5 border-2 items-center justify-center ${isSelected ? 'border-product-blue-light' : 'border-base-gray-5'} rounded`}>
        {isSelected &&
          <View className="w-5 h-5 bg-product-blue-light rounded items-center justify-center">
            <Check size={12} weight="bold" color="#fff" />
          </View>
        }
      </View>
      <Text className="ml-2 text-base-gray-3 text-sm">{label}</Text>
    </TouchableOpacity>
  );
}
