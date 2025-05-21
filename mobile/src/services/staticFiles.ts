import { GET } from "./api";

export const Read = async (filePath: string) => {
  const response = await GET(`/images/${filePath}`, true)
  return response.data
}
