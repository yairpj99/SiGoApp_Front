import React from 'react'
import Buscador from '../Components/Buscador'
import { Alert, AlertIcon, AlertTitle, Box } from '@chakra-ui/react'
import TableInventarios from '../Components/TableInventarios'
import { useSelector } from 'react-redux'

const ConsultaInvetarios = () => {
    const { errorMesaje, inventarios } = useSelector(state => state.inventarios)
    return (
        <>
        <Box>
            <Buscador />
        </Box>
    {
        (errorMesaje == "") ?
        <Box margin={"20px"}>
            <Alert status='error'><AlertIcon><AlertTitle></AlertTitle></AlertIcon></Alert>
        </Box>
        : null
    }
    <Box marginTop={"20px"}>
        {(inventarios != 0) ?
            <TableInventarios />
            : null
        }
    </Box>
    </>
  )
}

export default ConsultaInvetarios
