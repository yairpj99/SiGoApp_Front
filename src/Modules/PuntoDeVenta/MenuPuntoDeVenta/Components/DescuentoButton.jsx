import { Box, Button, ButtonGroup, Flex, IconButton, Text, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { MdOutlineAttachMoney } from "react-icons/md";
import { TbDiscount } from "react-icons/tb";
import { useDispatch, useSelector } from 'react-redux';
import { addDescuento } from '../../../../Store/PuntoDeVenta/Thunks';

const DescuentoButton = ({title, icon, amount}) => {
  const [isActive, setActive]=useState(false);
  const {subTotal, descuentos} = useSelector(state=>state.puntoDeVenta);
  const dispatch = useDispatch();

  useEffect(() => {
    const hasDuplicate = descuentos.some((desc) => desc.title === title);
    setActive(hasDuplicate);
  }, []);
  const descuento=async()=>{
    const descuento={active: true, title: 'Descuento Mayoreo', amount: parseInt(subTotal*0.1)}
    await dispatch(addDescuento(descuento));
  }
  return (
    <div>
        <IconButton width={"180px"} colorScheme='orange' height={"100px"} onClick={descuento} isDisabled={isActive}>
          <Flex direction="column" align="start">
            <Flex>
            {(icon=='%')?
              <TbDiscount fontSize={"50px"}/>
              :(icon=='$')?
              <MdOutlineAttachMoney fontSize={"50px"}/>
              :null
            }  
              <Box display={"flex"} alignContent={"center"} justifyContent={"center"} alignItems={"center"} verticalAlign={"center"}>
                <Text fontSize={"25px"}>{amount}</Text>
              </Box>
            </Flex>
            <br/>
            <Text>{title}</Text>
          </Flex>
        </IconButton>
    </div>
  )
}

export default DescuentoButton
