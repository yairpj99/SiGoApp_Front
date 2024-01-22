import React from 'react'
import SiGoAppErpLayOut from '../../../assets/SiGoAppErpLayOut'
import { Box } from '@chakra-ui/react'
import MenuComponent from '../Components/MenuComponent'
import { useDispatch, useSelector } from 'react-redux'
import GenerarSkuView from '../VIews/GenerarSkuView'
import EditarSkuView from '../VIews/EditarSkuView'

const HomeGestionInventarios = () => {
    const {view}=useSelector(state=>state.inventarios);
    function renderView(view) {
        switch (view) {
          case 'GenerarSkuView':
            return <GenerarSkuView/>;
            break;
          case 'EditarSkuView':
            return <EditarSkuView/>
          break;
          default:
            return null;
        }
      }
  return (
    <SiGoAppErpLayOut>
        <Box margin={"-20px"}>
            <MenuComponent/>
        </Box>
        <Box marginTop={"50px"} padding={"10px"}>{renderView(view)}</Box>
    </SiGoAppErpLayOut>
  )
}

export default HomeGestionInventarios
