import Caja from "../../Api/Caja";
import CreateNewUser from "../../Api/CreateNewUser";
import DeleteUser from "../../Api/DeleteUser";
import Retiros from "../../Api/Retiros";
import UserConsult from "../../Api/UserConsult";
import { removeUser, setConsultaUsuarios, setDetalleRetiro, setError, setPointOfSales, setRetiros, setView } from "./Gestion"

export const startSetView=(view)=>{
    return async(dispatch)=>{
        dispatch(setView(view));
    }
}

export const createNewUser=(formState, password)=>{
    return async(dispatch, getState)=>{
        try{
            const token = await CreateNewUser.createNewUser(formState);
            return token;
        }catch(error){
            console.log(error);
            return false;
        }
    }
}

export const startConsultUsuarios=()=>{
    return async(dispatch, getState)=>{
        try{
            const token = await UserConsult.userConsult();
            dispatch(setConsultaUsuarios(token));
        }catch(error){
            console.log(error);
            return false;
        }
    }
}

export const startDeleteUser=(idUser)=>{
    return async(dispatch,getState)=>{
        try{
            const token = await DeleteUser.deleteUser(idUser);
            dispatch(removeUser(idUser));
            return token;
        }catch(error){
            console.log(error);
            return false;
        }
    }
}

export const startChangePassword=(newPassword)=>{
    return async(dispatch,getState)=>{
        const {id} = getState().auth;
        try{
        await CreateNewUser.changePassword(id,newPassword);
        return "La contraseña ha sido modificada!!!"
        }catch(error){
            return error;
        }
    }
}

export const startSearchPointOfSales=()=>{
    return async(dispatch, getState)=>{
        try{
            const resp = await Caja.consultarCajas();
            if(resp){dispatch(setPointOfSales(resp))};
        }catch(error){
            dispatch(setError(error));
        }
    }
}

export const startConsultaRetiros=()=>{
    return async(dispatch, getState)=>{
        try{
            const resp = await Retiros.consultarRetiros();
            if(resp){dispatch(setRetiros(resp));}
        }catch(error){
            dispatch(setError(error));
        }
    }
}

export const startConsultaRetirosNoCaja=(noCaja)=>{
    return async(dispatch)=>{
        try{
            const resp = await Retiros.consultarRetirosnoCaja(noCaja);
            if(resp){dispatch(setRetiros(resp));}
        }catch(error){
            dispatch(setError(error));
        }
    }
}

export const startConsultaRetirosFecha=(strFecha)=>{
    return async(dispatch, getState)=>{
        try{
            const resp = await Retiros.consultarRetirosFecha(strFecha);
            if(resp){dispatch(setRetiros(resp));}
        }catch(error){
            dispatch(setError(error));
        }
    }
}

export const startDetalleRetiro=(data)=>{
    return async(dispatch)=>{
        dispatch(setDetalleRetiro(data));
        dispatch(setView('detalleRetiro'));
    }
}