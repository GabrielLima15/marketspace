import Button from "@components/Button";
import Header from "@components/Header";
import Input from "@components/Input";
import Radio from "@components/Radio";
import Switch from "@components/Switch";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Text, View } from "react-native";

export default function AddAds() {

  const [isLoading, setIsLoading] = useState(false);
  const [selected, setSelected] = useState("");
  const [acceptTrade, setAcceptTrade] = useState(false);

  const { control, handleSubmit, formState: { errors } } = useForm<any>({
    // resolver: zodResolver(loginSchema)
  });

  async function handleLogin(data: any) {
    try {
      setIsLoading(true);
      console.log("Dados do Formulário:", data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <View className="flex-1 bg-base-gray-6">
      <Header back routeTitle title="Criar anúncio" />

      {/* <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <Input keyboardType='email-address' value={value} onChangeText={onChange} placeholder="E-mail" />
        )}
      /> */}

      <View className="mx-5 mt-5">
        <Text className="text-base-gray-2 text-base font-bold leading-base">Imagens</Text>
        <Text className="text-base-gray-3 text-sm font-bold leading-base mt-2 mb-3">{`Escolha até 3 imagens para mostrar o \n quando o seu produto é incrível!`}</Text>
        <Text className="text-base-gray-3 text-sm font-bold leading-base mt-2">{`Escolha até 3 imagens para mostrar o \n quando o seu produto é incrível!`}</Text>
        <Text className="text-base-gray-2 text-base font-bold leading-base mt-2 mb-4">Sobre o produto</Text>

        <Controller
          control={control}
          name="type"
          render={({ field: { onChange, value } }) => (
            <Input keyboardType='default' value={value} onChangeText={onChange} placeholder="Título do anúncio" />
          )}
        />

        <View className="mt-5">
          <Controller
            control={control}
            name="type"
            render={({ field: { onChange, value } }) => (
              <Input keyboardType='default' value={value} onChangeText={onChange} placeholder="Descrição do produto" isTextArea={true} />
            )}
          />
        </View>

        <View className="flex-row mt-5">
          <Radio
            label="Produto novo"
            value="novo"
            selected={selected}
            onSelect={setSelected}
          />
          <Radio
            label="Produto usado"
            value="usado"
            selected={selected}
            onSelect={setSelected}
          />
        </View>

        <Text className="text-base-gray-2 text-base font-bold leading-base mt-8">Venda</Text>

        <View className="mt-5">
          <Controller
            control={control}
            name="type"
            render={({ field: { onChange, value } }) => (
              <Input keyboardType='default' value={value} onChangeText={onChange} placeholder="Descrição do produto" isMoneyInput={true} />
            )}
          />
        </View>

        <View className="flex-col">
          <Text className="text-base-gray-2 text-base font-bold leading-base mt-8">Aceita troca?</Text>

          <Switch
            value={acceptTrade}
            onChange={setAcceptTrade}
          />
        </View>

        <Text className="text-base-gray-2 text-sm font-bold leading-base mt-8">Meios de pagamento aceitos</Text>
      </View>

      <View className="w-full h-20 bg-white absolute bottom-0 justify-center">
        <View className="flex-row justify-center w-full gap-4">
          <View className="w-[13rem]">
            <Button
              title="Criar anúncio"
              color="gray"
            />
          </View>

          <View className="w-[13rem]">
            <Button
              title="Avançar"
              color="dark"
              onPress={handleSubmit(handleLogin)}
            />
          </View>
        </View>
      </View>


    </View>
  );
}