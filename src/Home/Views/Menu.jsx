import { Box, Grid } from '@chakra-ui/react'
import React from 'react'
import ModulesOptionButton from '../Components/ModulesOptionButton'
import { MdPointOfSale } from "react-icons/md";
import { IoIosSettings } from "react-icons/io";
import { FaBoxesStacked } from "react-icons/fa6";
import { FaBoxesPacking } from "react-icons/fa6";
import { useSelector } from 'react-redux';

const Menu = () => {

  const {data} = useSelector(state=>state.auth); 

  return (
    <Box width={"100%"} display={"block"}>
        <Grid templateColumns='repeat(5, 0.5fr)' gap={6}>
        {(data.strAcceso=='total')?
        <>
        <ModulesOptionButton name="Punto de Venta" color="teal" onNavigate="/pdv" icon={<MdPointOfSale fontSize={"100px"}/>}/>
        <ModulesOptionButton name="Gestion de Sistema" color="telegram" onNavigate="/gestion" icon={<IoIosSettings fontSize={"100px"}/>}/>
        <ModulesOptionButton name="Inventario" color="purple" onNavigate="/inventarios" icon={<FaBoxesStacked fontSize={"100px"}/>}/>
        <ModulesOptionButton name="Gestion de Inventarios" color="pink" onNavigate="/gestion/inventarios" icon={<FaBoxesPacking fontSize={"100px"}/>}/>
        </>
        :(data.strAcceso=='ventas')?
        <>
        <ModulesOptionButton name="Punto de Venta" color="teal" onNavigate="/pdv" icon={<MdPointOfSale fontSize={"100px"}/>}/>
        <ModulesOptionButton name="Inventario" color="purple" onNavigate="/inventarios" icon={<FaBoxesStacked fontSize={"100px"}/>}/>
        </>
        :null
        }
        </Grid>
    </Box>
  )
}

export default Menu
