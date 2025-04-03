// @utils/uploadImages.ts
import { api } from "@services/api";

type UploadImageParams = {
  images: string[];
  productId: string;
};

export async function uploadImages({ images, productId }: UploadImageParams): Promise<void> {
  const formData = new FormData();

  formData.append("product_id", productId);

  for (const imageUri of images) {
    const fileName = imageUri.split("/").pop() || `image.jpg`;
    const fileExtension = fileName.split(".").pop();
    const mimeType = `image/${fileExtension}`;

    formData.append("images", {
      uri: imageUri,
      name: fileName,
      type: mimeType
    } as any);
  }

  await api.post("/products/images", formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
}
