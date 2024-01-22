import { useState } from 'react'
import AppRouter from './Router/AppRouter'
import { ChakraProvider } from '@chakra-ui/react'
import Theme from './UI/Theme'

function App() {

  return (
    <ChakraProvider theme={Theme}>
    <AppRouter/>
    </ChakraProvider>
  )
}

export default App
