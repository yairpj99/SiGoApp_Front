import { Badge, Box, Card, CardBody, CardHeader, Divider, Flex, Heading, IconButton, List, ListItem, Spacer, Text, useToast } from '@chakra-ui/react'
import React from 'react'
import { FaTrashAlt } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { startDeleteCaja } from '../../../Store/PuntoDeVenta/Thunks';

const PointOfSaleComponent = ({ data }) => {

    const dispatch = useDispatch();
    const toast = useToast();

    const deletePointOfSale=async(noCaja)=>{
        try{
            const resp = await dispatch(startDeleteCaja(noCaja));
            if(!resp){
                toast({title: 'Caja cerrada', description: resp, position: 'top', isClosable: true, status: 'success'});
            }else{
                toast({title: 'Error', description: resp, position: 'top', isClosable: true, status: 'error'});
            }
        }catch(error){
            toast({title: 'Error', description: error, position: 'top', isClosable: true, status: 'error'})
        }
    }

    return (
        <Card>
            <CardHeader>
                <Flex><Spacer/>
                {(data.status)?
                <Badge colorScheme='green' variant='subtle'>ACTIVA</Badge>
                :
                <Badge colorScheme='red' variant='subtle'>INACTIVA</Badge>
                }
                </Flex>
                <Heading size='md'>Caja: {data.noCaja}</Heading>
                <Text>Apertura: {data.strFechaApertura}</Text>
                {(data.strFechaCierre)?
                <Text>Cierre: {data.strFechaCierre}</Text>
                :null
                }
            </CardHeader>
            <Divider />
            <CardBody>
                <List>
                    <ListItem>
                        <Flex>
                            <Text as='b'>Usuario:</Text>
                            <Spacer />
                            <Text>{data.idUser}</Text>
                        </Flex>
                    </ListItem>
                    <ListItem>
                        <Flex>
                            <Text as='b'>Fondo de Caja:</Text>
                            <Spacer />
                            <Text>$ {data.lngFondoDeCaja}</Text>
                        </Flex>
                    </ListItem>
                    <ListItem>
                        <Flex>
                            <Text as='b'>Ventas:</Text>
                            <Spacer />
                            <Text>$ {data.lngVentas}</Text>
                        </Flex>
                    </ListItem>
                    <ListItem>
                        <Flex>
                            <Text as='b'>Efectivo en Caja:</Text>
                            <Spacer />
                            <Text>$ {data.lngEfectivoEnCaja}</Text>
                        </Flex>
                    </ListItem>
                    <ListItem>
                        <Flex>
                            <Text as='b'>Total Cobrado:</Text>
                            <Spacer />
                            <Text>$ {data.lngTotalCobrado}</Text>
                        </Flex>
                    </ListItem>
                </List>
                <Flex marginTop={"10px"}>
                    <Spacer/>
                    <IconButton onClick={()=>deletePointOfSale(data.noCaja)} colorScheme='red'><FaTrashAlt color='white'/></IconButton>
                </Flex>
            </CardBody>
        </Card>
    )
}

export default PointOfSaleComponent
