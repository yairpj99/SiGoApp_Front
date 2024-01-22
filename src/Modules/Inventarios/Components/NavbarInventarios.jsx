import { Box, Button, Menu, MenuButton } from '@chakra-ui/react'
import React from 'react'
import { useDispatch } from 'react-redux'
import { startSetView } from '../../../Store/Inventrios/Thunks';

const NavbarInventarios = () => {
  const dispatch = useDispatch();

  return (
    <>
    <Box bgColor={"#4A5568"}>
    <Menu>
        <MenuButton as={Button} colorScheme='#4A5568' onClick={()=>dispatch(startSetView(''))}>
            CONSULTAR INVENTARIOS
        </MenuButton>
        <MenuButton as={Button} colorScheme='#4A5568' onClick={()=>dispatch(startSetView('GenerarSkuView'))}>
            IMPRIMIR ETIQUETAS
        </MenuButton>
        <MenuButton as={Button} colorScheme='#4A5568' onClick={()=>dispatch(startSetView('AgregarArticulos'))}>
            ALTA DE ARTICULOS
        </MenuButton>
    </Menu>
    </Box>
    </>
  )
}

export default NavbarInventarios
