import { Box, Button, Flex, IconButton, Spacer, Table, TableCaption, TableContainer, Tbody, Td, Thead, Tr } from '@chakra-ui/react'
import React from 'react'
import { useDate } from '../../../Hooks/Fecha'
import { useSelector } from 'react-redux'
import { IoEye, IoPrintSharp } from 'react-icons/io5'
import InventariosReport from '../../../Reports/InventariosReport'

const TableInventarios = () => {

    const { inventarios } = useSelector(state => state.inventarios);
    const { id, data } = useSelector(state => state.auth);
    const { day, month, year } = useDate();

    const handlePrint = () => {
        const name = data.strNombre + " " + data.strPaterno + " " + data.strMaterno;
        const dataInventarios = Object.values(inventarios);
        const pdfDocument = InventariosReport(dataInventarios, id, name);
    };


    const renderArticuloRow = (articulo, index) => (
        <Tr key={index}>
            <Td>{articulo.id}</Td>
            <Td>{articulo.lngCantidad}</Td>
            <Td>{articulo.strDescripcion}</Td>
            <Td>{articulo.strMarca}</Td>
            <Td>{articulo.strCategoria}</Td>
            <Td>{articulo.strTalla}</Td>
            <Td>$ {articulo.lngPrecioUnitario}</Td>
            <Td>$ {articulo.lngDescuentoDirecto}</Td>
            <Td>$ {articulo.lngImporte}</Td>
        </Tr>
    );

    return (
        <TableContainer bgColor={"white"} borderRadius={"10px"} style={{ overflowY: 'auto' }} maxHeight={"70vh"}>
            <Table size='sm'>
                <TableCaption>Resultados de búsqueda al: {day}-{month}-{year}</TableCaption>
                <Thead bgColor={"#4A5568"} color={"white"}>
                    <Tr>
                        <Td>SKU</Td>
                        <Td>Cant.</Td>
                        <Td>Descripcion</Td>
                        <Td>Marca</Td>
                        <Td>Categoria</Td>
                        <Td>Talla</Td>
                        <Td>Precio Unitario</Td>
                        <Td>Descuento</Td>
                        <Td>Importe</Td>
                    </Tr>
                </Thead>
                <Tbody>
                    {inventarios.length > 0 ? (
                        Object.values(inventarios).map((articulo, index) => renderArticuloRow(articulo, index))
                    ) : (
                        renderArticuloRow(inventarios, 0)
                    )}
                </Tbody>
            </Table>
            <Box width={"100%"} padding={"10px"}>
                <Flex>
                    <Spacer />
                    {(inventarios.length>0)?
                    <Button onClick={handlePrint} colorScheme='blue' leftIcon={<IoPrintSharp fontSize={"20px"} />}>
                        IMPRIMIR INVENTARIO
                    </Button>
                    :null
                    }
                </Flex>
            </Box>
        </TableContainer>
    )
}

export default TableInventarios
