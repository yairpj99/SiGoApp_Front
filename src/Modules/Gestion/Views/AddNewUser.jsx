import { Box, Button, Divider, Flex, Input, InputGroup, Select, Stack, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useForm } from '../../../Hooks/useForm'
import { useDispatch } from 'react-redux'
import { createNewUser } from '../../../Store/Gestion/Thunks'
import NewUserModal from '../Components/NewUserModal'

const AddNewUser = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [idUser, setIdUser] = useState("");
    const dispatch = useDispatch();
    const formData={
        strNombre: '',
        strPaterno: '',
        strMaterno: '',
        strTelefono: '',
        strFechaDeNacimiento: '',
        strAcceso: ''
    }
    const {strNombre, strPaterno, strMaterno, strTelefono, strFechaDeNacimiento, strAcceso, handleInputChangeToUpperCase, formState, onResetForm, onInputChange} = useForm(formData);

    const handleOpenModal = () => {
        setModalOpen(true);
      };
    
      const handleCloseModal = () => {
        setModalOpen(false);
      };

    const onSubmit=async()=>{
        setIsLoading(true);
        const resp = await dispatch(createNewUser(formState));
        if(resp){
            setIdUser(resp);
            handleOpenModal();
            onResetForm();
        }
        setIsLoading(false);
    }
    
    return (
        <Box width={"100%"}>
            <Text fontSize={"x-large"}>Nuevo Usuario</Text>
            <Divider borderColor={"black"} />
            <Box marginTop={"10px"} padding={"5px"}>
            <NewUserModal isOpen={isModalOpen} onClose={handleCloseModal} idUser={idUser}/>
                <Stack spacing={3}>
                    <Flex>
                        <Input variant='filled' placeholder='Nombre' name="strNombre" value={strNombre} onChange={handleInputChangeToUpperCase}/>
                        <Box width="20px" />
                        <Input variant='filled' placeholder='Apellido Paterno' name="strPaterno" value={strPaterno} onChange={handleInputChangeToUpperCase}/>
                    </Flex>
                    <Flex>
                        <Input variant='filled' placeholder='Apellido Materno' name="strMaterno" value={strMaterno} onChange={handleInputChangeToUpperCase}/>
                        <Box width="20px" />
                        <Input variant='filled' placeholder='Numero de Telefono' name="strTelefono" value={strTelefono} onChange={handleInputChangeToUpperCase}/>
                    </Flex>
                    <Flex>
                        <Input type='date' variant='filled' placeholder='Fecha de Nacimiento'  name="strFechaDeNacimiento" value={strFechaDeNacimiento} onChange={handleInputChangeToUpperCase}/>
                        <Box width="20px" />
                        <Select variant='filled' placeholder='Tipo de Acceso' name="strAcceso" value={strAcceso} onChange={onInputChange}>
                            <option>total</option>
                            <option>ventas</option>
                        </Select>
                    </Flex>
                    <br/>
                    <Flex justifyContent={"center"}>
                        <Button colorScheme='green' onClick={onSubmit} isLoading={isLoading}>GENERAR NUEVO USUARIO</Button>
                    </Flex>
                </Stack>
            </Box>
        </Box>
    )
}

export default AddNewUser
