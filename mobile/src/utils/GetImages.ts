import { api } from "@services/api";

export function getImages(filename?: string) {
  if (!filename) return null;
  return `${api.defaults.baseURL}/images/${filename}`;
}
