import { useAuth } from '@hooks/useAuth'
import { NavigationContainer } from '@react-navigation/native'
import { NoAuthRoutes } from './app.no.auth.routes'

export default function AppRoutes() {

  const { user } = useAuth()

  // if (isLoadingUserStorageData) {
  //   return <Loading />
  // }

  return (
    <NavigationContainer>
      {user.id ? <NoAuthRoutes /> : <NoAuthRoutes />}
    </NavigationContainer>
  )
}