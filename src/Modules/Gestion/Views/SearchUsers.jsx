import { Box, Divider, Grid, GridItem, IconButton, Input, Select, Table, TableContainer, Tbody, Td, Text, Thead, Tr } from '@chakra-ui/react'
import React, { useState } from 'react'
import { IoSearchCircle } from 'react-icons/io5'
import { useForm } from '../../../Hooks/useForm'
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { startConsultUsuarios, startDeleteUser } from '../../../Store/Gestion/Thunks';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss'

const SearchUsers = () => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const { consultaUsuarios } = useSelector(state => state.gestion);

    const formData = {
        consult: '',
        idUser: ''
    }

    const searchInfo = async () => {
        setIsLoading(true);
        await dispatch(startConsultUsuarios());
        setIsLoading(false);
    }

    const onDeleteUser = async (idUser) => {
        Swal.fire({
          title: "¿Seguro que desea eliminar el usuario?",
          showDenyButton: true,
          confirmButtonText: "SI",
          denyButtonText: "No",
        }).then(async (result) => {
          if (result.isConfirmed) {
            const resp = await dispatch(startDeleteUser(idUser));
            if(resp){
                Swal.fire("Usuario eliminado", `El usuario con id ${idUser} fue eliminado correctamente!!!`, 'success');
            }else{
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Ocurrio un error al intentar eliminar al usuario",
                  });
            }
          }
        });
      };

    const { consult, idUser, onInputChange } = useForm(formData);
    return (
        <Box width={"100%"} >
            <Text fontSize={"x-large"}>Consulta de Usuarios</Text>
            <Divider borderColor={"black"} />
            <Box width={"100%"}>
                <Box width={"100%"} marginTop={"20px"} bgColor={"white"} borderRadius={"10px"} padding={"10px"}>
                    <Grid templateColumns='repeat(5, 1fr)' gap={2}>
                        <GridItem pl='2'>
                            <Select variant={"filled"} placeholder='Consultar por' name="consult" value={consult} onChange={onInputChange}>
                                <option>Todos</option>
                                <option>Por Id</option>
                            </Select>
                        </GridItem>
                        {(consult == "Por Id") ?
                            <GridItem pl='2'>
                                <Input variant={"filled"} placeholder='ID De Usuario' name="idUser" value={idUser} onChange={onInputChange} />
                            </GridItem>
                            : null
                        }
                        <GridItem>
                            <IconButton isDisabled={(consult == "") ? true : false} colorScheme='teal' onClick={searchInfo} isLoading={isLoading}><IoSearchCircle fontSize={"30px"} /></IconButton>
                        </GridItem>
                    </Grid>
                </Box>
            </Box>
            <br />
            <Box width={"100%"} bgColor={"white"} borderRadius={"15px"} padding={"10px"}>
                <TableContainer style={{ overflowY: 'auto' }} maxHeight={"60vh"}>
                    <Table width={"100%"}>
                        <Thead>
                            <Tr>
                                <Td>ID Usuario</Td>
                                <Td>Nombre</Td>
                                <Td>Telefono</Td>
                                <Td>Nacimiento</Td>
                                <Td>Acceso</Td>
                                <Td></Td>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {Object.values(consultaUsuarios).map((usuario, index) => (
                                <Tr key={index}>
                                    <Td>{usuario.id}</Td>
                                    <Td>
                                        {usuario.cdata !== null
                                            ? usuario.cdata.strNombre + " " + usuario.cdata.strPaterno + " " + usuario.cdata.strMaterno
                                            : ''}
                                    </Td>
                                    <Td>{usuario.cdata != null ? usuario.cdata.strTelefono : ''}</Td>
                                    <Td>{usuario.cdata != null ? usuario.cdata.strFechaDeNacimiento : ''}</Td>
                                    <Td>{usuario.cdata != null ? usuario.cdata.strAcceso : ''}</Td>
                                    <Td>
                                        <IconButton colorScheme='red' onClick={()=>onDeleteUser(usuario.id)}>
                                            <MdDelete fontSize={"30px"} />
                                        </IconButton>
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    )
}

export default SearchUsers
