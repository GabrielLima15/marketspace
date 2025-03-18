import { useState } from "react";
import { Text, TextInput, TextInputProps, TouchableOpacity, View } from "react-native";
import Feather from "@expo/vector-icons/Feather";

type Props = TextInputProps & {
  isPasswordInput?: boolean;
  errorMessage?: string | null;
  isInvalid?: boolean;
  isReadOnly?: boolean;
};

export default function Input({
  isPasswordInput,
  isReadOnly = false,
  isInvalid = false,
  errorMessage = null,
  ...rest
}: Props) {
  const [showPass, setShowPass] = useState(false);

  function toggleShowPass() {
    setShowPass((prevState) => !prevState);
  }

  return (
    <View className="w-full">
      <View
        className={`
          bg-base-gray-7 rounded-md p-1 px-3 relative border-base-gray-7
          ${isInvalid ? "border-red-500" : "border-gray-500"}
          ${isReadOnly ? "opacity-50" : ""}
        `}
      >
        <TextInput
          editable={!isReadOnly}
          secureTextEntry={isPasswordInput ? !showPass : false}
          className="pr-10 text-black"
          {...rest}
        />

        {isPasswordInput && (
          <TouchableOpacity onPress={toggleShowPass} className="absolute right-4 top-4">
            <Feather name={showPass ? "eye" : "eye-off"} size={20} color="#5F5B62" />
          </TouchableOpacity>
        )}
      </View>

      {errorMessage && (
        <Text className="text-red-500 mt-1 text-sm">{errorMessage}</Text>
      )}
    </View>
  );
}
