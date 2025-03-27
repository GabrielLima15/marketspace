import { Faders, X } from "phosphor-react-native";
import { useRef, useState } from "react";
import { Switch, Text, TouchableOpacity, View } from "react-native";
import { Modalize } from "react-native-modalize";
import { Portal } from "react-native-portalize";

export default function FilterModal() {
  const modalizeRef = useRef<Modalize>(null);

  const [selected, setSelected] = useState<"NOVO" | "USADO" | null>("NOVO");
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const handleSelect = (condition: "NOVO" | "USADO") => {
    setSelected(prev => (prev === condition ? null : condition));
  };

  const onOpen = () => {
    modalizeRef.current?.open();
  };

  return (
    <View className="border-l-[1px] border-base-gray-4 pl-2">
      <TouchableOpacity onPress={onOpen}>
        <Faders size={24} color="#364D9D" />
      </TouchableOpacity>

      <Portal>
        <Modalize
          ref={modalizeRef}
          modalStyle={{ width: '100%', alignSelf: 'center', borderRadius: 12, paddingTop: 10 }}
          modalHeight={650}
          handlePosition="inside"
        >
          <View className="mx-4 pt-5">
            <View className="flex-row items-center justify-between">
              <Text className="text-base-gray-1 font-bold text-lg leading-base">Filtrar anúncios</Text>

              <TouchableOpacity onPress={() => modalizeRef.current?.close()}>
                <X size={20} />
              </TouchableOpacity>
            </View>

            <Text className="text-base-gray-2 font-bold text-sm leading-base mt-8">Condição</Text>

            <View className="flex-row items-center gap-2 mt-4">

              <TouchableOpacity
                onPress={() => handleSelect("NOVO")}
                className={`px-4 py-2 rounded-full flex-row items-center gap-2 border 
                ${selected === "NOVO" ? "bg-product-blue-light border-product-blue-light" : "bg-base-gray-5 border-base-gray-5"}`}
              >
                <Text
                  className={`font-bold text-sm 
                  ${selected === "NOVO" ? "text-white" : "text-base-gray-3"}`}
                >
                  NOVO
                </Text>
                {selected === "NOVO" &&
                  <View className="bg-white rounded-full p-[3px]">
                    <X size={10} weight="bold" color="#647AC7" />
                  </View>
                }
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => handleSelect("USADO")}
                className={`px-4 py-2 rounded-full flex-row items-center gap-2 border 
                ${selected === "USADO" ? "bg-product-blue-light border-product-blue-light" : "bg-base-gray-5 border-base-gray-5"}`}
              >
                <Text
                  className={`font-bold text-sm 
                  ${selected === "USADO" ? "text-white" : "text-base-gray-3"}`}
                >
                  USADO
                </Text>

                {selected === "USADO" &&
                  <View className="bg-white rounded-full p-[3px]">
                    <X size={10} weight="bold" color="#647AC7" />
                  </View>
                }
              </TouchableOpacity>
            </View>



            <Text className="text-base-gray-2 font-bold text-sm leading-base mt-8">Aceita troca?</Text>
            <View className="flex-row">
              <Switch
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                onValueChange={toggleSwitch}
                value={isEnabled}
              />

            </View>

          </View>

        </Modalize>
      </Portal>
    </View>
  );
}
