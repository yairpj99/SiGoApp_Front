import { Box, Button, Divider, Flex, Grid, GridItem, IconButton, Input, InputAddon, InputGroup, InputLeftAddon, InputRightAddon, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Select, Spacer, Stack, Text, useDisclosure, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { FaAudioDescription, FaCalculator, FaPrint } from "react-icons/fa";
import { useForm } from '../../../Hooks/useForm';
import { useDispatch } from 'react-redux';
import { startNewArticulo } from '../../../Store/Inventrios/Thunks';
import ModalCalculator from '../Components/ModalCalculator';
import ReactPDF, { PDFViewer } from '@react-pdf/renderer';
import EtiquetaSku from '../../../Reports/EtiquetaSKU';

const GenerarSkuView = () => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const toast = useToast();
    const [pdfUrl, setPdfUrl] = useState(null);
    const [skuGenerado, setSkuGenerado]=useState('');
    const [formStateSave, setFormStateSave]=useState({});
    const { isOpen, onOpen, onClose } = useDisclosure()

    const formData = {
        strDescripcion: '',
        strMarca: '',
        strCategoria: '',
        strTalla: '',
        lngPrecioUnitario: 0,
        lngDescuentoDirecto: 0,
        strAlmacen: '',
        lngCantidad: 0,
    }

    const { strDescripcion, strMarca, strCategoria, strTalla, lngPrecioUnitario, lngDescuentoDirecto, strAlmacen, lngCantidad, formState, onInputChange, handleInputChangeToUpperCase, onResetForm } = useForm(formData);


    const sendInfo = async () => {
        setIsLoading(true);
        const resp = await dispatch(startNewArticulo(formState));
        if (resp != false) {
            toast({ title: `Informacion enviada con exito`, description: `El SKU del articulo es el: ${resp}`, position: 'top', isClosable: true, status: 'success' })
            setSkuGenerado(resp);
            setFormStateSave(formState);
        }
        setIsLoading(false);
        onResetForm();
    }
    

    return (
        <Flex direction="row">
            <Box width={"50%"} bgColor={"white"} padding={"10px"} borderRadius={"15px"} height={"72vh"}>
                <ModalCalculator onClose={onClose} isOpen={isOpen} />
                <Box width={"100%"}>
                    <Text fontSize='25px'>GENERAR NUEVO SKU</Text>
                    <Divider borderColor={"black"} />
                    <Box width={"100%"} padding={"10px"}>
                        <Grid templateColumns='repeat(1, 1fr)' gap={1}>
                            <GridItem>
                                <InputGroup>
                                    <InputLeftAddon>Descripcion:</InputLeftAddon>
                                    <Input variant={"filled"} name="strDescripcion" value={strDescripcion} onChange={handleInputChangeToUpperCase} />
                                </InputGroup>
                            </GridItem>
                            <GridItem>
                                <InputGroup>
                                    <InputLeftAddon>Marca:</InputLeftAddon>
                                    <Input variant={"filled"} name="strMarca" value={strMarca} onChange={handleInputChangeToUpperCase} />
                                </InputGroup>
                            </GridItem>
                            <GridItem>
                                <InputGroup>
                                    <InputLeftAddon>Categoria:</InputLeftAddon>
                                    <Select variant={"filled"} placeholder='Seleccione una opcion' name="strCategoria" value={strCategoria} onChange={handleInputChangeToUpperCase}>
                                        <option>DAMAS</option>
                                        <option>CABALLEROS</option>
                                        <option>ACCESORIOS</option>
                                        <option>NIÑOS</option>
                                        <option>NIÑAS</option>
                                        <option>TELEFONIA</option>
                                        <option>ACCESORIOS TELEFONIA</option>
                                    </Select>
                                </InputGroup>
                            </GridItem>
                        </Grid>
                        <br />
                        <Grid templateColumns='repeat(1, 1fr)' gap={4}>
                            <GridItem>
                                <InputGroup>
                                    <InputLeftAddon>Talla:</InputLeftAddon>
                                    <Input variant={"filled"} name="strTalla" value={strTalla} onChange={handleInputChangeToUpperCase} />
                                </InputGroup>
                            </GridItem>
                            <GridItem>
                                <InputGroup>
                                    <InputLeftAddon>Cantidad Inicial:</InputLeftAddon>
                                    <Input variant={"filled"} type='number' name="lngCantidad" value={lngCantidad} onChange={onInputChange} />
                                </InputGroup>
                            </GridItem>
                            <GridItem>
                                <InputGroup width={"350px"}>
                                    <InputLeftAddon>Precio Unitario:</InputLeftAddon>
                                    <Input variant={"filled"} type='number' name="lngPrecioUnitario" value={lngPrecioUnitario} onChange={onInputChange} />
                                    <IconButton marginLeft={"10px"} colorScheme='blue' onClick={onOpen}><FaCalculator /></IconButton>
                                </InputGroup>
                            </GridItem>
                            <GridItem>
                                <InputGroup>
                                    <InputLeftAddon>Descuento:</InputLeftAddon>
                                    <Input variant={"filled"} type='number' name="lngDescuentoDirecto" value={lngDescuentoDirecto} onChange={onInputChange} />
                                </InputGroup>
                            </GridItem>
                        </Grid>
                        <br />
                        <Grid templateColumns='repeat(1, 1fr)' gap={4}>
                            <GridItem>
                                <InputGroup>
                                    <InputLeftAddon>Almacen:</InputLeftAddon>
                                    <Select variant={"filled"} placeholder='Seleccione una opcion' name="strAlmacen" value={strAlmacen} onChange={handleInputChangeToUpperCase}>
                                        <option>SAN MIGUEL EL ALTO</option>
                                    </Select>
                                </InputGroup>
                            </GridItem>
                        </Grid>
                        <br />
                        <Box width={"100%"}>
                            <Flex>
                                <Spacer />
                                <Stack direction={['column', 'row']} spacing='24px'>
                                    <Button colorScheme='green' onClick={sendInfo} isLoading={isLoading}>Generar SKU</Button>
                                </Stack>
                            </Flex>
                        </Box>
                    </Box>
                </Box>
            </Box>

        <Box width="100%" bgColor="white" padding="10px" borderRadius="15px" marginLeft={"10px"} height={"72vh"}>
        <Text fontSize="25px">ETIQUETA</Text>
        <Divider borderColor="black" />
        <Box padding={"10px"}>
            {(skuGenerado!="")?
            <PDFViewer width={"100%"} height={"400px"}>
            <EtiquetaSku sku={skuGenerado} formStateSave={formStateSave} />
            </PDFViewer>
            :null
            }
        </Box>    
      </Box>
    </Flex>
    )
}

export default GenerarSkuView
