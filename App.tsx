import { ThemeProvider } from 'styled-components'
import { StatusBar } from 'react-native'
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto'

import { Loading } from '@components/Loading'
import { Groups } from '@screens/Groups'
import theme from '@theme/index'
import { NewGroup } from '@screens/NewGroup'
import { Players } from '@screens/Players'

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  })

  return (
    <ThemeProvider theme={theme}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      {fontsLoaded ? <Players /> : <Loading />}
    </ThemeProvider>
  )
}
