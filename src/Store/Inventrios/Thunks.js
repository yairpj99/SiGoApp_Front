import InventariosApi from "../../Api/InventariosApi"
import { setErrorMesaje, setEtiqeutaSKU, setGestionSku, setInventarios, setView } from "./Inventarios";

export const startSetInventarios=()=>{
    return async (dispatch, getState)=>{
        try{
        const resp = await InventariosApi.consultarInventarios();
        dispatch(setInventarios(resp));
        return true;
        }catch(error){
            dispatch(setErrorMesaje("Error al realizar la consutla!!!"));
        }
    }
}

export const startSetView=(view)=>{
    return async(dispatch, getState)=>{
        dispatch(setView(view));
    }
}

export const startNewArticulo=(formState)=>{
    return async(dispatch, getState)=>{
        try{
        const resp = await InventariosApi.newArticulo(formState);
        if(resp.status==201){return resp.data.id}
        }catch(error){
        console.log(error.message);
        return false;
        }
    }
}

export const startSerInventariosBySku=(sku)=>{
    return async(dispatch, getState)=>{
        try{
            const resp = await InventariosApi.consultarById(sku)
            dispatch(setInventarios(resp));
            return {
                ok: true,
                data: resp,
            };
            }catch(error){
                dispatch(setErrorMesaje("Error al realizar la consutla!!!"));
            }
        }
}

export const startSerInventariosByCategoria=(strCategoria)=>{
    return async(dispatch, getState)=>{
        try{
            const resp = await InventariosApi.consultarByCategoria(strCategoria)
            dispatch(setInventarios(resp));
            return true;
            }catch(error){
                dispatch(setErrorMesaje("Error al realizar la consutla!!!"));
            }
        }
}

export const startSerInventariosByMarca=(strMarca)=>{
    return async(dispatch)=>{
        try{
            const resp = await InventariosApi.consultarByMarca(strMarca)
            dispatch(setInventarios(resp));
            return true;
            }catch(error){
                dispatch(setErrorMesaje("Error al realizar la consutla!!!"));
            }
        }
}

export const startGestionInventariosSku=(sku)=>{
    return async(dispatch,getState)=>{
        try{
            const resp = await InventariosApi.consultarById(sku);
            dispatch(setGestionSku(resp));
        }catch(error){
            dispatch(setErrorMesaje("Error al realizar la consutla!!!"));
        }
    }
}

export const deleteSkuById=(sku)=>{
    return async(dispatch)=>{
        try{
            const resp = await InventariosApi.deleteById(sku);
            dispatch(setInventarios(''));
            return resp;
        }catch(error){
            return false;
        }
    }
}

export const startSKUConsult=(sku)=>{
    return async(dispatch)=>{
        try{
            const resp = await InventariosApi.consultarById(sku)
            dispatch(setEtiqeutaSKU(resp));
            return {
                ok: true,
                data: resp,
            };
            }catch(error){
                dispatch(setErrorMesaje("Error al realizar la consutla!!!"));
                return{
                    ok: false,
                }
            }
        }
}

export const startAgregarUnArticuloAlInventario=(sku)=>{
    return async()=>{
      try{
        const resp = await InventariosApi.agregarArticulosInventario(sku);
        return {ok: true};
      }catch(error){
        return {ok: false, errorMessage: error}
      }
    }
  }