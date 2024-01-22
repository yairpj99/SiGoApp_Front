import { Box, Button, Flex, Icon, Text } from '@chakra-ui/react'
import React from 'react'
import { useNavigate } from 'react-router-dom';

const ModulesOptionButton = ({name,onNavigate, color, icon}) => {
    const Navigate = useNavigate();
  return (
    <Button width="180px" height="180px" colorScheme={color} onClick={()=>Navigate(onNavigate)}>
      <Flex direction="column" align="center">
        <Box width="100%" direction="colum" align="center">
          {icon}
        </Box>
        <br/>
        <Box width="100%">
          <Box textAlign="center">{name}</Box>
        </Box>
      </Flex>
    </Button>
  )
}

export default ModulesOptionButton
