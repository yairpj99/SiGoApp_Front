import React, { useEffect } from 'react';
import SiGoAppErpLayOut from '../../../assets/SiGoAppErpLayOut';
import FacturacionView from '../Views/FacturacionView';
import { useDispatch, useSelector } from 'react-redux';
import PagoView from '../Views/PagoView';
import FacturandoView from '../Views/FacturandoView';
import MenuView from '../MenuPuntoDeVenta/Views/MenuView';
import LoadingCajaView from '../Views/LoadingCajaView';
import { startCaja } from '../../../Store/PuntoDeVenta/Thunks';
import AperturaView from '../Views/AperturaView';
import CajaCerradaView from '../Views/CajaCerradaView';

const HomePdv = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startCaja());
  }, []);



  const { view, dataCaja } = useSelector(state => state.puntoDeVenta);
  return (
    <SiGoAppErpLayOut>
      {view == 'apertura' ? <AperturaView/> :null}
      {view == 'loading' ? <LoadingCajaView/> :null}
      {view == 'facturacion' ? <FacturacionView/> :null}
      {view === 'pago' ? <PagoView /> : null}
      {view === 'menu' ? <MenuView /> : null}
      {view === 'facturando' ? <FacturandoView /> : null}
      {view === 'cajaCerrada' ? <CajaCerradaView /> : null}
    </SiGoAppErpLayOut>
  );
};

export default HomePdv;
