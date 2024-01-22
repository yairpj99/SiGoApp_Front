import React from 'react'
import { Box, Button, Divider, Flex, IconButton, Input, InputGroup, InputLeftAddon, InputRightAddon, List, ListItem, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spacer, Table, Td, Text, Tr, useDisclosure, useToast } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { startChangeView, startChangeViewPago, startPagoEfectivo, startPagoTarjeta } from '../../../Store/PuntoDeVenta/Thunks';
import { IoAddCircle, IoCardOutline, IoCashOutline } from 'react-icons/io5';
import { useForm } from '../../../Hooks/useForm';
import { setPagoEfectivo } from '../../../Store/PuntoDeVenta/PuntoDeVenta';

const PagoView = () => {

    const dispatch = useDispatch();
    const { viewPago, faltaPorPagar} = useSelector(state => state.puntoDeVenta);

    const toast = useToast();

    const onClose = () => {
        dispatch(startChangeView('facturacion'));
    }

    const formData={
        efectivo: '',
        tarjeta: '',
        strFolio: '',
        strDigitos: ''
    }

    const {efectivo, tarjeta, strFolio, strDigitos, onInputChange} = useForm(formData);

    const pagoContinue=()=>{
        dispatch(startPagoEfectivo(efectivo));
        dispatch(startChangeView('facturacion'));
    }

    const pagoTarjetaContinue=()=>{
        const ftlTarjeta = parseFloat(tarjeta);
        if(tarjeta > faltaPorPagar){
            toast({title: 'El monto de pago es mayor al faltante por pagar.',status:'error',isClosable: true, position: 'top'})
        }else{
            const pagoConTarjeta ={strFolio, strDigitos}
            dispatch(startPagoTarjeta(tarjeta, pagoConTarjeta));
            dispatch(startChangeView('facturacion'));
        }
    }

    return (
        <Modal isOpen={true} onClose={onClose} size={"xl"}>
            <ModalOverlay>
                <ModalContent>
                    <ModalHeader>Pago de Factura</ModalHeader>
                    <Box width={"100%"} marginLeft={"20px"} padding={"10px"}>
                        <Flex>
                            <Text>Falta por pagar: $ {faltaPorPagar}</Text>
                        </Flex>
                    </Box>
                    <ModalCloseButton />
                    <Divider />
                    <ModalBody>
                        {(viewPago == 'pago') ?
                            <Box width={"100%"} display={"flex"} alignContent={"center"} justifyContent={"center"}>
                                <List>
                                    <ListItem>
                                        <Text>Efectivo:</Text>
                                        <InputGroup size={"lg"}>
                                            <InputLeftAddon><IoCashOutline color='gray' /></InputLeftAddon>
                                            <Input name="efectivo" value={efectivo} onChange={onInputChange} variant={"filled"} />
                                        </InputGroup>
                                    </ListItem>
                                    <ListItem>
                                        <Text>Tarjeta:</Text>
                                        <InputGroup size={"lg"}>
                                            <InputLeftAddon><IoCardOutline color='gray' /></InputLeftAddon>
                                            <Input variant={"filled"} disabled defaultValue={tarjeta}/>
                                            <InputRightAddon padding={"0px"}><IconButton onClick={() => dispatch(startChangeViewPago('pagoTarjeta'))}><IoAddCircle color='green' fontSize={"25px"} /></IconButton></InputRightAddon>
                                        </InputGroup>
                                    </ListItem>
                                </List>
                            </Box>
                            : (viewPago == 'pagoTarjeta') ?
                                <Box>
                                    <List>
                                        <ListItem>
                                            <Input variant={"filled"} placeholder='Folio de Pago' name='strFolio' value={strFolio} onChange={onInputChange} />
                                        </ListItem>
                                        <br />
                                        <ListItem>
                                            <Input variant={"filled"} placeholder='Ultimos 4 Digitos de la tarjeta' maxLength={"4"} name='strDigitos' value={strDigitos} onChange={onInputChange} />
                                        </ListItem>
                                        <br />
                                        <ListItem>
                                            <InputGroup>
                                            <InputLeftAddon>$</InputLeftAddon>
                                            <Input variant={"filled"} placeholder='Monto'  name='tarjeta' value={tarjeta} onChange={onInputChange}/>
                                            </InputGroup>
                                        </ListItem>
                                        <br/>
                                        <ListItem display={"flex"} alignContent={"center"} justifyContent={"center"}>
                                            <Button width={"50%"} colorScheme='teal' onClick={pagoTarjetaContinue}>Aceptar</Button>
                                        </ListItem>
                                    </List>
                                </Box>
                                : null
                        }
                    </ModalBody>
                    <ModalFooter>
                        {(viewPago != 'pago') ?
                            <Button colorScheme='blue' mr={2} onClick={()=>dispatch(startChangeViewPago('pago'))}>
                                Regresar
                            </Button>
                            :
                        <Button colorScheme='green' onClick={pagoContinue}>
                            Continuar
                        </Button>
                    }
                    </ModalFooter>
                </ModalContent>
            </ModalOverlay>
        </Modal>
    )
}

export default PagoView
