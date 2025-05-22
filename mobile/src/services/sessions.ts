import { POST } from "./api";

export const Login = async (email: string, password: string) => {
    const response = await POST('/sessions', { email, password })
    return { data: response.data }
}

export const RefreshToken = async (refresh_token: string) => {
    const response = await POST('/sessions/refresh-token', { refresh_token })
    return { data: response.data }
}
