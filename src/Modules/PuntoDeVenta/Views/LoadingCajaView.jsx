import { Box, Spinner, Text } from '@chakra-ui/react'
import React from 'react'

const LoadingCajaView = () => {
  return (
    <Box width={"100%"} padding={"20px"}>
        <Box width={"100%"} alignContent={"center"} display={"flex"} justifyContent={"center"} alignItems={"center"} height={"60vh"}>
        <Spinner color='teal' size={"xl"} thickness='4px' emptyColor='gray.200'/>
        </Box>
    </Box>
  )
}

export default LoadingCajaView
