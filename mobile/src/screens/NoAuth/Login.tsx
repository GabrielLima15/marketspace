import LogoText from '@assets/logo-text.svg';
import Logo from '@assets/logo.svg';
import Button from "@components/Button";
import Input from "@components/Input";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { ScrollView, Text, View } from "react-native";
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { NoAuthNavigatorRoutesProps } from '@routes/app.no.auth.routes';

const loginSchema = z.object({
  email: z.string().nonempty("Informe o email").email("Email inválido"),
  password: z.string().nonempty("Informe a senha").min(6, "A senha precisa ter pelo menos 6 dígitos"),
});


type FormDataProps = z.infer<typeof loginSchema>;

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation<NoAuthNavigatorRoutesProps>();

  const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
    resolver: zodResolver(loginSchema)
  })

  async function handleLogin(data: FormDataProps) {
    try {
      setIsLoading(true);
      console.log("Dados do Formulário:", data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  function handleRegister() {
    navigation.navigate("register");
  }


  return (
    <ScrollView className="bg-white flex-1" showsVerticalScrollIndicator={false}>
      <View className="bg-base-gray-6 items-center rounded-b-[30px]">
        <View className="items-center pt-40">
          <Logo className="w-full h-96" />
          <LogoText className="w-full h-96" />
          <Text className="text-sm font-light font-karla text-base-gray-3 leading-base">Seu espaço de compra e venda</Text>
        </View>

        <View className="pt-20 pb-16 w-80">
          <Text className="mb-4 text-center">Acesse sua conta</Text>

          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <Input keyboardType='email-address' value={value} onChangeText={onChange} placeholder="E-mail" errorMessage={errors.email?.message} />
            )}
          />

          <View className="mt-5">
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, value } }) => (
                <Input value={value} onChangeText={onChange} isPasswordInput placeholder="Senha" errorMessage={errors.password?.message} />
              )}
            />
          </View>

          <View className="mt-5">
            <Button onPress={handleSubmit(handleLogin)} isLoading={isLoading} color="primary" title="Entrar" />
          </View>

        </View>
      </View>

      <View className="items-center pt-20">
        <Text className="text-base-gray-2 font-light leading-base">Ainda não tem acesso?</Text>
        <View className="w-80 mt-8">
          <Button onPress={handleRegister} color="gray" title="Criar conta" />
        </View>
      </View>
    </ScrollView>
  )
}