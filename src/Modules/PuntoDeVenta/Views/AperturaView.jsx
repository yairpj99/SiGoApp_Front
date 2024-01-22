import { Box, Button, FormControl, FormErrorMessage, FormHelperText, FormLabel, Input, InputGroup, InputLeftAddon, Text, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { CiMoneyBill } from 'react-icons/ci'
import { IoInformationCircle } from 'react-icons/io5'
import { useDispatch } from 'react-redux'
import { startAperturaCaja } from '../../../Store/PuntoDeVenta/Thunks'

const AperturaView = () => {
    const [input, setInput] = useState(0);
    const dispatch = useDispatch();
    const handleInputChange = (e) => setInput(e.target.value)
    const isError = input === '';
    const toast = useToast();

    const handleAperturaCaja=async()=>{
        try{
            await dispatch(startAperturaCaja(input));
        }catch(error){
            toast({title: 'Error', description: 'Error al abrir la caja.', variant: 'error', isClosable: true});
        }
    }
    return (
        <Box width={"100%"} padding={"20px"}>
            <Box width={"100%"} display={"flex"} alignContent={"center"} justifyContent={"center"} alignItems={"center"}>
                <Box width={"60vh"} borderRadius={"15px"} bgColor={"white"}>
                    <Box width={"100%"} display={"flex"} alignContent={"center"} justifyContent={"center"} alignItems={"center"} padding={"10px"}>
                        <IoInformationCircle color='teal' fontSize={"100px"} />
                    </Box>
                    <Text textAlign={"center"} color={"teal"} fontSize={"xl"}>APERTURA DE CAJA</Text>
                    <Box width={"100%"} padding={"20px"}>
                        <Text textAlign={"center"}>No cuenta con una caja abierta con este usuario. ¿Desea abrir una ahora?</Text>
                    </Box>
                    <Box padding={"20px"}>
                        <FormControl isInvalid={isError}>
                            <FormLabel>Fondo de Caja</FormLabel>
                            <InputGroup>
                                <InputLeftAddon><CiMoneyBill fontSize={"25px"} /></InputLeftAddon>
                                <Input type='number' value={input} onChange={handleInputChange} />
                            </InputGroup>
                            {!isError ? (
                                <FormHelperText>
                                    Ingrese un valor mayor a 0
                                </FormHelperText>
                            ) : (
                                <FormErrorMessage>Debe ingresar una valor!!!</FormErrorMessage>
                            )}
                        </FormControl>
                    </Box>
                    <Box padding={"20px"} display={"flex"} alignContent={"center"} alignItems={"center"} justifyContent={"center"}>
                        <Button colorScheme='green' onClick={handleAperturaCaja}>ABRIR CAJA</Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default AperturaView
