import React from 'react';
import SiGoAppErpLayOut from '../../../assets/SiGoAppErpLayOut';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Stack } from '@chakra-ui/react';
import AddNewUser from '../Views/AddNewUser';
import OptionsMenu from '../Components/OptionsMenu';
import SearchUsers from '../Views/SearchUsers';
import SearchPointOfSale from '../Views/SearchPointOfSale';
import SearchRetirosDeEfectivo from '../Views/SearchRetirosDeEfectivo';
import DetalleRetiro from '../Views/DetalleRetiro';

const HomeGestion = () => {
  const { view } = useSelector(state => state.gestion);

  function renderView(view) {
    switch (view) {
      case 'newUser':
        return <AddNewUser/>;
        break;
      case 'searchUsers':
        return <SearchUsers/>;  
        break;
        case 'searchPointOfSale':
          return <SearchPointOfSale/>;  
          break;
          case 'SearchRetirosDeEfectivo':
            return <SearchRetirosDeEfectivo/>;  
            break;
          case 'detalleRetiro':
            return <DetalleRetiro/>;  
            break;
      default:
        return null;
    }
  }

  return (
    <SiGoAppErpLayOut>
      <Stack direction="row" height="100vh" margin={"-20px"}>
        <OptionsMenu/>
        <Box width="70%" padding={"20px"}>{renderView(view)}</Box>
      </Stack>
    </SiGoAppErpLayOut>
  );
};

export default HomeGestion;
