// store.js
import { configureStore } from '@reduxjs/toolkit';
import { AuthSlice } from './auth/auth';
import { GestionSlice } from './Gestion/Gestion';
import { InventariosSlice } from './Inventrios/Inventarios';
import { PuntoDeVentaSlice } from './PuntoDeVenta/PuntoDeVenta';

const store = configureStore({
  reducer: {
    auth: AuthSlice.reducer,
    gestion: GestionSlice.reducer,
    inventarios: InventariosSlice.reducer,
    puntoDeVenta: PuntoDeVentaSlice.reducer,
  },
});

export default store;
