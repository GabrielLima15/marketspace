import { AppError } from "@utils/AppError";
import axios, { AxiosError, AxiosInstance } from "axios";
import { ReadObject, SaveObject } from "./storage";
import { RefreshToken } from "./sessions";

type SignOut = () => void

type PromiseType = {
  onSucess: (token: string) => void;
  onFailure: (error: AxiosError) => void
}

type APIInstanceProps = AxiosInstance & {
  registerInterceptTokenManager: (signOut: SignOut) => () => void
}

const api = axios.create({
  baseURL: 'http://10.0.2.2:3333',
  timeout: 10000,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
}) as APIInstanceProps

let failedQueue: Array<PromiseType> = []
let isRefreshing = false

api.registerInterceptTokenManager = signOut => {
  const interceptTokenManager = api.interceptors.response.use(response => response, async (requestError) => {
    if (requestError?.response?.status === 401) {
      if (requestError.response.data?.message === 'token.expired' || requestError.response.data?.message === 'token.invalid') {
        const { refresh_token } = await ReadObject('refresh_token')

        if (!refresh_token) {
          signOut()
          return Promise.reject(requestError)
        }

        const originalRequestConfig = requestError.config

        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({
              onSucess: (token: string) => {
                originalRequestConfig.headers = { 'Authorization': `Bearer ${token}` }
                resolve(api(originalRequestConfig))
              },
              onFailure: (error: AxiosError) => {
                reject(error)
              }
            })
          })
        }

        isRefreshing = true

        return new Promise(async (resolve, reject) => {
          try {
            const { data } = await RefreshToken(refresh_token)
            await SaveObject('token', data.token)
            await SaveObject('refresh_token', data.refresh_token)

            if (originalRequestConfig.data) {
              originalRequestConfig.data = JSON.parse(originalRequestConfig.data)
            }

            originalRequestConfig.headers = { 'Authorization': `Bearer ${data.token}` }
            api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`

            failedQueue.forEach(request => {
              request.onSucess(data.token)
            })

            resolve(api(originalRequestConfig))

          } catch (error: any) {
            failedQueue.forEach(request => {
              request.onFailure(error)
            })

            signOut()
            reject(error)
          } finally {
            isRefreshing = false
            failedQueue = []
          }
        })
      }

      signOut()
    }

    if (requestError.response && requestError.response.data) {
      return Promise.reject(new AppError(requestError?.response?.data?.message))
    } else {
      return Promise.reject(requestError)
    }
  })

  return () => {
    api.interceptors.response.eject(interceptTokenManager)
  }
}

// Funções HTTP
export const GET = async (path: string, authenticated = false, p0?: { params: { is_new?: boolean; accept_trade?: boolean; payment_methods?: ("pix" | "card" | "boleto" | "cash" | "deposit")[]; query?: string; } | undefined; }) => {
  const config = authenticated ? {
    headers: {
      'Authorization': `Bearer ${await ReadObject('token')}`
    }
  } : {}

  const response = await api.get(path, config)
  return response.data
}

export const POST = async (path: string, body: any, authenticated = false) => {
  const config = {
    headers: {
      ...(authenticated ? { 'Authorization': `Bearer ${await ReadObject('token')}` } : {}),
      ...(body instanceof FormData 
        ? { 'Content-Type': 'multipart/form-data' }
        : { 'Content-Type': 'application/json' }
      )
    }
  }

  const response = await api.post(path, body, config)
  return response
}

export const PUT = async (path: string, body: any, authenticated = false) => {
  const config = authenticated ? {
    headers: {
      'Authorization': `Bearer ${await ReadObject('token')}`
    }
  } : {}

  const response = await api.put(path, body, config)
  return response.data
}

export const DELETE = async (path: string, authenticated = false) => {
  const config = authenticated ? {
    headers: {
      'Authorization': `Bearer ${await ReadObject('token')}`
    }
  } : {}

  const response = await api.delete(path, config)
  return response.data
}

export const PATCH = async (path: string, body: any, authenticated = false) => {
  const config = authenticated ? {
    headers: {
      'Authorization': `Bearer ${await ReadObject('token')}`
    }
  } : {}

  const response = await api.patch(path, body, config)
  return response.data
}

export { api }