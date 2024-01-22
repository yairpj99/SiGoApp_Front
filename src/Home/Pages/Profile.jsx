import React, { useState } from 'react'
import SiGoAppErpLayOut from '../../assets/SiGoAppErpLayOut'
import { AbsoluteCenter, Alert, AlertIcon, Avatar, Box, Button, Divider, Input, InputAddon, InputGroup, InputLeftAddon, Spacer, Stack, Text } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from '../../Hooks/useForm'
import { startChangePassword } from '../../Store/Gestion/Thunks'

const Profile = () => {
  const { data } = useSelector(state => state.auth)
  const [isLoading, setIsLoading]=useState(false);
  const [message, setMessage]=useState('');

  const dispatch = useDispatch();

  const formDATA={
    newPassword: '',
  };

  const {newPassword, onInputChange}=useForm(formDATA)

  const sendNewPassword=async()=>{
    setIsLoading(true);
    const resp = await dispatch(startChangePassword(newPassword));
    setMessage(resp);
    setIsLoading(false);
  }

  return (
    <SiGoAppErpLayOut>
      <Box width={"100%"} display={"flex"} padding={"20px"}>
        <Box width={"20%"} alignContent={"center"} alignItems={"center"} justifyContent={"center"}>
          <Avatar size={"x-large"} />
          <Box width={"100%"} mt={"20px"}>
            <Text textAlign={"center"} fontSize={"xxx-large"}>{data.strNombre}</Text>
            <Text textAlign={"center"} fontSize={"x-large"}>{`${data.strPaterno} ${data.strMaterno}`}</Text>
          </Box>
        </Box>
        <Box width={"20%"} alignContent={"center"} justifyContent={"center"} alignItems={"center"} display={"flex"}>
        <Divider orientation='vertical' borderColor={"black"}/>
        </Box>
        <Box width={"60%"}>
          <Text fontSize={"xx-large"}>INFORMACION DE LA CUENTA</Text>
          <Divider borderColor={"black"}/>
          {(message!="")?
          <Box width={"100%"} padding={"20px"}>
          <Alert status='success'><AlertIcon/>{message}</Alert>
          </Box>
          :null
          }
          <Box marginTop={"20px"}>
            <Stack spacing={4}>
            <InputGroup variant={"filled"}>
            <InputLeftAddon>Telefono: </InputLeftAddon>
            <Input defaultValue={data.strTelefono} isDisabled={true}/>
            </InputGroup>
            <InputGroup variant={"filled"}>
            <InputLeftAddon>Fecha de Nacimiento: </InputLeftAddon>
            <Input defaultValue={data.strFechaDeNacimiento} isDisabled={true}/>
            </InputGroup>
            <InputGroup variant={"filled"}>
            <InputLeftAddon>Nueva Contraseña: </InputLeftAddon>
            <Input type='password' name="newPassword" value={newPassword} onChange={onInputChange}/>
            </InputGroup>
            </Stack>
            <Box marginTop={"20px"} width={"100%"} display={"flex"} alignContent={"center"} alignItems={"center"} justifyContent={"center"}>
              <Button colorScheme='green' onClick={sendNewPassword} isLoading={isLoading}>Guardar Informacion</Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </SiGoAppErpLayOut>
  )
}

export default Profile
