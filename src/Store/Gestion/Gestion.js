import { createSlice } from "@reduxjs/toolkit"

export const GestionSlice = createSlice({
    name: 'gestion',
    initialState:{
        view: 'home',
        consultaUsuarios: {},
        pointOfSales: {},
        consultaRetiro: {},
        detalleRetiro: {},
        errorMessage: '',
    },
    reducers:{
        setView:(state,action)=>{
            state.view=action.payload;
        },
        setConsultaUsuarios:(state,action)=>{
            state.consultaUsuarios=action.payload;
        },
        setPointOfSales:(state,action)=>{
            state.pointOfSales=action.payload;
            state.errorMessage='';
        },
        setError:(state,action)=>{
            state.errorMessage=action.payload;
        },
        removeUser:(state,action)=>{
            state.consultaUsuarios=state.consultaUsuarios.filter(user => user.id !== action.payload);
        },
        setRetiros:(state,action)=>{
            state.consultaRetiro=action.payload;
            state.errorMessage='';
        },
        setDeleteCaja:(state,action)=>{
            state.pointOfSales=state.pointOfSales.filter(caja => caja.noCaja !== action.payload);
        },
        setDetalleRetiro:(state,action)=>{
            state.detalleRetiro=action.payload;
        }
    }
});

export const {setView, setConsultaUsuarios, removeUser,
    setPointOfSales, setError, setRetiros, setDeleteCaja,
    setDetalleRetiro }=GestionSlice.actions;