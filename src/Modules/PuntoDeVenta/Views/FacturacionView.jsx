import React, { useState } from 'react'
import { AbsoluteCenter, Box, Button, CircularProgress, Divider, Flex, Grid, GridItem, Icon, IconButton, Input, InputAddon, InputGroup, InputLeftElement, InputRightElement, List, ListIcon, ListItem, Progress, SimpleGrid, Spacer, Spinner, Stack, Table, Td, Text, Tr, useToast } from '@chakra-ui/react'
import { CiBarcode } from "react-icons/ci";
import CardArticulo from '../Components/CardArticulo';
import { CgMenuGridR } from "react-icons/cg";
import { MdNavigateNext } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { startAddArticulo, startChangeView, startResetandClean, startVenta } from '../../../Store/PuntoDeVenta/Thunks';
import { RxUpdate } from "react-icons/rx";
import Swal from 'sweetalert2';
import TiketReport from '../../../Reports/TiketReport';

const FacturacionView = () => {

    const dispatch = useDispatch();
    const {articulosFacturacion, subTotal, totalFinal, faltaPorPagar, descuentos, descuento, cubierto, cambio, tarjeta, dataCaja, pagoEfecitivo}=useSelector(state=>state.puntoDeVenta)
    const [isLoading, setIsLoading]=useState(false);
    const [sku, setSku]=useState('');
    const toast = useToast();

    const handleChange = (e) => {
        setSku(e.target.value);
      };

    const handleKeyPress = async (event) => {
        if (event.key === 'Enter') {
            setIsLoading(true);
            const resp = await dispatch(startAddArticulo(sku));
            if(!resp){
                toast({title: "Error", description: `El SKU: ${sku} no existe!!!`, status:'error', isClosable: true, position:'top'})
            }
            setIsLoading(false);
            setSku('');
        }
    };

    const next=()=>{
        if(articulosFacturacion.length>0){
            dispatch(startChangeView('pago'));
        }else if(faltaPorPagar==0){
            toast({title: 'Error', description: 'No hay saldo pendiente por facturar', status: 'error', position: 'top', isClosable: true})
        }else{
            toast({title: 'Error', description: 'No hay articulos pendientes por pagar.', status: 'error', position: 'top', isClosable: true})
        }
    }

    const facturar=async()=>{
        dispatch(startChangeView('facturando'));
        const resp = await dispatch(startVenta());
        if(resp.ok){
            toast({description: `La venta ha sido registrada con exito con el folio: ${resp.id}`, status: 'success', position: 'top', isClosable: true});
            const tiket = TiketReport(articulosFacturacion, subTotal, totalFinal, descuento, cambio, tarjeta, pagoEfecitivo, dataCaja, resp);
            
        }else{
            toast({ title: 'Error', description: resp.error, status: 'error', position: 'top', isClosable: true,})
        }
        dispatch(startChangeView('facturacion'));            
    }

    const reset=()=>{
        if(cubierto==0){
        dispatch(startResetandClean());
        }else if(tarjeta>0){
            Swal.fire({icon: 'warning',title: 'Pago con tarjeta',text: `La venta cuenta con: $ ${tarjeta} cobrados con tarjeta. ¿Desea cancelar el pago?`,showCancelButton: true,cancelButtonColor: "#d33",cancelButtonText: 'Salir',confirmButtonText: "Cancelar pago con tarjeta"
              }).then((result) => {
                if (result.isConfirmed) {
                  Swal.fire({
                    title: 'Pago cancelado',
                    text: 'El pago con tarjeta ha sido cancelado',
                    icon: 'success'
                  });
                  dispatch(startResetandClean());
                }
              });
              
        }else{
            Swal.fire({icon: 'warning', title:'Advertencia', text: `Cuentas con $ ${pagoEfecitivo} aplicados. ¿Deseas continuar?`, showCancelButton: true,cancelButtonColor: "#d33", confirmButtonColor: "#3085d6", confirmButtonText: "Continuar", confirmButtonColor: 'green'})
            .then((result)=>{
                if(result.isConfirmed){
                dispatch(startResetandClean())
                }
            })
        }
    }

    return (
        <Box width="100%">
            <Text textAlign={"end"}>Apertura de Caja: {dataCaja.strFechaApertura}</Text>
            <Box width="100%" bgColor="white" borderRadius="5px" padding="10px">
                <Flex justify={"space-between"}>
                    <Stack direction={['column', 'row']} spacing='24px'>
                        <Box width={"300px"}>
                            <InputGroup>
                                <InputLeftElement>
                                    <CiBarcode fontSize={"30px"} />
                                </InputLeftElement>
                                <Input
                                    placeholder="SKU"
                                    variant="filled"
                                    name="sku"
                                    value={sku}
                                    onChange={handleChange}
                                    onKeyPress={handleKeyPress}
                                />
                            </InputGroup>
                        </Box>
                        {(isLoading)?
                        <Box display={"flex"} alignContent={"center"} justifyContent={"center"} alignItems={"center"}>
                            <Spinner size={"lg"} color='teal'/>
                        </Box>
                        :null
                        }
                    </Stack>
                    <Box>
                        <Button colorScheme='teal' onClick={()=>dispatch(startChangeView('menu'))} leftIcon={<CgMenuGridR fontSize={"30px"} />}>Menu de opciones</Button>
                        <IconButton marginLeft={"20px"} colorScheme='orange' onClick={reset}><RxUpdate/></IconButton>
                    </Box>
                </Flex>
            </Box>
            <Box display={"flex"} marginTop={"5px"}>
                <Box width={"70%"} bgColor={"#718096"} borderRadius="5px" padding="10px" height={"580px"} overflowY={"scroll"}>
                    <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>
                        {(articulosFacturacion.map((articulo, index)=>(
                        <CardArticulo key={index} data={articulo} index={index}/>
                        )))
                        }
                    </SimpleGrid>
                </Box>
                <Box marginLeft={"5px"} width={"30%"} bgColor={"#A0AEC0"} borderRadius="5px" padding="10px" overflowY={"scroll"}>
                    <Text textAlign={"end"}>Cant. {articulosFacturacion.length}</Text>
                    <Text>Sub. Total: </Text>
                    <Box width={"100%"} padding={"10px"} bgColor={"#718096"} borderRadius={"10px"}>
                        <Text textAlign={"end"} fontSize={"xx-large"} color={"white"}>$ {subTotal}</Text>
                    </Box>
                    <Text>Descuentos: </Text>
                    <Box width={"100%"} padding={"10px"} bgColor={"#718096"}borderRadius={"10px"}>
                        <Box>
                        {(descuentos.map((desucuento, index)=>(
                            <Box key={index}>
                                <Flex>
                                <Text>{desucuento.title}</Text>
                                <Spacer/>
                                <Text>-$ {desucuento.amount}</Text>
                                </Flex>
                            </Box>
                        )))}
                        </Box>
                        <Text textAlign={"end"} fontSize={"xx-large"} color={"white"} >-$ {descuento}</Text>
                    </Box>
                    <Text>Totales:</Text>
                    <Box width={"100%"} padding={"10px"} bgColor={"#718096"}borderRadius={"10px"}>
                        <Flex>
                            <Text fontSize={"x-large"}>Total Final:</Text>
                            <Spacer/>
                            <Text fontSize={"x-large"} color={"white"}>$ {totalFinal}</Text>
                        </Flex>
                        <Divider/>
                        <Flex>
                            <Text fontSize={"x-large"}>Cubierto:</Text>
                            <Spacer/>
                            <Text fontSize={"x-large"} color={"white"}>$ {cubierto}</Text>
                        </Flex>
                        <Divider/>
                        <Flex>
                            <Text fontSize={"x-large"}>Falta por Pagar:</Text>
                            <Spacer/>
                            <Text fontSize={"x-large"} color={"white"}>$ {faltaPorPagar}</Text>
                        </Flex>
                        <Divider/>
                        <Flex>
                            <Text fontSize={"x-large"}>Cambio:</Text>
                            <Spacer/>
                            <Text fontSize={"x-large"} color={"white"}>$ {cambio}</Text>
                        </Flex>
                    </Box>
                    <Box width={"100%"} marginTop={"10px"}>
                    <Button width={"100%"} size='lg' colorScheme='green' onClick={next} isDisabled={(faltaPorPagar>0)?false:true} rightIcon={<MdNavigateNext fontSize={"30px"}/>}>Continuar</Button>
                    </Box>
                    {(faltaPorPagar==0 && subTotal>0)?
                    <Box width={"100%"} marginTop={"10px"}>
                    <Button width={"100%"} size='lg' colorScheme='green' rightIcon={<MdNavigateNext fontSize={"30px"}/>} onClick={facturar}>Facturar</Button>
                    </Box>
                    :null
                    }
                </Box>
            </Box>
        </Box>
    )
}

export default FacturacionView;
