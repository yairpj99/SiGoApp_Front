import { Box, Button, ButtonGroup, Flex, Icon, IconButton, Text } from '@chakra-ui/react'
import React from 'react'
import { IoIosAddCircle, IoIosCash } from 'react-icons/io'
import { FaClipboardList } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { FaRegClipboard } from "react-icons/fa";
import { startCaja, startCerrarCaja, startChangeView, startSetMenuView } from '../../../../Store/PuntoDeVenta/Thunks';
import Swal from 'sweetalert2';

const OptionsView = () => {
    const dispatch = useDispatch();
    const { dataCaja } = useSelector(state => state.puntoDeVenta);

    const cerrarCaja = async () => {
        dispatch(startChangeView('facturacion'));
        const result = await Swal.fire({
            title: '¿Desea cerrar la caja?',
            text: 'Recuerde que al cerrar la caja ya no podra hacer operaciones',
            icon: 'info',
            showCancelButton: true,
            cancelButtonColor: 'red',
            cancelButtonText: 'Cancelar',
            showConfirmButton: true,
            confirmButtonColor: 'green',
            confirmButtonText: 'Cerrar Caja',
        });
    
        if (result.isConfirmed) {
            const resp = await dispatch(startCerrarCaja());
            if(resp){
                Swal.fire({
                    title: resp,
            });
        }
        }
    };
    

    return (
        <Box padding={"20px"}>
            <ButtonGroup spacing={6}>
                <IconButton width={"150px"} height={"150px"} colorScheme='teal' onClick={() => dispatch(startSetMenuView('ventas'))}>
                    <Flex direction="column" align="center">
                        <FaClipboardList fontSize={"80px"} />
                        <br />
                        <Text>Consultar Ventas</Text>
                    </Flex>
                </IconButton>
                {(dataCaja.lngEfectivoEnCaja > 0) ?
                    <IconButton width={"150px"} height={"150px"} colorScheme='teal' onClick={() => dispatch(startSetMenuView('realizarRetiro'))}>
                        <Flex direction="column" align="center">
                            <IoIosCash fontSize={"80px"} />
                            <br />
                            <Text>Realizar Retiro</Text>
                        </Flex>
                    </IconButton>
                    : null
                }
                <IconButton width={"150px"} height={"150px"} colorScheme='facebook' onClick={cerrarCaja}>
                    <Flex direction="column" align="center">
                        <FaRegClipboard fontSize={"80px"} />
                        <br />
                        <Text>Cerrar Caja</Text>
                    </Flex>
                </IconButton>
            </ButtonGroup>
        </Box>
    )
}

export default OptionsView
