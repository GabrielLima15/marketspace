import { GET, POST } from "./api";

export const Create = async (avatar: string, name: string, email: string, tel: string, password: string) => {
    const formData = new FormData();
    formData.append('avatar', avatar);
    formData.append('name', name);
    formData.append('email', email);
    formData.append('tel', tel);
    formData.append('password', password);
    const response = await POST('/users', formData, true)
    return response.data
}

export const GetUser = async () => {
    const response = await GET('/users/me')
    return response.data
}

export const GetUserProducts = async () => {
    const response = await GET('/users/products', true)
    return response.data
}

