import { api } from "@services/api";

export function getUserAvatarUrl(avatarFilename?: string) {
  if (!avatarFilename) return null;
  return `${api.defaults.baseURL}/images/${avatarFilename}`;
}
