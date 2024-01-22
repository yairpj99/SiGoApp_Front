import { Alert, AlertIcon, AlertTitle, Box, Button, Divider, Icon, IconButton, Input, InputGroup, InputLeftAddon, InputLeftElement, InputRightAddon, InputRightElement, Stack, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import '../../UI/Login.css'
import logo from '../../assets/sigoapplogo.png'
import { FaEye, FaRegEye, FaUser } from "react-icons/fa";
import { MdPassword } from "react-icons/md";
import { useForm } from '../../Hooks/useForm';
import { useDispatch, useSelector } from 'react-redux';
import { FaEyeSlash } from "react-icons/fa";
import { startLogin } from '../../Store/auth/Thunks';

const LoginView = () => {

  const dispatch = useDispatch();
  const {errorMessaje} = useSelector(state=>state.auth)
  const [isLoading, setIsLoading] = useState(false);

  const formData = {
    id: '',
    password: ''
  }

  const [eye, setEye]=useState(false);

  const { id, password, onInputChange } = useForm(formData);

  const onLogin = async () => {
    setIsLoading(true);
    await dispatch(startLogin(id, password));
    setIsLoading(false);
  }

  const toggleEye = () => {
    setEye(prevEye => !prevEye);
  };


  return (
    <Box width={"100%"} position={"absolute"} zIndex={1} padding={"10px"}>
      <Box width={"100%"} alignContent={"center"} alignItems={"center"} justifyContent={"center"} display={"flex"}>
        <Box width={"50vh"} padding={"10px"} backgroundColor={"white"} boxShadow={"rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px"} borderRadius={"15px"}>
          <Box width={"100%"} display={"flex"} alignContent={"center"} alignItems={"center"} justifyContent={"center"}>
            <img src={logo} width={"50%"} />
          </Box>
          <Text fontSize={"lg"} textAlign={"center"} color={"RGBA(0, 0, 0, 0.80)"}>INGRESAR AL SISTEMA</Text>
          <Box padding={"10px"}>
            {(errorMessaje!="")?
            <Alert status='error'>
              <AlertIcon/>
              <AlertTitle>{errorMessaje}</AlertTitle>
            </Alert>
            :null
            }
          </Box>
          <Box width={"100%"} marginTop={"20px"} display={"flex"} alignContent={"center"} alignItems={"center"} justifyContent={"center"}>
            <Stack spacing={4}>
              <InputGroup>
                <InputLeftElement pointerEvents='none'>
                  <FaUser color='#4A5568' />
                </InputLeftElement>
                <Input type='text' placeholder='No. Empleado' name="id" value={id} onChange={onInputChange} />
              </InputGroup>
              <InputGroup>
                <InputLeftElement pointerEvents='none'>
                  <MdPassword color='#4A5568' />
                </InputLeftElement>
                <Input type={(!eye)?'password':'text'} placeholder='Contraseña' name="password" value={password} onChange={onInputChange} />
                <InputRightElement>
                <IconButton colorScheme='white' onClick={toggleEye}>{(!eye)?<FaEye color='teal'/>:<FaEyeSlash color='teal'/>}</IconButton>
                </InputRightElement>
              </InputGroup>
            </Stack>
          </Box>
          <Box marginTop={"20px"} width={"100%"} display={"flex"} alignContent={"center"} alignItems={"center"} justifyContent={"center"} marginBottom={"10px"}>
            <Button colorScheme='teal' onClick={onLogin} isLoading={isLoading}>INGRESAR</Button>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default LoginView
