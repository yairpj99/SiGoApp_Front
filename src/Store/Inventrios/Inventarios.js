import { createSlice } from "@reduxjs/toolkit"

export const InventariosSlice = createSlice({
    name: 'inventarios',
    initialState:{
        view: 'home',
        inventarios: '0',
        errorMessage: '',
        gestionSku: '',
        etiquetaSku: '',
    },
    reducers:{
        setInventarios:(state, action)=>{
            state.inventarios=action.payload;
        },
        setErrorMesaje:(state, action)=>{
            state.errorMessage="Error al realizar la consulta";
        },
        setView:(state,action)=>{
            state.view=action.payload;
        },
        setGestionSku:(state,action)=>{
            state.gestionSku=action.payload;
        },
        setEtiqeutaSKU:(state,action)=>{
            state.etiquetaSku=action.payload;
        }
    }
});

export const {setInventarios, setErrorMesaje, setView, 
    setGestionSku, setEtiqeutaSKU}=InventariosSlice.actions;