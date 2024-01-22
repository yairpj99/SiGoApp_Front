import Auth from "../../Api/Auth";
import { setErrorMesaje, setLogOut, setLogin } from "./auth";

export const startLogin = (id, password) => {
  return async (dispatch, getState) => { 
    try {
      const token = await Auth.login(id, password);
      await dispatch(setLogin(token));
    } catch (error) {
      dispatch(setErrorMesaje("El usuario y la contraseña son incorrectos"));
    }
  };
};

export const startLogOut=()=>{
  return async(dispatch, getState)=>{
    dispatch(setLogOut());
  }
}
