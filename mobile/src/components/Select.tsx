import { CaretDown } from "phosphor-react-native";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

type Props = {
  title: string;
  options: string[];
  value?: string;
  onSelect?: (option: string) => void;
};

export default function Select({
  title,
  options,
  value,
  onSelect,
}: Props) {
  const [open, setOpen] = useState(false);

  const handleToggle = () => setOpen(prev => !prev);

  const handleSelect = (option: string) => {
    onSelect?.(option);
    setOpen(false);
  };

  return (
    <View className="relative">
      <TouchableOpacity
        className="border border-base-gray-5 p-2 rounded-md gap-4 flex-row items-center justify-between"
        onPress={handleToggle}
      >
        <Text>{value || title}</Text>
        <CaretDown size={10} />
      </TouchableOpacity>

      {open && (
        <View className="absolute top-full left-0 w-full bg-white border border-base-gray-5 rounded-md z-10 shadow">
          {options.map((option) => (
            <TouchableOpacity
              key={option}
              onPress={() => handleSelect(option)}
              className="px-2 py-2"
            >
              <Text>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}
