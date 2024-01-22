import { Box, Divider, Grid, GridItem, IconButton, Input, Text } from '@chakra-ui/react'
import React from 'react'
import { IoSearchCircle } from 'react-icons/io5'
import Buscador from '../Components/Buscador'
import SkuDetail from '../Components/SkuDetail'

const EditarSkuView = () => {
    return (
        <Box>
            <Text fontSize={"x-large"}>EDITAR SKU</Text>
            <Divider borderColor={"black"} />
            <br/>
            <Buscador/>
            <br/>
            <SkuDetail/>
        </Box>    
    )
}

export default EditarSkuView
