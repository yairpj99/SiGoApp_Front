import { Box, Grid, GridItem, IconButton, Input, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { IoSearchCircle } from 'react-icons/io5'
import { useForm } from '../../../Hooks/useForm'
import { useDispatch } from 'react-redux'
import { startSKUConsult } from '../../../Store/Inventrios/Thunks'

const BuscadorSKU = () => {
    const dispatch = useDispatch();
    const toast = useToast();
    const [isLoading, setIsLoading]=useState(false);
  
    const formData={
      sku: ''
    }
  
    const {sku, onInputChange} = useForm(formData);
  
    const consultSKU=async()=>{
      setIsLoading(true);
      const resp = await dispatch(startSKUConsult(sku));
      if(!resp.ok){
        toast({title: 'Error', description: 'El sku ingresado no existe!!!', position: 'top', status: 'error', isClosable: true});
      }
      setIsLoading(false);
    }
  return (
    <Box  width={"100%"} bgColor={"WHITE"} padding={"10px"} borderRadius={"10px"}>
      <Grid templateColumns='repeat(6, 1fr)' gap={6}>
        <GridItem>
          <Input placeholder='SKU' variant={"filled"} name="sku" value={sku} onChange={onInputChange}/>
        </GridItem>
        <GridItem>
          <IconButton colorScheme='teal' onClick={consultSKU} isDisabled={(sku=='')?true:false} isLoading={isLoading}><IoSearchCircle fontSize={"30px"}/></IconButton>
        </GridItem>
      </Grid>
    </Box>
  )
}

export default BuscadorSKU
