import { createSlice } from "@reduxjs/toolkit"

export const PuntoDeVentaSlice = createSlice({
    name: 'puntoDeVenta',
    initialState:{
        view: 'loading',
        dataCaja: {},
        viewPago: 'pago',
        viewMenu: 'inicio',
        menu: {
            consultaVentas: {},
            detalleVenta: {},
            detalleArticulos: {},
            isLoading: false,
        },
        articulosFacturacion: [],
        arraySkus: [],
        subTotal: 0,
        descuento: 0,
        descuentos: [],
        totalFinal: 0,
        cubierto: 0,
        faltaPorPagar: 0,
        pagoEfecitivo: 0,
        tarjeta: 0,
        cambio: 0,
        pagoConTarjeta: {},
        montoRetirar: '',
    },
    reducers:{
        addArticulo:(state,action)=>{
            state.articulosFacturacion.push(action.payload);
            state.arraySkus.push(action.payload.id);
            state.subTotal=state.subTotal+action.payload.lngImporte;
        },
        deleteArticulo: (state, action) => {
            state.subTotal=state.subTotal-state.articulosFacturacion[action.payload].lngImporte;
            state.articulosFacturacion = state.articulosFacturacion.filter((item, index) => index !== action.payload);
            state.arraySkus = state.arraySkus.filter((item, index) => index !== action.payload);  
        },
        setTotalFinal:(state,action)=>{
            state.totalFinal=state.subTotal-state.descuento;
            state.faltaPorPagar=state.totalFinal-state.cubierto;
            if(state.faltaPorPagar<0){
                state.cambio=state.faltaPorPagar*-1;
                state.faltaPorPagar=0;
            }
        },
        setView:(state,action)=>{
            state.view=action.payload;
        },
        setViewPago:(state,action)=>{
            state.viewPago=action.payload;
        },
        setPagoEfectivo:(state,action)=>{
            state.pagoEfecitivo=state.pagoEfecitivo+action.payload;
            state.cubierto=state.cubierto+action.payload;
        },
        setPagoTarjeta:(state,action)=>{
            state.tarjeta=state.tarjeta+action.payload;
            state.cubierto=state.cubierto+action.payload;
        },
        clean: (state, action) => {
            state.view = 'facturacion';
            state.viewMenu = 'inicio'
            state.viewPago = 'pago';
            state.articulosFacturacion = [];
            state.arraySkus = [];
            state.subTotal = 0;
            state.descuento = 0;
            state.descuentos=[];
            state.totalFinal = 0;
            state.cubierto = 0;
            state.faltaPorPagar = 0;
            state.pagoEfecitivo = 0;
            state.tarjeta = 0;
            state.cambio = 0;
            state.menu.consultaVentas = {}
            state.menu.detalleVenta = {}
            state.menu.detalleArticulos = {}
            state.montoRetirar = 0
          },
          setMenuView:(state,action)=>{
            state.viewMenu = action.payload;
          },
          setConsultarVentas:(state,action)=>{
            state.menu.consultaVentas=action.payload;
          },
          removeVenta:(state,action)=>{
            state.menu.consultaVentas=state.menu.consultaVentas.filter(venta=>venta.id!==action.payload);
          },
          setDetalleVenta:(state,action)=>{
            state.menu.detalleVenta=action.payload.id;
            state.menu.detalleArticulos=action.payload.dataArticulos;
          },
          setIsLoading:(state,action)=>{
            state.menu.isLoading=action.payload;
          },
          setDataCaja:(state,action)=>{
            state.dataCaja=action.payload;
          },
          setPagoConTarjeta:(state,action)=>{
            state.pagoConTarjeta=action.payload;
          },
          setMontoRetirar:(state,action)=>{
            state.montoRetirar=action.payload;
          },
          setAddDescuento:(state,action)=>{
            state.descuentos.push(action.payload);
            state.descuento=state.descuento+action.payload.amount;
            state.view='facturacion';
          },
    }
      
});

export const {addArticulo, deleteArticulo, setTotalFinal, 
    setView, setViewPago, setPagoEfectivo, setPagoTarjeta, 
    clean, setMenuView, setConsultarVentas, removeVenta
    ,setDetalleVenta, setIsLoading, setDataCaja,
    setPagoConTarjeta, setMontoRetirar, setAddDescuento}=PuntoDeVentaSlice.actions;