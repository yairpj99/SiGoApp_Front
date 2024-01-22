import { Box, Card, CardBody, CardHeader, Divider, Flex, Grid, GridItem, Icon, IconButton, Spacer, Table, TableContainer, Tbody, Td, Text, Thead, Tr } from '@chakra-ui/react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BsCalendarDateFill } from "react-icons/bs";
import { MdAttachMoney } from "react-icons/md";
import { FaCoins } from "react-icons/fa";
import { MdOutlinePointOfSale } from "react-icons/md";
import { IoCloseCircle } from 'react-icons/io5';
import { startSetView } from '../../../Store/Gestion/Thunks';

const DetalleRetiro = () => {
    const {detalleRetiro} = useSelector(state=>state.gestion);
    const dispatch = useDispatch();
  return (
    <Box width={"100%"}>
            <Text fontSize={"x-large"}>Detalle de retiro en efectivo</Text>
            <Divider borderColor={"black"} />
            <Box marginTop={"20px"}>
                <Card>
                    <CardHeader>
                        <Flex marginBottom={"10px"}>
                        <Text fontSize={"x-large"}>ID De Retiro: {detalleRetiro.id}</Text>
                        <Spacer/>
                        <IconButton onClick={()=>dispatch(startSetView("SearchRetirosDeEfectivo"))} colorScheme='red'><IoCloseCircle fontSize={"30px"}/></IconButton>
                        </Flex>
                        <Divider/>
                    </CardHeader>
                    <CardBody>
                        <Grid templateColumns='repeat(3, 1fr)' gap={6}>
                            <GridItem>
                                <Flex alignItems={"center"} alignContent={"center"}>
                                <BsCalendarDateFill color='gray' fontSize='30px'/>
                                <Text fontSize='large' marginLeft={"10px"}>{detalleRetiro.strFecha}</Text>
                                </Flex>
                            </GridItem>
                            <GridItem>
                                <Flex alignItems={"center"} alignContent={"center"}>
                                <MdAttachMoney color='gray' fontSize='30px'/>
                                <Text fontSize='large' marginLeft={"10px"}>{detalleRetiro.lngMontoRetiro}</Text>
                                </Flex>
                            </GridItem>
                            <GridItem>
                                <Flex alignItems={"center"} alignContent={"center"}>
                                <MdOutlinePointOfSale color='gray' fontSize='30px'/>
                                <Text fontSize='large' marginLeft={"10px"}>{detalleRetiro.noCaja}</Text>
                                </Flex>
                            </GridItem>
                        </Grid>
                        <Box marginTop={"20px"}>
                        <Divider/>
                        <TableContainer marginTop={"10px"}>
                            <Table size='sm'>
                                <Thead>
                                    <Tr>
                                        <Td>Tipo de Moneda</Td>
                                        <Td>Cantidad</Td>
                                        <Td>Total</Td>
                                        <Td>Tipo de Billete</Td>
                                        <Td>Cantidad</Td>
                                        <Td>Total</Td>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                <Tr>
                                    <Td fontWeight='bold'>1</Td>
                                    <Td>{detalleRetiro.lngModenasUno}</Td>
                                    <Td>{detalleRetiro.lngModenasUno*1}</Td>   
                                    <Td fontWeight='bold'>20</Td>
                                    <Td>{detalleRetiro.lngModenasVenite}</Td>
                                    <Td>{detalleRetiro.lngModenasVenite*20}</Td>     
                                </Tr>
                                <Tr>
                                    <Td fontWeight='bold'>2</Td>
                                    <Td>{detalleRetiro.lngModenasDos}</Td>
                                    <Td>{detalleRetiro.lngModenasDos*2}</Td>   
                                    <Td fontWeight='bold'>50</Td>
                                    <Td>{detalleRetiro.lngBilletesCincuenta}</Td>
                                    <Td>{detalleRetiro.lngBilletesCincuenta*50}</Td>     
                                </Tr>
                                <Tr>
                                    <Td fontWeight='bold'>5</Td>
                                    <Td>{detalleRetiro.lngModenasCinco}</Td>
                                    <Td>{detalleRetiro.lngModenasCinco*5}</Td>   
                                    <Td fontWeight='bold'>100</Td>
                                    <Td>{detalleRetiro.lngBilletesCien}</Td>
                                    <Td>{detalleRetiro.lngBilletesCien*100}</Td>     
                                </Tr>
                                <Tr>
                                    <Td fontWeight='bold'>10</Td>
                                    <Td>{detalleRetiro.lngModenasDiez}</Td>
                                    <Td>{detalleRetiro.lngModenasDiez*10}</Td>   
                                    <Td fontWeight='bold'>200</Td>
                                    <Td>{detalleRetiro.lngBilletesDoscientos}</Td>
                                    <Td>{detalleRetiro.lngBilletesDoscientos*200}</Td>     
                                </Tr>
                                <Tr>
                                    <Td></Td>
                                    <Td></Td>
                                    <Td></Td>   
                                    <Td fontWeight='bold'>500</Td>
                                    <Td>{detalleRetiro.lngBilletesQuinientos}</Td>
                                    <Td>{detalleRetiro.lngBilletesQuinientos*500}</Td>     
                                </Tr>
                                <Tr>
                                    <Td></Td>
                                    <Td></Td>
                                    <Td></Td>   
                                    <Td fontWeight='bold'>1000</Td>
                                    <Td>{detalleRetiro.lngBilletesMil}</Td>
                                    <Td>{detalleRetiro.lngBilletesMil*1000}</Td>     
                                </Tr>
                                </Tbody>
                            </Table>
                        </TableContainer>
                        </Box>
                    </CardBody>
                </Card>
            </Box>
        </Box>
  )
}

export default DetalleRetiro
