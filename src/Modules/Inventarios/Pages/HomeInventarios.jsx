import React from 'react'
import SiGoAppErpLayOut from '../../../assets/SiGoAppErpLayOut'
import { useSelector } from 'react-redux'
import ConsultaInvetarios from '../Views/ConsultaInvetarios'
import NavbarInventarios from '../Components/NavbarInventarios'
import { Box } from '@chakra-ui/react'
import ImprimirEtiquetasView from '../Views/ImprimirEtiquetasView'
import AgregarArticulos from '../Views/AgregarArticulos'

const HomeInventarios = () => {

  const { view } = useSelector(state => state.inventarios);

  return (
    <SiGoAppErpLayOut>
      <Box margin={"-20px"}>
        <NavbarInventarios />
      </Box>
      {(view == 'GenerarSkuView') ? (
        <Box marginTop={"50px"}>
          <ImprimirEtiquetasView />
        </Box>
      ) : (view == 'AgregarArticulos') ? (
        <Box marginTop={"50px"}>
          <AgregarArticulos />
        </Box>
      ) :
        <Box marginTop={"50px"}>
          <ConsultaInvetarios />
        </Box>
      }
    </SiGoAppErpLayOut>
  )
}

export default HomeInventarios
