import { GET, POST } from "./api";

export const Create = async (avatar: string, name: string, email: string, tel: string, password: string) => {
    const response = await POST('/users', { avatar, name, email, tel, password })
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

