import { NavigationContainer } from '@react-navigation/native'
import { NoAuthRoutes } from './app.no.auth.routes'
import { AuthRoutes } from './app.auth.routes'
import Loading from '@components/Loading'
import Toast from 'react-native-toast-message'
import { useAuth } from '@contexts/AuthContext'

export default function AppRoutes() {

  const { user, isLoadingUserStorageData } = useAuth()

  if (isLoadingUserStorageData) {
    return <Loading size="large" />
  }

  return (
    <NavigationContainer>
      {user.id ? <AuthRoutes /> : <NoAuthRoutes />}
      <Toast />
    </NavigationContainer>
  )
}