import { Alert, AlertDescription, AlertIcon, AlertTitle, Box } from '@chakra-ui/react'
import React from 'react'
import { useSelector } from 'react-redux'

const ErrorMessajeComponent = () => {
    const {errorMessage} = useSelector(state=>state.gestion);
  return (
    <Box marginTop={"10px"}>
        <Alert status='error' variant='solid'>
            <AlertIcon />
            <AlertTitle>Error al realizar la consulta</AlertTitle>
        </Alert>
    </Box>
  )
}

export default ErrorMessajeComponent
