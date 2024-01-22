import { Box, Button, ButtonGroup, Card, CardBody, CardHeader, Flex, Grid, GridItem, Heading, Input, InputGroup, InputLeftAddon, List, ListItem, Spacer, Stack, Text, useToast } from '@chakra-ui/react';
import React, { useState } from 'react';
import { GiNextButton, GiTwoCoins } from "react-icons/gi";
import { MdOutlineNavigateNext } from "react-icons/md";
import { PiMoneyBold } from "react-icons/pi";
import { useForm } from '../../../../Hooks/useForm';
import { useDispatch, useSelector } from 'react-redux';
import { calcularMoney, startSendRetiro } from '../../../../Store/PuntoDeVenta/Thunks';

const RealizarRetiro = () => {
  const dispatch = useDispatch();
  const {dataCaja, montoRetirar} = useSelector(state=>state.puntoDeVenta);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const formData={
    m1: '',
    m2: '',
    m5: '',
    m10: '',
    m20: '',
    b20: '',
    b50: '',
    b100: '',
    b200: '',
    b500: '',
    b1000: '',
  }

  const {m1,m2,m5,m10,m20,b20,b50,b100,b200,b500,b1000, onInputChange, onResetForm, formState} = useForm(formData);

  const calcularMonedasYBilletes=()=>{
    dispatch(calcularMoney(formState));
  }

  const send=async()=>{
    setIsLoading(true);
    try{
      const resp = await dispatch(startSendRetiro(formState));
      if(resp){
      toast({title: 'Retiro exitoso', description: resp, status: 'success', isClosable:true, position:'top'});
      }else{
        toast({title: 'Fallo', description: error.message, status: 'error', isClosable:true, position:'top'})
      }
      setIsLoading(false);
    }catch(error){
      setIsLoading(false);
      toast({title: 'Fallo', description: error.message, status: 'error', isClosable:true, position:'top'})
    }
    onResetForm();
  }

  return (
    <Box width="100%" padding="20px">
      <Flex>
        <Box bgColor="white" borderRadius="15px" width="50%" marginRight="10" marginBottom="2" height={"80vh"} padding={"20px"}>
          <Box>
            <List>
              <ListItem><Text textAlign={"center"} fontSize={"x-large"}>CONTEO DE BILLETES Y MONEDAS</Text></ListItem>
              <Flex marginTop={"20px"}>
              <ListItem>
                  <InputGroup>
                    <InputLeftAddon><GiTwoCoins fontSize={"30px"} /></InputLeftAddon>
                    <Input placeholder='Monedas de $ 1' variant={"filled"} name='m1' value={m1} onChange={onInputChange}/>
                  </InputGroup>
              </ListItem>
              <Spacer/>
              <ListItem>
                  <InputGroup>
                    <InputLeftAddon><GiTwoCoins fontSize={"30px"} /></InputLeftAddon>
                    <Input placeholder='Monedas de $ 2' variant={"filled"} name='m2' value={m2} onChange={onInputChange}/>
                  </InputGroup>
              </ListItem>
              </Flex>
              <br/>
              <Flex>
              <ListItem>
                  <InputGroup>
                    <InputLeftAddon><GiTwoCoins fontSize={"30px"} /></InputLeftAddon>
                    <Input placeholder='Monedas de $ 5' variant={"filled"} name='m5' value={m5} onChange={onInputChange}/>
                  </InputGroup>
              </ListItem>
              <Spacer/>
              <ListItem>
                  <InputGroup>
                    <InputLeftAddon><GiTwoCoins fontSize={"30px"} /></InputLeftAddon>
                    <Input placeholder='Monedas de $ 10' variant={"filled"} name='m10' value={m10} onChange={onInputChange}/>
                  </InputGroup>
              </ListItem>
              </Flex>
              <br/>
              <Flex>
              <ListItem>
                  <InputGroup>
                    <InputLeftAddon><GiTwoCoins fontSize={"30px"} /></InputLeftAddon>
                    <Input placeholder='Monedas de $ 20' variant={"filled"} name='m20' value={m20} onChange={onInputChange} />
                  </InputGroup>
              </ListItem>
              <Spacer/>
              <ListItem>
                  <InputGroup>
                    <InputLeftAddon><PiMoneyBold fontSize={"30px"} /></InputLeftAddon>
                    <Input placeholder='Billetes de $ 20' variant={"filled"} name='b20' value={b20} onChange={onInputChange}/>
                  </InputGroup>
              </ListItem>
              </Flex>
              <br/>
              <Flex>
              <ListItem>
                  <InputGroup>
                    <InputLeftAddon><PiMoneyBold fontSize={"30px"} /></InputLeftAddon>
                    <Input placeholder='Billetes de $ 50' variant={"filled"} name='b50' value={b50} onChange={onInputChange} />
                  </InputGroup>
              </ListItem>
              <Spacer/>
              <ListItem>
                  <InputGroup>
                    <InputLeftAddon><PiMoneyBold fontSize={"30px"} /></InputLeftAddon>
                    <Input placeholder='Billetes de $ 100' variant={"filled"} name='b100' value={b100} onChange={onInputChange}/>
                  </InputGroup>
              </ListItem>
              </Flex>
              <br/>
              <Flex>
              <ListItem>
                  <InputGroup>
                    <InputLeftAddon><PiMoneyBold fontSize={"30px"} /></InputLeftAddon>
                    <Input placeholder='Billetes de $ 200' variant={"filled"} name='b200' value={b200} onChange={onInputChange}/>
                  </InputGroup>
              </ListItem>
              <Spacer/>
              <ListItem>
                  <InputGroup>
                    <InputLeftAddon><PiMoneyBold fontSize={"30px"} /></InputLeftAddon>
                    <Input placeholder='Billetes de $ 500' variant={"filled"} name='b500' value={b500} onChange={onInputChange}/>
                  </InputGroup>
              </ListItem>
              </Flex>
              <br/>
              <Flex>
              <ListItem>
                  <InputGroup>
                    <InputLeftAddon><PiMoneyBold fontSize={"30px"} /></InputLeftAddon>
                    <Input placeholder='Billetes de $ 1000' variant={"filled"} name='b1000' value={b1000} onChange={onInputChange}/>
                  </InputGroup>
              </ListItem>
              <Spacer/>
              </Flex>
            </List>
            <Box marginTop={"20px"}>
              <Flex>
                <Spacer/>
                <Button onClick={calcularMonedasYBilletes} rightIcon={<MdOutlineNavigateNext fontSize={"30px"}/>} colorScheme='green'>Continuar</Button>
              </Flex>
            </Box>
          </Box>
        </Box>
        <Spacer />
        <Box bgColor="white" borderRadius="15px" width="50%" height={"80vh"} padding={"20px"}>
          <Box width={"100%"} alignContent={"center"} justifyContent={"center"} display={"flex"}>
            <Grid>
              <GridItem>
                <Text fontSize={"x-large"}>Caja: {dataCaja.noCaja} </Text>
              </GridItem>
              <GridItem>
                <Stack marginTop={"20px"} direction={['column', 'row']} spacing='24px'>
                  <Card bgColor={"#E2E8F0"}>
                    <CardHeader><Heading size={"s"}>Fondo de Caja:</Heading></CardHeader>
                    <CardBody marginTop={"-20px"}><Text fontSize={"x-large"}>$ {dataCaja.lngFondoDeCaja}</Text></CardBody>
                  </Card>
                  <Card bgColor={"#CBD5E0"}>
                    <CardHeader><Heading size={"s"}>Efectivo en Caja:</Heading></CardHeader>
                    <CardBody marginTop={"-20px"}><Text fontSize={"x-large"}>$ {dataCaja.lngEfectivoEnCaja}</Text></CardBody>
                  </Card>
                  <Card bgColor={"#A0AEC0"}>
                    <CardHeader><Heading size={"s"}>Fecha de Apertura:</Heading></CardHeader>
                    <CardBody marginTop={"-20px"}><Text fontSize={"large"}>{dataCaja.strFechaApertura}</Text></CardBody>
                  </Card>
                </Stack>
                <Stack marginTop={"20px"} direction={['column', 'row']} spacing='24px'>
                  <Card bgColor={"#2D3748"}>
                    <CardHeader><Heading color={"white"} size={"s"}>Monto a Retirar:</Heading></CardHeader>
                    <CardBody marginTop={"-20px"}><Text color={"white"} fontSize={"x-large"}>$ {montoRetirar}</Text></CardBody>
                  </Card>
                  <Card bgColor={"#1A202C"}>
                    <CardHeader><Heading color={"white"} size={"s"}>Nuevo efectivo en Caja:</Heading></CardHeader>
                    <CardBody marginTop={"-20px"}><Text color={"white"} fontSize={"x-large"}>$ {(montoRetirar>0)? dataCaja.lngEfectivoEnCaja - montoRetirar : 0}</Text></CardBody>
                  </Card>
                </Stack>
              </GridItem>
              <GridItem marginTop={"110px"}>
                <Flex>
                  <Spacer/>
                  <ButtonGroup gap={2}>
                  <Button onClick={send} colorScheme='teal' isLoading={isLoading} isDisabled={(dataCaja.lngEfectivoEnCaja - montoRetirar  >= 0 && montoRetirar>0)?false:true}>Realizar Retiro</Button>
                  </ButtonGroup>
                </Flex>
              </GridItem>
            </Grid>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default RealizarRetiro;
