
import { Box, Button, Flex, Spacer } from '@chakra-ui/react'
import React, { useState } from 'react'
import BuscadorSKU from '../Components/BuscadorSKU'
import { useSelector } from 'react-redux'
import { PDFViewer } from '@react-pdf/renderer'
import EtiquetaSku from '../../../Reports/EtiquetaSKU'
import { IoPrint } from 'react-icons/io5'

const ImprimirEtiquetasView = () => {
  const { etiquetaSku } = useSelector(state => state.inventarios);

  return (
    <Box>
      <Box>
        <BuscadorSKU />
      </Box>
      {(etiquetaSku != '') ?
        <Box marginTop={"20px"}>
          <Box width={"100%"} padding={"30px"} bgColor={"white"} borderRadius={"15px"}>
            <Box width={"100%"}>
            <PDFViewer width={"100%"} height={"400px"}>
              <EtiquetaSku sku={etiquetaSku.id} formStateSave={etiquetaSku} />
            </PDFViewer>
            </Box>
          </Box>
        </Box>
        : null
      }
    </Box>
  )
}

export default ImprimirEtiquetasView
