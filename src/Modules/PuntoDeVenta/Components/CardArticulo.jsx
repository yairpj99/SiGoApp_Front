import React from 'react';
import { Card, CardHeader, Heading, Text, Flex, Box, IconButton, ScaleFade, Badge, Spacer } from '@chakra-ui/react';
import { MdDelete } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { startDeleteArticulo } from '../../../Store/PuntoDeVenta/Thunks';

const CardArticulo = ({data, index}) => {
  const dispatch = useDispatch();
  const {descuentos, cubierto}=useSelector(state=>state.puntoDeVenta);
  return (
    <ScaleFade initialScale={0.9} in={true}>
    <Card>
    <Flex padding={"5px"}>
          <Spacer/>
          {(data.lngCantidad>0)?
          <Badge fontSize='0.5em' variant='outline' colorScheme='green'>Cantidad en Inventario: {data.lngCantidad}</Badge>
          :
          <Badge fontSize='0.5em' variant='outline' colorScheme='red'>Sin Existencias</Badge>
          }
        </Flex>
      <CardHeader>
        <Heading fontSize="lg" mb="2">
          {data.strDescripcion}
        </Heading>
        <Text fontSize="sm" color="gray.500" mb="2">
          {data.strMarca}
        </Text>

        <Flex justify={"space-between"}>
        <Text fontSize="sm" color="gray.500" mb="2">
          Talla: {data.strTalla}
        </Text>
        <Text fontSize="sm" color="gray.500" mb="2">
          SKU: {data.id}
        </Text>
        </Flex>


        <Text fontSize="sm" color="gray.500" mb="2">
          Categoria: {data.strCategoria}
        </Text>


        {/* PRECIO */}
        <Flex justify="space-between">
          <Box color={"#2F855A"}>
            <Text fontSize="sm" fontWeight="bold">
             + Precio: 
            </Text>
          </Box>
          <Box>
            <Text fontSize="sm" fontWeight="bold">
              $ {data.lngPrecioUnitario}
            </Text>
          </Box>
          </Flex>
                  {/* DESCUENTOS */}
          <Flex justify="space-between">
          <Box color={"#C53030"}>
            <Text fontSize="sm" fontWeight="bold">
             - Descuento: 
            </Text>
          </Box>
          <Box>
            <Text fontSize="sm" fontWeight="bold">
              $ {data.lngDescuentoDirecto}
            </Text>
          </Box>
          </Flex>
                 {/* IMPORTE A FACTURA */}
          <Flex justify="space-between">
          <Box color={"#276749"}>
            <Text fontSize="sm" fontWeight="bold">
            = Importe: 
            </Text>
          </Box>
          <Box>
            <Text fontSize="sm" fontWeight="bold">
              $ {data.lngImporte}
            </Text>
          </Box>
        </Flex>
        <Box marginTop={"10px"}>
            <Flex justify={"space-between"}>
            {(descuentos.length==0 && cubierto==0)?
            <IconButton colorScheme='red' onClick={() => dispatch(startDeleteArticulo(index))}>
                <MdDelete fontSize={"20px"}/>
            </IconButton>
            :null
            }
            </Flex>
        </Box>
      </CardHeader>
    </Card>
    </ScaleFade>
  );
};

export default CardArticulo;
