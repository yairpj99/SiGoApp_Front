import { createSlice } from "@reduxjs/toolkit"

export const AuthSlice = createSlice({
    name: 'auth',
    initialState:{
        auth: false,
        id: '1',
        data: {},
        errorMessaje: ''
    },
    reducers:{
        setLogin:(state,action)=>{
            state.id=action.payload.id;
            state.data=action.payload.cdata;
            state.auth=true;
            state.errorMessaje="";
        },
        setErrorMesaje:(state,action)=>{
            state.errorMessaje="Usuario y/o contraseña incorrecto";
        },
        setLogOut:(state,action)=>{
            state.auth=false;
            state.data={};
            state.id="";
            state.errorMessaje="";
        }
    }
});

export const {setLogin, setErrorMesaje, setLogOut}=AuthSlice.actions;