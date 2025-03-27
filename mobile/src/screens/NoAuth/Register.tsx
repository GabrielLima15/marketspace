import Logo from '@assets/logo.svg';
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { ScrollView, Text, View } from "react-native";
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import Input from '@components/Input';
import Button from '@components/Button';
import UploadUserPhoto from '@components/UploadUserPhoto';
import { DoRegister } from '@services/auth';

const loginSchema = z.object({
  name: z.string().nonempty("Informe o nome").min(3, "O nome precisa ter pelo menos 3 caracteres"),
  email: z.string().nonempty("Informe o email").email("Email inválido"),
  tel: z.string().nonempty("Informe o telefone"),
  password: z.string().nonempty("Informe a senha").min(6, "A senha precisa ter pelo menos 6 caracteres"),
  confirm_password: z.string().nonempty("Confirme a senha").min(6, "A senha precisa ter pelo menos 6 caracteres"),
}).superRefine((data, ctx) => {
  if (data.password !== data.confirm_password) {
    ctx.addIssue({
      code: 'custom',
      message: 'As senhas não coincidem',
      path: ['confirm_password'],
    });
  }
});



type FormDataProps = z.infer<typeof loginSchema>;

export default function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
    resolver: zodResolver(loginSchema)
  })

  async function handleRegister(data: FormDataProps) {
    try {
      setIsLoading(true);

      await DoRegister({
        name: data.name,
        email: data.email,
        tel: data.tel,
        password: data.password
      });

    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  function handleGoBack() {
    navigation.goBack();
  }


  return (
    <ScrollView className="flex-1 bg-base-gray-6" showsVerticalScrollIndicator={false} contentContainerClassName='items-center'>
      <View className="pt-16 items-center">
        <Logo className="w-full h-96" />
        <Text className='text-base-gray-1 font-bold leading-base text-lg'>Boas vindas!</Text>
        <Text className='text-base-gray-2 mt-5 text-center font-normal leading-base text-sm'>{`Crie sua conta e use o espaço para comprar \n itens variados e vender seus produtos`}</Text>
      </View>

      <UploadUserPhoto />

      <View className="pt-8 pb-16 w-80">

        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, value } }) => (
            <Input value={value} onChangeText={onChange} placeholder="Nome" errorMessage={errors.name?.message} />
          )}
        />

        <View className="mt-5">
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <Input value={value} onChangeText={onChange} placeholder="E-mail" errorMessage={errors.email?.message} />
            )}
          />
        </View>

        <View className="mt-5">
          <Controller
            control={control}
            name="tel"
            render={({ field: { onChange, value } }) => (
              <Input value={value} onChangeText={onChange} keyboardType='phone-pad' placeholder="Telefone" errorMessage={errors.tel?.message} />
            )}
          />
        </View>

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
          <Controller
            control={control}
            name="confirm_password"
            render={({ field: { onChange, value } }) => (
              <Input value={value} onChangeText={onChange} isPasswordInput placeholder="Confirmar Senha" errorMessage={errors.confirm_password?.message} />
            )}
          />
        </View>

        <View className="mt-8">
          <Button onPress={handleSubmit(handleRegister)} isLoading={isLoading} color="dark" title="Criar" />
        </View>

        <View className="mt-20">
          <Text className="text-base-gray-2 font-light leading-base text-center mb-8">Já tem uma conta?</Text>
          <Button onPress={handleGoBack} isLoading={isLoading} color="gray" title="Ir para o login" />
        </View>

      </View>
    </ScrollView>
  )
}