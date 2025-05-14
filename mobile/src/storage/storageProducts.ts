import AsyncStorage from "@react-native-async-storage/async-storage";

import { PRODUCTS_STORAGE } from "./storageConfig";
import { ProductDTO } from "@dtos/ProductDTO";

export async function storageUserSave(user: ProductDTO) {
  await AsyncStorage.setItem(PRODUCTS_STORAGE, JSON.stringify(user))
}

export async function storageUserGet() {
  const storage = await AsyncStorage.getItem(PRODUCTS_STORAGE);

  const products: ProductDTO = storage ? JSON.parse(storage) : {}

  return products;
}

export async function storageUserRemove() {
  await AsyncStorage.removeItem(PRODUCTS_STORAGE);
}