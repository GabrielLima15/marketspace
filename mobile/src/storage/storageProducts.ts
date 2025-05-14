// storageProducts.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PRODUCTS_STORAGE } from "./storageConfig";
import { ProductDTO } from "@dtos/ProductDTO";

export async function storageProductsSave(products: ProductDTO[]) {
  await AsyncStorage.setItem(PRODUCTS_STORAGE, JSON.stringify(products));
}

export async function storageProductsGet(): Promise<ProductDTO[]> {
  const storage = await AsyncStorage.getItem(PRODUCTS_STORAGE);
  const products: ProductDTO[] = storage ? JSON.parse(storage) : [];
  return products;
}

export async function storageProductsRemove() {
  await AsyncStorage.removeItem(PRODUCTS_STORAGE);
}
