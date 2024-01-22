import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Divider, Grid, GridItem, IconButton, Input, Select, Table, TableContainer, Tbody, Td, Text, Thead, Tr } from '@chakra-ui/react'
import React, { useState } from 'react'
import { IoEye, IoSearchCircle } from 'react-icons/io5'
import { useForm } from '../../../Hooks/useForm'
import { startConsultUsuarios, startConsultaRetiros, startConsultaRetirosFecha, startConsultaRetirosNoCaja, startDetalleRetiro } from '../../../Store/Gestion/Thunks'
import { useDispatch, useSelector } from 'react-redux'

const SearchRetirosDeEfectivo = () => {

    const formData = {
        consultaPor: '',
        strFecha: '',
        noCaja: '',
    }
    const [isLoading, setIsLoading] = useState(false);
    const { errorMessage, consultaRetiro } = useSelector(state => state.gestion);
    const dispatch = useDispatch();

    const { consultaPor, strFecha, noCaja, onInputChange, formState } = useForm(formData);

    const search = async (strFecha) => {
        setIsLoading(true);
        if (consultaPor == "Todos") {
            await dispatch(startConsultaRetiros());
        } else if(consultaPor=="Fecha"){
            await dispatch(startConsultaRetirosFecha(formState.strFecha));
        }else if(consultaPor=="Caja"){
            await dispatch(startConsultaRetirosNoCaja(formState.noCaja));
        }
        setIsLoading(false);
    }
    return (
        <Box width={"100%"} >
            <Text fontSize={"x-large"}>Historial de retiros de efectivo realizados</Text>
            <Divider borderColor={"black"} />
            <Box>
                <Box width={"100%"} bgColor={"white"} borderRadius={"10px"} marginTop={"20px"} padding={"10px"}>
                    <Grid templateColumns='repeat(5, 1fr)' gap={2}>
                        <GridItem pl='2'>
                            <Select placeholder='Consultar por' variant={"filled"} name='consultaPor' value={consultaPor} onChange={onInputChange}>
                                <option>Todos</option>
                                <option>Fecha</option>
                                <option>Caja</option>
                            </Select>
                        </GridItem>
                        {(consultaPor == "Fecha") ?
                            <GridItem>
                                <Input placeholder='Fecha' type='date' variant={"filled"} name='strFecha' value={strFecha} onChange={onInputChange} />
                            </GridItem>
                            :(consultaPor=="Caja")?
                            <GridItem>
                                <Input placeholder='No. Caja' variant={"filled"} name='noCaja' value={noCaja} onChange={onInputChange} />
                            </GridItem>
                            :null
                        }
                        <GridItem>
                            <IconButton isLoading={isLoading} onClick={search} colorScheme='teal'><IoSearchCircle fontSize={"30px"} /></IconButton>
                        </GridItem>
                    </Grid>
                </Box>
                {(errorMessage != "") ?
                    <Alert marginTop={"10px"} status='error'>
                        <AlertIcon />
                        <AlertDescription>Error al realizar la consulta!!!</AlertDescription>
                    </Alert>
                    : null
                }
            </Box>
            {(consultaRetiro.length > 0) ?
                <Box width={"100%"} bgColor={"white"} borderRadius={"15px"} padding={"10px"} marginTop={"20px"}>
                    <TableContainer style={{ overflowY: 'auto' }} maxHeight={"60vh"}>
                        <Table width={"100%"}>
                            <Thead>
                                <Tr>
                                    <Td>Fecha</Td>
                                    <Td>ID Retiro</Td>
                                    <Td>Caja</Td>
                                    <Td>Monto de Retiro</Td>
                                    <Td></Td>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {Object.values(consultaRetiro).map((retiro, index) => (
                                    <Tr key={index}>
                                        <Td>{retiro.strFecha}</Td>
                                        <Td>{retiro.id}</Td>
                                        <Td>{retiro.noCaja}</Td>
                                        <Td>$ {retiro.lngMontoRetiro}</Td>
                                        <Td><IconButton colorScheme='teal' onClick={()=>dispatch(startDetalleRetiro(retiro))}><IoEye fontSize='20px'/></IconButton></Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </TableContainer>

                </Box>
                : null

            }
        </Box>
    )
}

export default SearchRetirosDeEfectivo
