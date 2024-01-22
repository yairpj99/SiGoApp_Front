import { Box, Grid, GridItem, IconButton, Input } from '@chakra-ui/react'
import React, { useState } from 'react'
import { IoSearchCircle } from 'react-icons/io5'
import { useDispatch } from 'react-redux'
import { startSerInventariosBySku } from '../../../Store/Inventrios/Thunks'

const Buscador = () => {
  const dispatch=useDispatch();
  const [sku, setSku]=useState('');
  return (
    <Box width={"100%"} bgColor={"white"} borderRadius={"10px"} padding={"10px"}>
      <Grid templateColumns='repeat(6, 1fr)' gap={6}>
      <Input variant='filled' placeholder='SKU' name="sku" value={sku} onChange={(event) => setSku(event.target.value)} />
        <GridItem>
          <IconButton onClick={()=>dispatch(startSerInventariosBySku(sku))} colorScheme='teal'><IoSearchCircle fontSize={"30px"} /></IconButton>
        </GridItem>
      </Grid>
    </Box>
  )
}

export default Buscador
