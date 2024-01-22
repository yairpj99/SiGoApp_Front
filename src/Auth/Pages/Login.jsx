import { Box, Button, Divider, Icon, Input, InputGroup, InputLeftAddon, InputLeftElement, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import '../../UI/Login.css'
import logo from '../../assets/sigoapplogo.png'
import { FaUser } from "react-icons/fa";
import { MdPassword } from "react-icons/md";
import LoginView from '../Views/LoginView';

const Login = () => {
  return (
    <Box className="login-container" height={'100vh'}>
    <div id="clouds">  
      <LoginView/>
    <div className="cloud x1"></div>
    <div className="cloud x2"></div>
    <div className="cloud x3"></div>
    <div className="cloud x4"></div>
    <div className="cloud x5"></div>
    </div>
    </Box>
  )
}

export default Login
