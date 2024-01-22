import { Box, Button, CloseButton, Divider, Flex, IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spacer, Text } from '@chakra-ui/react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { startChangeView, startSetMenuView } from '../../../../Store/PuntoDeVenta/Thunks';
import MenuInicioView from './MenuInicioView';
import { IoMdCloseCircle, IoMdHome } from 'react-icons/io';
import ConsultarVentas from './ConsultarVentas';
import DetalleVenta from './DetalleVenta';
import RealizarRetiro from './RealizarRetiro';

const MenuView = () => {
  const dispatch = useDispatch();
  const { viewMenu } = useSelector(state => state.puntoDeVenta);

  const onClose = () => {
    dispatch(startChangeView('facturacion'));
  }
  return (
    <Modal isOpen={true} onClose={onClose} size={"full"}>
      <ModalOverlay />
      <ModalContent>
        <Flex padding={"10px"}>
          <Text fontSize={"x-large"} textAlign={"center"} marginLeft={"20px"}>MENU PUNTO DE VENTA</Text>
          <Spacer/>
          {(viewMenu=='inicio')?
          <IconButton colorScheme='red' onClick={()=>dispatch(startChangeView('facturacion'))}><IoMdCloseCircle fontSize={"30px"}/></IconButton>
          :
          <IconButton colorScheme='blue' onClick={()=>dispatch(startSetMenuView('inicio'))}><IoMdHome fontSize={"30px"}/></IconButton>
          }
        </Flex>
        <Divider />
        <ModalBody bgColor={"#E6E6E6"} padding={"20px"}>
          {(viewMenu=="inicio")?
          <MenuInicioView/>
          :(viewMenu=="ventas")?
          <ConsultarVentas/>
          :(viewMenu=="detalleVenta")?
          <DetalleVenta/>
          :(viewMenu=="realizarRetiro")?
          <RealizarRetiro/>
          :null
          }
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default MenuView
