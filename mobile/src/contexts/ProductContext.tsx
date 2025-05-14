import { createContext, ReactNode, useEffect, useState } from "react";
import { ProductDTO } from "@dtos/ProductDTO";
import { api } from "@services/api";
import { storageProductsGet, storageProductsSave } from "@storage/storageProducts";
import { uploadImages } from "@utils/UploadImages";
import { useAuth } from "@hooks/useAuth";

const paymentMethodMap: Record<string, string> = {
  "boleto": "boleto",
  "pix": "pix",
  "dinheiro": "cash",
  "cartão de crédito": "card",
  "depósito bancário": "deposit"
};

type ProductContextDataProps = {
  userProducts: ProductDTO[];
  products: ProductDTO[];
  createProduct: (data: any) => Promise<void>;
  updateProduct: (data: any, productId: string) => Promise<void>;
  fetchUserProducts: () => Promise<void>;
  deleteProduct: (productId: string) => Promise<void>;
  toggleProductActiveStatus: (productId: string, isActive: boolean) => Promise<void>;
  deleteProductImages: (imageIds: string[]) => Promise<void>;
}

type ProductContextProviderProps = {
  children: ReactNode;
}

export const ProductContext = createContext<ProductContextDataProps>({} as ProductContextDataProps);

export function ProductContextProvider({ children }: ProductContextProviderProps) {
  const [userProducts, setUserProducts] = useState<ProductDTO[]>([]);
  const [products, setProducts] = useState<ProductDTO[]>([]);
  const { user } = useAuth();

  const isAuthenticated = !!user.id;

  async function fetchUserProducts() {
    try {
      const response = await api.get('/users/products');
      setUserProducts(response.data);
      await storageProductsSave(response.data);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  }

  async function fetchProducts() {
    try {
      const response = await api.get('/products');
      console.log("🚀 ~ fetchProducts ~ response:", response)
      setProducts(response.data);
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
        payment_methods: data.paymentMethods.map((method: string) => paymentMethodMap[method.toLowerCase()])
      });

      const productId = response.data.id;
      await uploadImages({ images: data.images, productId });

      await fetchUserProducts();
    } catch (error) {
      console.error("Erro ao criar produto:", error);
      throw error;
    }
  }

  async function updateProduct(data: any, productId: string) {
    try {
      await api.put(`/products/${productId}`, {
        name: data.title,
        description: data.description,
        is_new: data.condition === "novo",
        price: Number(data.price),
        accept_trade: data.acceptTrade,
        payment_methods: data.paymentMethods.map((method: string) => paymentMethodMap[method.toLowerCase()])
      });

      await uploadImages({ images: data.images, productId });
      await fetchUserProducts();
    } catch (error) {
      console.error("Erro ao atualizar produto:", error);
      throw error;
    }
  }

  async function deleteProduct(productId: string) {
    try {
      await api.delete(`/products/${productId}`);
      await fetchUserProducts();
    } catch (error) {
      console.error("Erro ao excluir produto:", error);
      throw error;
    }
  }

  async function toggleProductActiveStatus(productId: string, isActive: boolean) {
    try {
      await api.patch(`/products/${productId}`, {
        is_active: isActive
      });

      await fetchUserProducts();
    } catch (error) {
      console.error("Erro ao alterar status do produto:", error);
      throw error;
    }
  }

  async function deleteProductImages(imageIds: string[]) {
    try {
      await api.delete('/products/images/', {
        data: {
          images: imageIds
        }
      });
    } catch (error) {
      console.error("Erro ao excluir imagens do produto:", error);
      throw error;
    }
  }

  async function loadStoredUserProducts() {
    try {
      const stored = await storageProductsGet();
      setUserProducts(stored);
    } catch (error) {
      console.error("Erro ao carregar produtos do storage:", error);
    }
  }

  useEffect(() => {
    loadStoredUserProducts();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchUserProducts();
      fetchProducts();
    }
  }, [isAuthenticated]);

  return (
    <ProductContext.Provider value={{
      userProducts,
      products,
      createProduct,
      updateProduct,
      fetchUserProducts,
      deleteProduct,
      toggleProductActiveStatus,
      deleteProductImages
    }}>
      {children}
    </ProductContext.Provider>
  );
}