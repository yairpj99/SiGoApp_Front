import { Box, Grid, GridItem, Input, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useForm } from '../../../Hooks/useForm'
import { useDispatch } from 'react-redux'
import { startAgregarUnArticuloAlInventario } from '../../../Store/Inventrios/Thunks'

const AgregarArticulos = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading]=useState(false);
  const formData={
    sku: '',
  }
  const toast = useToast();

  const {sku, onInputChange} = useForm(formData);

  const handleKeyPress = async (event) => {
    if (event.key === 'Enter') {
        setIsLoading(true);
        try{
        const resp = await dispatch(startAgregarUnArticuloAlInventario(sku));
        if(!resp.ok){
          toast({title: 'Error', description: 'No se encontro el sku '+sku+'.', position: 'top', isClosable: true, status: 'error'});
        }else{
          toast({title: 'Inventario Actualizado', description: 'Se ha agregado un articulo al inventario', position: 'top', isClosable: true, status: 'success'})
        }
        }catch(error){
          console.log(error);
        }
        setIsLoading(false);
    }
};


  return (
    <Box width={"100%"} bgColor={"WHITE"} padding={"10px"} borderRadius={"10px"}>
        <Grid templateColumns='repeat(6, 1fr)' gap={6}>
            <GridItem>
                <Input placeholder='SKU' variant={"filled"} name="sku" value={sku} onChange={onInputChange} onKeyPress={handleKeyPress}/>
            </GridItem>
        </Grid>
    </Box>
  )
}

export default AgregarArticulos
