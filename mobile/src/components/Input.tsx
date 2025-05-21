import { useState } from "react";
import { Text, TextInput, TextInputProps, TouchableOpacity, View } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { getMaskedValue } from "@utils/mask";

type Props = TextInputProps & {
  isPasswordInput?: boolean;
  errorMessage?: string | null;
  isInvalid?: boolean;
  isReadOnly?: boolean;
  isTextArea?: boolean;
  isMoneyInput?: boolean;
};

export default function Input({
  isPasswordInput,
  isReadOnly = false,
  isInvalid = false,
  errorMessage = null,
  isTextArea = false,
  isMoneyInput = false,
  ...rest
}: Props) {
  const [showPass, setShowPass] = useState(false);
  const [value, setValue] = useState(rest.value as string || '');

  function toggleShowPass() {
    setShowPass((prevState) => !prevState);
  }

  function handleChangeText(text: string) {
    const maskedValue = getMaskedValue(text, { isMoneyInput, keyboardType: rest.keyboardType });
    setValue(maskedValue);
    rest.onChangeText?.(maskedValue);
  }

  return (
    <View className="w-full">
      <View
        className={`
          bg-base-gray-7 rounded-md p-1 px-3 relative border-base-gray-7
          ${isInvalid ? "border-red-500" : "border-gray-500"}
          ${isReadOnly ? "opacity-50" : ""}
          ${isTextArea ? "h-40" : ""}
        `}
      >
        <TextInput
          editable={!isReadOnly}
          secureTextEntry={isPasswordInput ? !showPass : false}
          className={`pr-10 text-black ${isMoneyInput ? "mx-6" : null}`}
          placeholderTextColor="#9F9BA1"
          value={value}
          onChangeText={handleChangeText}
          {...rest}
        />

        {isPasswordInput && (
          <TouchableOpacity onPress={toggleShowPass} className="absolute right-4 top-4">
            <Feather name={showPass ? "eye" : "eye-off"} size={20} color="#5F5B62" />
          </TouchableOpacity>
        )}

        {isMoneyInput && (
          <View className="absolute left-4 top-4">
            <Text>R$</Text>
          </View>
        )}
      </View>

      {errorMessage && (
        <Text className="text-red-500 mt-1 text-sm">{errorMessage}</Text>
      )}
    </View>
  );
}
