import { Box, Button, Divider, Flex, Grid, Input, InputGroup, InputLeftAddon, List, ListItem, Table, TableContainer, Td, Tr, useToast } from '@chakra-ui/react'
import React from 'react'
import { IoTrash } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'
import { deleteSkuById } from '../../../Store/Inventrios/Thunks'

const SkuDetail = () => {
    const { inventarios } = useSelector(state => state.inventarios);
    const dispatch = useDispatch();
    const toast = useToast();

    const handleDelete=async()=>{
        const resp = await(dispatch(deleteSkuById(inventarios.id)));
        if(resp){
            toast({title: 'SKU ELIMINADO', description:"El sku ha sido eliminado exitosamente!!!", position:'top', status: 'success'})
        }else{
            toast({title: 'ERROR', description:"Ocurrio un error", position:'top', status:'error'})
        }
    }
    return (
        <Box bgColor={"white"} borderRadius={"10px"} padding={"10px"}>
            <Flex>
            <Grid width={"30%"} >
                <List>
                    <ListItem marginTop={"10px"}>
                        <InputGroup>
                            <InputLeftAddon width={"40%"} children='SKU: ' />
                            <Input defaultValue={inventarios.id} isDisabled={true} variant={"filled"}/>
                        </InputGroup>
                    </ListItem>
                    <ListItem marginTop={"10px"}>
                        <InputGroup>
                            <InputLeftAddon width={"40%"} children='Descripcion: ' />
                            <Input defaultValue={inventarios.strDescripcion} isDisabled={true} variant={"filled"}/>
                        </InputGroup>
                    </ListItem>
                    <ListItem marginTop={"10px"}>
                        <InputGroup>
                            <InputLeftAddon width={"40%"} children='Marca: ' />
                            <Input defaultValue={inventarios.strMarca} isDisabled={true} variant={"filled"}/>
                        </InputGroup>
                    </ListItem>
                    <ListItem marginTop={"10px"}>
                        <InputGroup>
                            <InputLeftAddon width={"40%"} children='Categoria: ' />
                            <Input defaultValue={inventarios.strCategoria} isDisabled={true} variant={"filled"}/>
                        </InputGroup>
                    </ListItem>
                    <ListItem marginTop={"10px"}>
                        <InputGroup>
                            <InputLeftAddon width={"40%"} children='Talla: ' />
                            <Input defaultValue={inventarios.strTalla} isDisabled={true} variant={"filled"}/>
                        </InputGroup>
                    </ListItem>
                    </List>
                    </Grid>

                    <Grid marginLeft={"20px"}>
                    <List>
                    <ListItem marginTop={"10px"}>
                        <InputGroup>
                            <InputLeftAddon width={"40%"} children='Cant: ' />
                            <Input defaultValue={inventarios.lngCantidad} isDisabled={true} variant={"filled"}/>
                        </InputGroup>
                    </ListItem>
                    <ListItem marginTop={"10px"}>
                        <InputGroup>
                            <InputLeftAddon width={"40%"} children='Almacen: ' />
                            <Input defaultValue={inventarios.strAlmacen} isDisabled={true} variant={"filled"}/>
                        </InputGroup>
                    </ListItem>
                    <ListItem marginTop={"10px"}>
                        <InputGroup>
                            <InputLeftAddon width={"40%"} children='Precio Unitario: ' />
                            <Input defaultValue={inventarios.lngPrecioUnitario} isDisabled={true} variant={"filled"}/>
                        </InputGroup>
                    </ListItem>
                    <ListItem marginTop={"10px"}>
                        <InputGroup>
                            <InputLeftAddon width={"40%"} children='Descuento: ' />
                            <Input defaultValue={inventarios.lngDescuentoDirecto} isDisabled={true} variant={"filled"}/>
                        </InputGroup>
                    </ListItem>
                    <ListItem marginTop={"10px"}>
                        <InputGroup>
                            <InputLeftAddon width={"40%"} children='Importe: ' />
                            <Input defaultValue={inventarios.lngImporte} isDisabled={true} variant={"filled"}/>
                        </InputGroup>
                    </ListItem>
                </List>
                </Grid>
                </Flex>
                <Flex margin={"20px"} alignItems={"center"} justifyContent={"center"}>
                    <Button onClick={handleDelete} colorScheme='red' leftIcon={<IoTrash fontSize={"20px"}/>}>ELIMINAR SKU</Button>
                </Flex>
        </Box>
    )
}

export default SkuDetail
