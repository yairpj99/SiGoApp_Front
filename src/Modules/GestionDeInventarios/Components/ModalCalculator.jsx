import { Box, Button, Divider, Grid, GridItem, Input, InputGroup, InputLeftAddon, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { FaCalculator, FaSave } from 'react-icons/fa'
import { useForm } from '../../../Hooks/useForm'

const ModalCalculator = ({ onClose, isOpen }) => {
    const [precioUnitario, setPrecioUnitario]=useState(0);

    const formData={
        precio: 0,
        gagancia: 0,
    }

    const {precio, gagancia, onInputChange}=useForm(formData);

    const onPrecioUnitarioChange=()=>{
        setPrecioUnitario(parseInt(precio*(1+(gagancia/100))));
    }

    return (
        <>
            <Modal onClose={onClose} size={"xl"} isOpen={isOpen}>
                <ModalOverlay>
                    <ModalContent>
                        <ModalHeader>Calcular precio unitario</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Box padding={"10px"}>
                                <Stack gap={3}>
                                    <InputGroup>
                                        <InputLeftAddon>Precio Unitario: $</InputLeftAddon>
                                        <Input variant={"filled"} placeholder='Precio' name="precio" value={precio} onChange={onInputChange}/>
                                    </InputGroup>
                                    <InputGroup>
                                        <InputLeftAddon>Ganancia: %</InputLeftAddon>
                                        <Input variant={"filled"} placeholder='Ganancia' name="gagancia" value={gagancia} onChange={onInputChange}/>
                                    </InputGroup>
                                    <InputGroup>
                                        <InputLeftAddon>Precio Unitario: $</InputLeftAddon>
                                        <Input variant={"filled"} name='precioUnitario' value={precioUnitario} isDisabled/>
                                    </InputGroup>
                                </Stack>
                            </Box>
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme='teal' onClick={onPrecioUnitarioChange} leftIcon={<FaCalculator />}>Calcular</Button>
                        </ModalFooter>
                    </ModalContent>
                </ModalOverlay>
            </Modal>
        </>
    )
}

export default ModalCalculator
