import { Box, Button, ButtonGroup, Flex, IconButton, Text } from '@chakra-ui/react'
import React from 'react'
import { TbDiscount } from "react-icons/tb";
import DescuentoButton from './DescuentoButton';
import { useDispatch, useSelector } from 'react-redux';
import { addDescuento } from '../../../../Store/PuntoDeVenta/Thunks';

const DescuentosView = () => {
  const {articulosFacturacion} = useSelector(state=>state.puntoDeVenta);
  return (
    <Box padding={"20px"}>
      <ButtonGroup spacing={6}>
        {(articulosFacturacion.length>10)?
        <DescuentoButton title={"Descuento Mayoreo"} icon={"%"} amount={"10%"} />
        :null
        }
      </ButtonGroup>
    </Box>
  )
}

export default DescuentosView
