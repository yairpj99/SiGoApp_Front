import { Box, Button, FormControl, FormErrorMessage, FormHelperText, FormLabel, Input, InputGroup, InputLeftAddon, Text, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { CiMoneyBill } from 'react-icons/ci'
import { IoInformationCircle } from 'react-icons/io5'
import { IoCloseCircleSharp } from "react-icons/io5";

const CajaCerradaView = () => {
  return (
    <Box width={"100%"} padding={"20px"}>
    <Box width={"100%"} display={"flex"} alignContent={"center"} justifyContent={"center"} alignItems={"center"}>
        <Box width={"60vh"} borderRadius={"15px"} bgColor={"white"}>
            <Box width={"100%"} display={"flex"} alignContent={"center"} justifyContent={"center"} alignItems={"center"} padding={"10px"}>
                <IoCloseCircleSharp color='red' fontSize={"100px"} />
            </Box>
            <Text textAlign={"center"} color={"red"} fontSize={"xl"}>CAJA CERRADA</Text>
            <Box width={"100%"} padding={"20px"}>
                <Text textAlign={"center"}>La caja ya se encuentra cerrada!!!</Text>
            </Box>
        </Box>
    </Box>
</Box>
  )
}

export default CajaCerradaView
