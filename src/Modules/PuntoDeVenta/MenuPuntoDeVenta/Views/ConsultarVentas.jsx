import { Box, Divider, Grid, GridItem, IconButton, Input, Select, Table, TableContainer, Tbody, Td, Text, Thead, Tr, useDisclosure, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { IoEye, IoEyeOffOutline, IoSearchCircle, IoTrash, IoTrashBinOutline } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'
import { startBuscarVentaPorFecha, startConsultarVentas, startDeleteVenta, startDetalleVenta } from '../../../../Store/PuntoDeVenta/Thunks'
import { useForm } from '../../../../Hooks/useForm'

const ConsultarVentas = () => {
    const { menu } = useSelector(state => state.puntoDeVenta);
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const toast = useToast();

    const formData={
        strFechaDeVenta: '',
        buscarPor: '',
        id: '',
    }

    const {strFechaDeVenta,buscarPor, id, onInputChange, formState}=useForm(formData);


    const consultar = async () => {
        setIsLoading(true);
        if(formState.buscarPor=='Fecha De Venta'){
            const resp = await dispatch(startBuscarVentaPorFecha(formState.strFechaDeVenta));
            if (!resp.ok) { toast({ title: 'Error', description: 'Error al realizar la consulta', position: 'top', status: 'error', isClosable: true }) }
        }else {
            const resp = await dispatch(startConsultarVentas());
            if(!resp.ok) { toast({ title: 'Error', description: 'Error al realizar la consulta', position: 'top', status: 'error', isClosable: true }) }
        }
        setIsLoading(false);
    }

    const RenderVentaRow = (venta, index) => (
        <Tr key={index}>
            <Td>{venta.id}</Td>
            <Td>{venta.noCaja}</Td>
            <Td>{venta.idUsuario}</Td>
            <Td>{venta.strFechaVenta}</Td>
            <Td>$ {venta.lngSubTotal}</Td>
            <Td>$ {venta.lngTotalFinal}</Td>
            <Td>$ {venta.lngPagoEfectivo}</Td>
            <Td>$ {venta.lngPagoTarjeta}</Td>
            <Td><IconButton colorScheme='twitter' size='xs' onClick={()=>dispatch(startDetalleVenta(venta))}><IoEye/></IconButton></Td>
            <Td><IconButton colorScheme='red' size='xs' onClick={()=>deleteRegistro(venta.id)}><IoTrash/></IconButton></Td>
        </Tr>
    );

    const deleteRegistro=async(id)=>{
        const resp = await dispatch(startDeleteVenta(id));
        if(resp.ok){
            toast({title: 'Operacion Exitosa', description:'El registro ha sido eliminado!!!', position: 'top', status:'success', isClosable: true});
        }else{
            toast({title: 'error', description: 'Error al realizar la operacion', position: 'top', status: 'error', isClosable: true})
        }

    }
    
    return (
        <Box>
            <Text>Consultar Ventas</Text>
            <Divider borderColor={"black"} />
            <Box padding={"20px"}>
                <Box width={"100%"} bgColor={"white"} padding={"10px"} borderRadius={"10px"}>
                    <Grid templateColumns='repeat(6, 1fr)' gap={6}>
                        <GridItem>
                            <Select placeholder='Buscar por' variant='filled' name="buscarPor" value={buscarPor} onChange={onInputChange}>
                                <option>Todas</option>
                                <option>Fecha De Venta</option>
                            </Select>
                        </GridItem>
                        {(buscarPor=='Fecha De Venta')?
                        <GridItem>
                            <Input type='date' placeholder='Fecha de Venta' variant='filled' name='strFechaDeVenta' value={strFechaDeVenta} onChange={onInputChange}/>
                        </GridItem>
                        :
                        null
                        }
                        <GridItem>
                            <IconButton colorScheme='teal' isLoading={isLoading} onClick={consultar}><IoSearchCircle fontSize={"30px"} /></IconButton>
                        </GridItem>
                    </Grid>
                </Box>
                {(menu.consultaVentas.length>0)?
                <TableContainer marginTop={"20px"} width={"100%"} bgColor={"white"} borderRadius={"10px"} style={{ overflowY: 'auto' }} maxHeight={"70vh"}>
                    <Table size='sm'>
                        <Thead bgColor={"#4A5568"} color={"white"}>
                            <Tr>
                                <Td>ID Venta</Td>
                                <Td>Caja</Td>
                                <Td>Usuario</Td>
                                <Td>Fecha</Td>
                                <Td>Sub. Total</Td>
                                <Td>Total Factura</Td>
                                <Td>Pago Efecitvo</Td>
                                <Td>Pago Tarjeta</Td>
                                <Td></Td>
                                <Td></Td>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {menu.consultaVentas.length > 0 ? (
                                Object.values(menu.consultaVentas).map((venta, index) => RenderVentaRow(venta, index))
                            ) : (
                                RenderVentaRow(menu.consultaVentas, 0)
                            )}
                        </Tbody>
                    </Table>
                </TableContainer>
                :null
                }
            </Box>
        </Box>
    )
}

export default ConsultarVentas
