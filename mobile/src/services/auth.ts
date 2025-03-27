import { api } from "./api";

export const DoRegister = async (data: {
  name: string;
  email: string;
  tel: string;
  password: string;
  avatar?: any; // opcional se ainda não está usando
}) => {
  const formData = new FormData();

  formData.append('name', data.name);
  formData.append('email', data.email);
  formData.append('tel', data.tel);
  formData.append('password', data.password);

  if (data.avatar) {
    formData.append('avatar', {
      uri: data.avatar.uri,
      name: data.avatar.name || 'avatar.jpg',
      type: data.avatar.type || 'image/jpeg',
    } as any);
  }

  return api.post('/users/', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};
