import { Box, Divider, Flex, List, ListIcon, ListItem, Skeleton, Spacer, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { IoIosCash } from "react-icons/io";
import { FaCashRegister } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { startSetDataCaja } from '../../../../Store/PuntoDeVenta/Thunks';
import { IoIosCard } from "react-icons/io";

const InfoPdvView = () => {
    const {dataCaja} = useSelector(state=>state.puntoDeVenta);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

    useEffect(()=>{
        setIsLoading(true);
        dispatch(startSetDataCaja());
        setIsLoading(false);
    },[]);

  return (
    <Box width={"100%"} bgColor={"#E6E6E6"} padding={"20px"}>
        <Flex justifyContent={"center"}>
        {(isLoading)?(
        <>    
        <Skeleton height={"205px"} width={"30%"}/>
        <Spacer/>
        <Skeleton height={"205px"} width={"30%"}/>
        <Spacer/>
        <Skeleton height={"205px"} width={"30%"}/>
        </>
        ):(
        <>
        <Box width={"30%"} bgColor={"blue.600"} borderRadius={"10px"} padding={"10px"} boxShadow={"rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;"}> 
            <Text fontSize='2xl' textAlign={"center"} color={"white"}>CAJA {dataCaja.noCaja}</Text>
            <Divider borderColor={"white"}/>
            <Box padding={"30px"}>
                <List>
                    <ListItem fontSize={"20px"} color={"white"}>
                        <ListIcon as={IoIosCash} fontSize={"30px"} color={"white"}/>
                        Fondo de Caja: $ {dataCaja.lngFondoDeCaja}
                    </ListItem>
                    <br/>
                    <ListItem fontSize={"20px"} color={"white"}>
                        <ListIcon as={FaCashRegister} fontSize={"30px"} color={"white"}/>
                        Efectivo en Caja: $ {dataCaja.lngEfectivoEnCaja}
                    </ListItem>
                </List>
            </Box>
        </Box> 
        <Spacer/>
        <Box width={"30%"} bgColor={"blue.600"} borderRadius={"10px"} padding={"10px"} boxShadow={"rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;"}> 
            <Text fontSize='2xl' textAlign={"center"} color={"white"}>TOTAL COBRADO</Text>
            <Divider borderColor={"white"}/>
            <Box padding={"30px"}>
                <List>
                    <ListItem fontSize={"20px"} color={"white"}>
                        <ListIcon as={IoIosCash} fontSize={"30px"} color={"white"}/>
                        Efectivo: $ {dataCaja.lngEfectivo}
                    </ListItem>
                    <br/>
                    <ListItem fontSize={"20px"} color={"white"}>
                        <ListIcon as={IoIosCard} fontSize={"30px"} color={"white"}/>
                        Tarjeta: $ {dataCaja.lngTarjeta}
                    </ListItem>
                </List>
            </Box>
        </Box>
        <Spacer/>
        <Box width={"30%"} bgColor={"blue.600"} borderRadius={"10px"} padding={"10px"} boxShadow={"rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;"}> 
            <Text fontSize='2xl' textAlign={"center"} color={"white"}>VENTAS</Text>
            <Divider borderColor={"white"}/>
            <Box padding={"30px"}>
                <List>
                    <ListItem fontSize={"20px"} color={"white"}>
                        <ListIcon as={IoIosCash} fontSize={"30px"} color={"white"}/>
                        Articulos Vendidos: {dataCaja.lngArticulosVendidos}
                    </ListItem>
                    <br/>
                    <ListItem fontSize={"20px"} color={"white"}>
                        <ListIcon as={FaCashRegister} fontSize={"30px"} color={"white"}/>
                        Ventas Totales: $ {dataCaja.lngVentas}
                    </ListItem>
                </List>
            </Box>
        </Box>
        </>
        )}   
        </Flex>
    </Box>
  )
}

export default InfoPdvView
