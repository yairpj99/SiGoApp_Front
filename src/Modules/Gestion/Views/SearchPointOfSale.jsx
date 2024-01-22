import { Box, Divider, Grid, Text } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import PointOfSaleComponent from '../Components/PointOfSaleComponent'
import { useDispatch, useSelector } from 'react-redux'
import ErrorMessajeComponent from '../Components/ErrorMessajeComponent'
import { startSearchPointOfSales } from '../../../Store/Gestion/Thunks'

const SearchPointOfSale = () => {
    const { errorMessage, pointOfSales } = useSelector(state => state.gestion);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(startSearchPointOfSales());
    },[]);

    return (
        <Box width={"100%"}>
            <Text fontSize={"x-large"}>Cajas Abiertas</Text>
            <Divider borderColor={"black"} />
            <Box>
                {(errorMessage) ? <ErrorMessajeComponent /> :
                <Box marginTop={"10px"} width={"100%"} >
                    <Grid templateColumns='repeat(3, 1fr)' gap={3}>
                    {Object.values(pointOfSales).map((caja, index) => (
                        <PointOfSaleComponent data={caja} />
                    ))}
                    </Grid>
                </Box>
                }
            </Box>
        </Box>
    )
}

export default SearchPointOfSale
