import { Box, Flex, Spacer, Link, Heading, Center, IconButton, Button, Progress } from '@chakra-ui/react';
import React from 'react';
import logo from '../assets/sigoapperp.png'
import { IoExit } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { startLogOut } from '../Store/auth/Thunks';

const SiGoAppErpLayOut = ({ children }) => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  return (
    <Box>
      <Box width="100%" boxShadow={"rgba(17, 17, 26, 0.1) 0px 1px 0px;"}>
        <Flex align="center" bg="#718096" color="white" p="4">
          <Link onClick={()=>Navigate("/Home")}>
            <Heading>
              <img width={"40px"} src={logo}/>
            </Heading>
          </Link>
          <Center marginLeft={"20px"}>
            <Link onClick={()=>Navigate("/Profile")}>Mi Perfil</Link>
          </Center>
          <Spacer />
          <Box>
            <Link onClick={()=>dispatch(startLogOut())}>
            <IoExit fontSize={"35px"} color='#ffff'/>
            </Link>
          </Box>
        </Flex>
      </Box>

      <Box padding="20px">
        {children}
      </Box>
    </Box>
  );
};

export default SiGoAppErpLayOut;
