import Caja from "../../Api/Caja";
import InventariosApi from "../../Api/InventariosApi"
import Retiros from "../../Api/Retiros";
import Ventas from "../../Api/Ventas";
import { setDeleteCaja } from "../Gestion/Gestion";
import { addArticulo, clean, deleteArticulo, removeVenta, setAddDescuento, setConsultarVentas, setDataCaja, setDetalleVenta, setIsLoading, setMenuView, setMontoRetirar, setPagoConTarjeta, setPagoEfectivo, setPagoTarjeta, setTotalFinal, setView, setViewPago } from "./PuntoDeVenta";

export const startAddArticulo = (sku) => {
    return async (dispatch, getState) => {
      try {
        const resp = await InventariosApi.consultarById(sku);
        if(resp){
        dispatch(addArticulo(resp));
        dispatch(setTotalFinal());
        return true;
        }
      } catch (error) {
        console.error('Error al agregar artículo:', error);
        return false;
      }
    };
  };

  export const startDeleteArticulo = (index) => {
    return async (dispatch, getState) => {
      dispatch(deleteArticulo(index));
      dispatch(setTotalFinal());
    };
  };

  export const startChangeView=(payload)=>{
    return async(dispatch, getState)=>{
      dispatch(setView(payload));
    }
  }

  export const startChangeViewPago=(payload)=>{
    return async(dispatch, getState)=>{
      dispatch(setViewPago(payload));
    }
  }

  export const startPagoEfectivo=(monto)=>{
    return async(dispatch, getState)=>{
      dispatch(setPagoEfectivo(parseFloat(monto)));
      dispatch(setTotalFinal());
    }
  }

  export const startPagoTarjeta=(monto, pagoConTarjeta)=>{
    return async(dispatch, getState)=>{
      dispatch(setPagoTarjeta(parseFloat(monto)));
      dispatch(setTotalFinal());
      dispatch(setPagoConTarjeta(pagoConTarjeta));
    }
  }

  export const startSetMenuView=(view)=>{
    return async(dispatch, getState)=>{
      dispatch(setMenuView(view));
    }
  }

  export const startVenta = () => {
    return async (dispatch, getState) => {
      const { subTotal, arraySkus, descuento, totalFinal, pagoEfecitivo, tarjeta, dataCaja, pagoConTarjeta } = getState().puntoDeVenta;
  
      const fechaActual = new Date();
      const dia = fechaActual.getDate().toString().padStart(2, '0');
      const mes = (fechaActual.getMonth() + 1).toString().padStart(2, '0');
      const strFechaVenta = `${fechaActual.getFullYear()}-${mes}-${dia}`;
      const data = {
        "strFechaVenta": strFechaVenta,
        "lngSubTotal": subTotal,
        "articulos": arraySkus,
        "lngDescuento": descuento,
        "lngTotalFinal": totalFinal,
        "lngPagoEfectivo": pagoEfecitivo,
        "lngPagoTarjeta": tarjeta,
        "noCaja": dataCaja.noCaja,
        "idUsuario": dataCaja.idUser,
        "pagoConTarjeta": pagoConTarjeta,
      };
  
      try {
        const resp = await Ventas.registroVenta(data);
        dispatch(clean());
        return { ok: true, id: resp.data.id };
      } catch (error) {
        return {ok: false, error: error.errorMessage};
      }
    };
  };

  export const startResetandClean=()=>{
    return async(dispatch,getState)=>{
      dispatch(clean());
    }
  }

  export const startConsultarVentas=()=>{
    return async(dispatch,getState)=>{
      try{
        const resp = await Ventas.consultartVentas();
        if(resp){
        dispatch(setConsultarVentas(resp));
        return {ok: true};
        }else{
          return {ok: false};
        }
      }catch(error){
        return{ok: false}
      }
    }
  }

  export const startDeleteVenta=(id)=>{
    return async(dispatch, getState)=>{
      try{
        const resp = await Ventas.delteRegistro(id);
        if(resp){
          dispatch(removeVenta(id));
          return {ok: true}
        }else{
          return {ok: false}
        }
      }catch(error){
        return{ok: false}
      }
    }
  }

  export const startDetalleVenta=(id)=>{
    return async(dispatch)=>{
      dispatch(setIsLoading(true));
      dispatch(setMenuView('detalleVenta'));
      let dataArticulos = [];
      for(let a=0; a<id.articulos.length; a++){
        try{
          const resp = await InventariosApi.consultarById(id.articulos[a]);
          dataArticulos.push(resp);
        }catch(error){
          return false;
        }
      }
      dispatch(setDetalleVenta({id, dataArticulos}));
      dispatch(setIsLoading(false));
    }
  }

  export const startBuscarVentaPorFecha=(strFechaDeVenta)=>{
    return async(dispatch)=>{
    try{
      const resp = await Ventas.findByStrFechaDeVenta(strFechaDeVenta);
      dispatch(setConsultarVentas(resp));
      return {ok: true};
    }catch(error){
      return{ok: false}
    }
  }
  }

  export const startSetDataCaja=()=>{
    return async(dispatch,getState)=>{
      const {id} = getState().auth;
      const resp = await Caja.consultaCaja(id);
      dispatch(setDataCaja(resp));
    }
  }

  export const startCaja=()=>{
    return async(dispatch,getState)=>{
      const {id} = getState().auth;
      try{
        const resp = await Caja.consultaCaja(id);
        if(resp){
          if(resp.status){
          dispatch(setDataCaja(resp));
          dispatch(setView("facturacion"));
          }else{
            dispatch(setDataCaja(resp));
            dispatch(setView("cajaCerrada"));
          }
        }else{
          dispatch(setView("apertura"));
        }
      }catch(erro){
        console.log(error);
      }
    }
  }

  export const startAperturaCaja=(fondo)=>{
    return async(dispatch,getState)=>{
      const {id} = getState().auth;
      try{
        const resp = await Caja.apertura(fondo, id);
        if(resp){
          dispatch(setDataCaja(resp));
          dispatch(setView("facturacion"));
        }else{
          dispatch(seterro("apertura"));
        }
      }catch(error){
        return error;
      }
    }
  }

  export const addDescuento=(descuento)=>{
    return async(dispatch, getState)=>{
      dispatch(setAddDescuento(descuento));
      dispatch(setTotalFinal());
    }
  }

  export const calcularMoney = (formState) => {
    return async (dispatch, getState) => {
      const mm1 = (formState.m1!='') ? parseFloat(formState.m1)*1 : 0;
      const mm2 = (formState.m2!='') ?parseFloat(formState.m2)*2 : 0;
      const mm5 = (formState.m5!='') ?parseFloat(formState.m5)*5 : 0;
      const mm10 = (formState.m10!='') ?parseFloat(formState.m10)*10 : 0;
      const mm20 = (formState.m20!='') ? parseFloat(formState.m20)*20 : 0;
      const bb20 = (formState.b20!='') ?parseFloat(formState.b20)*20 : 0;
      const bb50 = (formState.b50!='') ?parseFloat(formState.b50)*50 : 0;
      const bb100 = (formState.b100!='') ?parseFloat(formState.b100)*100 : 0;
      const bb200 = (formState.b200!='') ?parseFloat(formState.b200)*200 : 0;
      const bb500 = (formState.b500!='') ?parseFloat(formState.b500)*500 : 0;
      const bb1000 = (formState.b1000!='') ?parseFloat(formState.b1000)*1000 : 0;
      const lngMontoRetiro = mm1+mm2+mm5+mm10+mm20+bb20+bb50+bb100+bb200+bb500+bb1000;
      dispatch(setMontoRetirar(lngMontoRetiro));
    };
  };
  
  export const startSendRetiro=(formState)=>{
    return async(dispatch, getState)=>{
    const {dataCaja, montoRetirar} = getState().puntoDeVenta;
    const fechaActual = new Date();
    const dia = fechaActual.getDate().toString().padStart(2, '0');
    const mes = (fechaActual.getMonth() + 1).toString().padStart(2, '0');
    const strFecha = `${fechaActual.getFullYear()}-${mes}-${dia}`;
    const dataApi={
      strFecha: strFecha,
      noCaja: dataCaja.noCaja,
      lngModenasUno: (formState.m1!='')? parseFloat(formState.m1):0,
      lngModenasDos: (formState.m1!='') ? parseFloat(formState.m2):0,
      lngModenasCinco: (formState.m1!='') ? parseFloat(formState.m5):0,
      lngModenasDiez: (formState.m1!='') ? parseFloat(formState.m10):0,
      lngModenasVenite: (formState.m1!='') ? parseFloat(formState.m20):0,
      lngModenasVenite: (formState.m1!='') ? parseFloat(formState.b20):0,
      lngBilletesCincuenta: (formState.m1!='') ? parseFloat(formState.b50):0,
      lngBilletesCien: (formState.m1!='') ? parseFloat(formState.b100):0,
      lngBilletesDoscientos: (formState.m1!='') ? parseFloat(formState.b200):0,
      lngBilletesQuinientos: (formState.m1!='') ? parseFloat(formState.b500):0,
      lngBilletesMil: (formState.m1!='') ? parseFloat(formState.b1000):0,
      lngMontoRetiro: montoRetirar,
    }
    try{
      const resp = await Retiros.enviarRetiro(dataApi);
      if(resp){
        dispatch(setView("facturacion"));
        dispatch(clean());
        return resp;
      }
    }catch(error){
      return {ok: false, error: error.message}
    }
  }
}

  export const startCerrarCaja=()=>{
    return async(dispatch, getState)=>{
      const {dataCaja} = getState().puntoDeVenta;
      const noCaja = dataCaja.noCaja;
      const fechaActual = new Date();
      const dia = fechaActual.getDate().toString().padStart(2, '0');
      const mes = (fechaActual.getMonth() + 1).toString().padStart(2, '0');
      const strFechaCierre = `${fechaActual.getFullYear()}-${mes}-${dia}`;
      try{
      const resp = await Caja.cerrarCaja(noCaja,strFechaCierre);
      if(resp){dispatch(setView("cajaCerrada"))}
      }catch(error){
      return error;
      }
    }
  }

  export const startDeleteCaja=(noCaja)=>{
    return async(dispatch)=>{
      try{
        const resp = await Caja.deleteCaja(noCaja);
        if(resp){dispatch(setDeleteCaja(noCaja));}
      }catch(error){
        return error;
      }
    }
  }


  