import { Box, Text } from '@chakra-ui/react'
import React from 'react'
import OptionsView from '../Components/OptionsView'
import { useDispatch } from 'react-redux'
import InfoPdvView from '../Components/InfoPdvView'
import DescuentosView from '../Components/DescuentosView'

const MenuInicioView = () => {
    return (
        <>
            <Box>
                <InfoPdvView />
            </Box>
            <Box>
                <Text textAlign={"center"}>OPCIONES</Text>
                <OptionsView />
                <Text textAlign={"center"}>DESCUENTOS</Text>
                <DescuentosView/>
            </Box>
        </>
    )
}

export default MenuInicioView
