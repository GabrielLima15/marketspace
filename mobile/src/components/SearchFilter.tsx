import { MagnifyingGlass } from "phosphor-react-native";
import { TextInput, TextInputProps, TouchableOpacity, View } from "react-native";
import FilterModal from "./FilterModal";

type Props = TextInputProps & {
  onSearch: (query: string) => void;
  onFilter: (filters: {
    is_new?: boolean;
    accept_trade?: boolean;
    payment_methods: string[];
  }) => void;
}

export default function SearchFilter({ onSearch, onFilter, ...rest }: Props) {
  return (
    <View className="bg-white w-full rounded-md mt-4 flex-row items-center justify-between px-4 py-2">
      <TextInput
        className="flex-1"
        onChangeText={onSearch}
        {...rest}
      />

      <View className="flex-row items-center gap-2">
        <TouchableOpacity onPress={() => onSearch(rest.value || '')}>
          <MagnifyingGlass size={20} weight="bold" />
        </TouchableOpacity>
        <FilterModal onApplyFilters={onFilter} />
      </View>
    </View>
  )
}