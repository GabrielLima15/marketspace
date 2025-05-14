import { createContext, ReactNode, useEffect, useState } from "react";
import { ProductDTO } from "@dtos/ProductDTO";
import { api } from "@services/api";
import { storageProductsGet, storageProductsSave } from "@storage/storageProducts";
import { uploadImages } from "@utils/UploadImages";

const paymentMethodMap: Record<string, string> = {
  "boleto": "boleto",
  "pix": "pix",
  "dinheiro": "cash",
  "cartão de crédito": "credit_card",
  "depósito bancário": "deposit"
};

type ProductContextDataProps = {
  products: ProductDTO[];
  fetchProducts: () => Promise<void>;
  createProduct: (data: any) => Promise<void>;
}

type ProductContextProviderProps = {
  children: ReactNode;
}

export const ProductContext = createContext<ProductContextDataProps>({} as ProductContextDataProps);

export function ProductContextProvider({ children }: ProductContextProviderProps) {
  const [products, setProducts] = useState<ProductDTO[]>([]);

  async function fetchProducts() {
    try {
      const response = await api.get('/users/products');
      setProducts(response.data);
      await storageProductsSave(response.data);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  }

  async function createProduct(data: any) {
    try {
      const response = await api.post('/products', {
        name: data.title,
        description: data.description,
        is_new: data.condition === "novo",
        price: Number(data.price),
        accept_trade: data.acceptTrade,
        payment_methods: data.paymentMethods.map((method: string) => paymentMethodMap[method])
      });

      const productId = response.data.id;
      await uploadImages({ images: data.images, productId });

      await fetchProducts();
    } catch (error) {
      console.error("Erro ao criar produto:", error);
      throw error;
    }
  }

  async function loadStoredProducts() {
    try {
      const stored = await storageProductsGet();
      setProducts(stored);
    } catch (error) {
      console.error("Erro ao carregar produtos do storage:", error);
    }
  }

  useEffect(() => {
    loadStoredProducts();
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider value={{
      products,
      fetchProducts,
      createProduct
    }}>
      {children}
    </ProductContext.Provider>
  );
}
