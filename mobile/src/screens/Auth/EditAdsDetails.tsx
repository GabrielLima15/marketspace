import Button from "@components/Button";
import CheckBox from "@components/CheckBox";
import Header from "@components/Header";
import Input from "@components/Input";
import Radio from "@components/Radio";
import Switch from "@components/Switch";
import UploadAdPhoto from "@components/UploadAdPhoto";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { ScrollView, Text, View } from "react-native";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { AppAuthStackRoutes } from "@routes/app.auth.routes";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { getImages } from "@utils/GetImages";
import { ProductDTO } from "@dtos/ProductDTO";

type ImageItem = {
  uri: string;
  id?: string;
};

const adSchema = z.object({
  title: z.string().min(1, "Informe o título do anúncio"),
  description: z.string().min(1, "Informe a descrição do produto"),
  price: z.string().min(1, "Informe o preço"),
  images: z.array(
    z.object({
      uri: z.string().min(1),
      id: z.string().optional()
    })
  ).min(1, "Adicione pelo menos 1 imagem").max(3, "Máximo de 3 imagens"),
  condition: z.enum(["novo", "usado"], {
    errorMap: () => ({ message: "Escolha a condição do produto" }),
  }),
  acceptTrade: z.boolean(),
  paymentMethods: z.array(z.string()).min(1, "Selecione pelo menos um meio de pagamento"),
});

type FormData = z.infer<typeof adSchema>;

export default function EditAdsDetails() {

  const [isLoading, setIsLoading] = useState(false);
  const [selected, setSelected] = useState("");
  const [acceptTrade, setAcceptTrade] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const navigation = useNavigation<NativeStackNavigationProp<AppAuthStackRoutes>>();

  const route = useRoute<RouteProp<AppAuthStackRoutes, "editadsdetails">>();
  const { product } = route.params;
  const { control, handleSubmit, setValue, watch, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(adSchema),
    defaultValues: {
      images: [],
      acceptTrade: false,
      paymentMethods: [],
    },
  });

  useEffect(() => {
    if (product) {
      setValue("title", product.name);
      setValue("description", product.description);
      setValue("price", (product.price / 100).toFixed(2));
      setValue("condition", product.is_new ? "novo" : "usado");
      setValue("acceptTrade", product.accept_trade);
      setValue("paymentMethods", product.payment_methods.map(m => m.name));
      setSelected(product.is_new ? "novo" : "usado");
      setSelectedOptions(product.payment_methods.map(m => m.name));
      setValue(
        "images",
        product.product_images.map(img => ({
          uri: getImages(img.path) || '',
          id: img.id
        }))
      );
    }
  }, [product, setValue]);

  const images = watch("images") || [];

  function handleSetImages(newImages: ImageItem[]) {
    setValue("images", newImages);
  }

  const handleSelect = (value: string) => {
    setSelectedOptions((prev) => {
      const updated = prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value];

      setValue("paymentMethods", updated);
      return updated;
    });
  };

  const paymentMethods = ["Boleto", "Pix", "Dinheiro", "Cartão de Crédito", "Depósito Bancário"];

  async function next(product: any) {
    navigation.navigate("previewads", {
      product: {
        ...product,
        id: route.params.product.id
      },
      isEdit: true
    });
  }

  return (
    <View className="flex-1 bg-base-gray-6">
      <Header back routeTitle title="Editar anúncio" />

      <ScrollView className="mx-5 mt-5 mb-24">
        <Text className="text-base-gray-2 text-base font-bold leading-base">Imagens</Text>
        <Text className="text-base-gray-3 text-sm font-bold leading-base mt-2 mb-3">{`Escolha até 3 imagens para mostrar o \n quando o seu produto é incrível!`}</Text>

        <View className="flex-row gap-3 mt-2">
          <UploadAdPhoto images={images} setImages={handleSetImages} />

        </View>
        {errors.images && (
          <Text className="text-red-500 text-xs mt-2">{errors.images.message}</Text>
        )}

        <Text className="text-base-gray-2 text-base font-bold leading-base mt-4 mb-4">Sobre o produto</Text>

        <Controller
          control={control}
          name="title"
          render={({ field: { onChange, value } }) => (
            <Input
              keyboardType='default'
              value={value}
              onChangeText={onChange}
              placeholder="Título do anúncio"
              errorMessage={errors.title?.message}
            />
          )}
        />

        <View className="mt-5">
          <Controller
            control={control}
            name="description"
            render={({ field: { onChange, value } }) => (
              <Input
                keyboardType='default'
                value={value}
                onChangeText={onChange}
                placeholder="Descrição do produto"
                isTextArea
                errorMessage={errors.description?.message}
              />
            )}
          />
        </View>

        <View className="flex-row mt-5">
          <Radio
            label="Produto novo"
            value="novo"
            selected={selected}
            onSelect={(value) => {
              setSelected(value);
              setValue("condition", value as "novo" | "usado");
            }}
          />
          <Radio
            label="Produto usado"
            value="usado"
            selected={selected}
            onSelect={(value) => {
              setSelected(value);
              setValue("condition", value as "novo" | "usado");
            }}
          />
        </View>

        <Text className="text-base-gray-2 text-base font-bold leading-base mt-8">Venda</Text>

        <View className="mt-5">
          <Controller
            control={control}
            name="price"
            render={({ field: { onChange, value } }) => (
              <Input
                keyboardType='default'
                value={value}
                onChangeText={onChange}
                placeholder="Preço"
                isMoneyInput
                errorMessage={errors.price?.message}
              />
            )}
          />
        </View>

        <View className="flex-col">
          <Text className="text-base-gray-2 text-base font-bold leading-base mt-8">Aceita troca?</Text>

          <Controller
            control={control}
            name="acceptTrade"
            render={({ field: { value, onChange } }) => (
              <Switch value={value} onChange={onChange} />
            )}
          />
        </View>

        <Text className="text-base-gray-2 text-sm font-bold leading-base mt-2">Meios de pagamento aceitos</Text>

        <View className="flex-col flex-wrap mt-4">
          {paymentMethods.map((method) => (
            <CheckBox
              key={method}
              label={method}
              value={method}
              selectedValues={selectedOptions}
              onSelect={handleSelect}
            />
          ))}
        </View>
      </ScrollView>

      <View className="w-full h-20 bg-white absolute bottom-0 justify-center">
        <View className="flex-row justify-center w-full gap-4">
          <View className="w-[13rem]">
            <Button
              title="Cancelar"
              color="gray"
              onPress={navigation.goBack}
            />
          </View>

          <View className="w-[13rem]">
            <Button
              title="Avançar"
              color="dark"
              isLoading={isLoading}
              onPress={handleSubmit(next)}
            />
          </View>
        </View>
      </View>


    </View>
  );
}