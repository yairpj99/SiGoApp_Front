import { Box, Button, Menu, MenuButton } from '@chakra-ui/react'
import React from 'react'
import { useDispatch } from 'react-redux';
import { startSetView } from '../../../Store/Inventrios/Thunks';

const MenuComponent = () => {
  const dispatch = useDispatch();
  return (
    <Box bgColor={"#4A5568"}>
    <Menu>
      <MenuButton as={Button} colorScheme='#4A5568' onClick={()=>dispatch(startSetView("GenerarSkuView"))}>
        GENERAR SKU
      </MenuButton>
      <MenuButton as={Button} colorScheme='#4A5568' onClick={()=>dispatch(startSetView("EditarSkuView"))}>
        EDITAR SKU
      </MenuButton>
    </Menu>
    </Box>
  )
}

export default MenuComponent
