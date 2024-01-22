import { Box, Button, Flex, List, ListItem, Skeleton, Spacer, Spinner, Stack, Table, TableContainer, Tbody, Td, Text, Thead, Tr } from '@chakra-ui/react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startSetMenuView } from '../../../../Store/PuntoDeVenta/Thunks';

const DetalleVenta = () => {
    const {menu} = useSelector(state=>state.puntoDeVenta);
    const dispatch = useDispatch();

    const renderArticulo = (articulo, index) => (
        <Tr key={index}>
            <Td>{articulo.id}</Td>
            <Td>{articulo.strDescripcion}</Td>
            <Td>{articulo.strMarca}</Td>
            <Td>{articulo.strCategoria}</Td>
            <Td>{articulo.strTalla}</Td>
            <Td>{articulo.lngPrecioUnitario}</Td>
            <Td>{articulo.lngDescuentoDirecto}</Td>
            <Td>{articulo.lngDescuentoDirecto}</Td>
        </Tr>
    );
  return (
    <Box width={"100%"} padding={"20px"}>
            <Table size='sm'>
            <Thead bgColor={"blue.400"} color={"white"}>
                <Tr>
                    <Td color={"black"} ><strong>ID Venta: </strong></Td>
                    <Td>{menu.detalleVenta.id}</Td>
                    <Td color={"black"} ><strong>Fecha de Venta: </strong></Td>
                    <Td>{menu.detalleVenta.strFechaVenta}</Td>
                    <Td color={"black"} ><strong>Total de la Factura: </strong></Td>
                    <Td>$ {menu.detalleVenta.lngTotalFinal}</Td>
                </Tr>
            </Thead>
            </Table>
            <br/>
            <Box>
                {(!menu.isLoading)?
                <Table size='sm'>
                    <Thead bgColor={"blue.600"} color={"white"}> 
                        <Tr>
                            <Td>SKU</Td>
                            <Td>Descripcion</Td>
                            <Td>Marca</Td>
                            <Td>Categoria</Td>
                            <Td>Talla</Td>
                            <Td>Precio Unitario</Td>
                            <Td>Descuento Directo</Td>
                            <Td>Importe</Td>
                        </Tr>
                    </Thead>
                    <Tbody bgColor={"gray.300"}>
                        {menu.detalleArticulos.length > 0 ? (
                                Object.values(menu.detalleArticulos).map((articulo, index) => renderArticulo(articulo, index))
                            ) : (
                                RenderVentaRow(menu.detalleArticulos, 0)
                            )}
                    </Tbody>
                </Table>
                :
                <Stack>
                <Skeleton height='20px' />
                <Skeleton height='20px' />
                <Skeleton height='20px' />
                </Stack>
                }
            </Box>
            <Box width={"100%"} marginTop={"20px"}>
                <Flex>
                <List width={"20%"} bgColor={"gray.400"} padding={"10px"}>
                        <ListItem><Flex><Text>Pago en Efectivo:</Text><Spacer/>$ {menu.detalleVenta.lngPagoEfectivo}</Flex></ListItem>
                        <ListItem><Flex><Text>Pago con Tarjeta:</Text><Spacer/>$ {menu.detalleVenta.lngPagoTarjeta}</Flex></ListItem>
                    </List>
                    <Spacer/>
                    <List width={"20%"} bgColor={"gray.300"} padding={"10px"}>
                        <ListItem><Flex><Text>Sub. Total:</Text><Spacer/>$ {menu.detalleVenta.lngSubTotal}</Flex></ListItem>
                        <ListItem><Flex><Text>Descuento Directo:</Text><Spacer/>$ {menu.detalleVenta.lngDescuento}</Flex></ListItem>
                        <ListItem><Flex><Text>Total Final:</Text><Spacer/>$ {menu.detalleVenta.lngTotalFinal}</Flex></ListItem>
                    </List>
                </Flex>
            </Box>
            <Box width={"100"} marginTop={"20px"}>
                <Flex>
                    <Spacer/>
                    <Button colorScheme='red' onClick={()=>dispatch(startSetMenuView("ventas"))}>Regresar</Button>
                </Flex>

            </Box>
    </Box>
  )
}

export default DetalleVenta
