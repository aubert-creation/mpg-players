
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { RootStackParamList } from '../../types'

import HomeScreen from '../screens/HomeScreen'
import PlayerScreen from '../screens/PlayerScreen'

const Stack = createNativeStackNavigator<RootStackParamList>()

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Home' component={HomeScreen} />
        <Stack.Screen name='Player' component={PlayerScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
