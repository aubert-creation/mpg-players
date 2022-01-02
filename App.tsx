import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Provider as PaperProvider } from 'react-native-paper'
import { QueryClientProvider, QueryClient } from 'react-query'

import useCachedResources from './hooks/useCachedResources'
import Navigation from './src/navigation'

const queryClient = new QueryClient()

export default function App() {

  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <PaperProvider>
          <Navigation />
          <StatusBar />
        </PaperProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  )
}
