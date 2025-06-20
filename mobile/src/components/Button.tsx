import { Text, TouchableOpacity, TouchableOpacityProps, View } from "react-native";
import Loading from "./Loading";

type Props = TouchableOpacityProps & {
  title: string;
  color: "primary" | "gray" | "dark";
  isLoading?: boolean;
  submit?: () => void;
  icon?: React.ReactNode;
};

const colors = {
  primary: "bg-product-blue-light",
  gray: "bg-base-gray-5",
  dark: "bg-base-gray-1",
};

const textColors = {
  primary: "text-white",
  gray: "text-black",
  dark: "text-white",
};

export default function Button({
  title,
  color,
  isLoading,
  submit,
  icon,
  ...rest
}: Props) {
  return (
    <TouchableOpacity
      onPress={submit}
      {...rest}
      className={`${colors[color]} rounded-md items-center justify-center h-12 px-4`}
      disabled={isLoading}
    >
      {isLoading ? (
        <Loading size="small" />
      ) : (
        <View className="flex-row items-center gap-x-2">
          {icon && <View>{icon}</View>}
          <Text className={`${textColors[color]} font-bold font-karla text-sm`}>
            {title}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}
