import { MagnifyingGlass } from "phosphor-react-native";
import { TextInput, TextInputProps, View } from "react-native";
import FilterModal from "./FilterModal";

type Props = TextInputProps & {

}

export default function SearchFilter({ ...rest }: Props) {
  return (
    <View className="bg-white w-full rounded-md mt-4 flex-row items-center justify-between px-4 py-2">
      <TextInput
        className=""
        {...rest}
      />

      <View className="flex-row items-center gap-2">
        <MagnifyingGlass size={20} weight="bold" />
        <FilterModal />
      </View>
    </View>
  )
}