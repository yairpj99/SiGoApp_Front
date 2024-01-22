import React, { useState } from 'react'
import { Box, Grid, GridItem, IconButton, Input, Select } from '@chakra-ui/react'
import { useForm } from '../../../Hooks/useForm'
import { IoSearchCircle } from 'react-icons/io5'
import { startSerInventariosByCategoria, startSerInventariosByMarca, startSerInventariosBySku, startSetInventarios } from '../../../Store/Inventrios/Thunks'
import { useDispatch } from 'react-redux'
const Buscador = () => {
  const formData = {
    consultaPor: '',
    sku: '',
    strCategoria: '',
    strMarca: '',
  }

  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const { consultaPor, sku, strCategoria, strMarca, onInputChange, handleInputChangeToUpperCase } = useForm(formData);

  const consultarInventarios = async () => {
    setIsLoading(true);
    if (consultaPor == "Todos") {
      const resp = await dispatch(startSetInventarios());
    }else if (consultaPor == "SKU") {
      const resp = await dispatch(startSerInventariosBySku(sku));
    }else if (consultaPor == "Categoria"){
      const resp = await dispatch(startSerInventariosByCategoria(strCategoria));
    }else if (consultaPor == "Marca"){
      const resp = await dispatch(startSerInventariosByMarca(strMarca));
    }
    setIsLoading(false);
  }
  return (
    <Box width={"100%"} bgColor={"WHITE"} padding={"10px"} borderRadius={"10px"}>
      <Grid templateColumns='repeat(6, 1fr)' gap={6}>
        <GridItem>
          <Select placeholder='Buscar por' variant='filled' name='consultaPor' value={consultaPor} onChange={onInputChange}>
            <option>Todos</option>
            <option>SKU</option>
            <option>Categoria</option>
            <option>Marca</option>
          </Select>
        </GridItem>
        {(consultaPor == "SKU") ?
          <GridItem>
            <Input placeholder='SKU' variant='filled' name="sku" value={sku} onChange={onInputChange} />
          </GridItem>
          : null
        }
        {(consultaPor == "Categoria") ?
          <GridItem>
            <Select placeholder='Categoria' variant='filled' name="strCategoria" value={strCategoria} onChange={onInputChange}>
              <option>DAMAS</option>
              <option>CABALLEROS</option>
              <option>ACCESORIOS</option>
              <option>NIÑOS</option>
              <option>NIÑAS</option>
              <option>TELEFONIA</option>
              <option>ACCESORIOS TELEFONIA</option>
            </Select>
          </GridItem>
          : null
        }
        {(consultaPor == "Marca") ?
          <GridItem>
            <Input placeholder='Marca' variant='filled' name="strMarca" value={strMarca} onChange={handleInputChangeToUpperCase} />
          </GridItem>
          : null
        }
        <GridItem>
          <IconButton onClick={consultarInventarios} isLoading={isLoading} colorScheme='teal' isDisabled={(consultaPor != "") ? false : true}><IoSearchCircle fontSize={"30px"} /></IconButton>
        </GridItem>
      </Grid>
    </Box>
  )
}

export default Buscador
