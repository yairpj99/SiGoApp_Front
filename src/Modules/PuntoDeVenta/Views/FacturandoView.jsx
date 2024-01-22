import React from 'react'
import { Box, Divider, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Spacer, Spinner, Text } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux';
import { startChangeView } from '../../../Store/PuntoDeVenta/Thunks';

const FacturandoView = () => {
    const dispatch = useDispatch();
    const { viewPago } = useSelector(state => state.puntoDeVenta);

    const onClose = () => {
        dispatch(startChangeView('facturacion'));
    }

    return (
        <Modal isOpen={true} onClose={onClose} size={"xs"}>
            <ModalOverlay />
            <ModalContent>
                <ModalBody>
                    <Box width={"100%"} height={"20vh"} alignContent={"center"} justifyContent={"center"} display={"colum"}>
                        <Box marginTop={"40%"}>
                        <Flex align="center" justify="center">
                            <Spinner size={"xl"} emptyColor='gray.200' color='teal.600' thickness='5px'/>
                        </Flex>
                        <Text textAlign={"center"} fontSize={"large"}>Cargando...</Text>
                        </Box>
                    </Box>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default FacturandoView
