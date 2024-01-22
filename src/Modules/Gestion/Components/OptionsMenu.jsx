import React from 'react';
import { Box, Stack, Text, Link } from '@chakra-ui/react';
import { IoIosAddCircle } from 'react-icons/io';
import { startSetView } from '../../../Store/Gestion/Thunks';
import { RiUserSearchFill } from "react-icons/ri";
import { useDispatch } from 'react-redux';
import { MdMoney, MdPointOfSale } from "react-icons/md";

const OptionsMenu = () => {
  const dispatch = useDispatch();
  return (
    <Box width="25%" bgColor="#2C5282" padding="20px" boxShadow={"rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px"}>
    <Stack spacing={3}>
      <Link display="flex" alignItems="center" onClick={() => dispatch(startSetView('newUser'))}>
        <IoIosAddCircle color="white" fontSize="30px" style={{ marginRight: '5px' }} />
        <Text color="white">Nuevo Usuario</Text>
      </Link>
      <Link display="flex" alignItems="center" onClick={() => dispatch(startSetView('searchUsers'))}>
        <RiUserSearchFill color="white" fontSize="30px" style={{ marginRight: '5px' }} />
        <Text color="white">Consultar Usuarios</Text>
      </Link>
      <Link display="flex" alignItems="center" onClick={() => dispatch(startSetView('searchPointOfSale'))}>
        <MdPointOfSale color="white" fontSize="30px" style={{ marginRight: '5px' }} />
        <Text color="white">Consultar cajas abiertas</Text>
      </Link>
      <Link display="flex" alignItems="center" onClick={() => dispatch(startSetView('SearchRetirosDeEfectivo'))}>
        <MdMoney color="white" fontSize="30px" style={{ marginRight: '5px' }} />
        <Text color="white">Consultar retiros de efectivo</Text>
      </Link>
    </Stack>
  </Box>
  )
}

export default OptionsMenu
