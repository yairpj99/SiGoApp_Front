
import axios from 'axios';

const API_URL = 'http://localhost:8080';

const consultaCaja = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/caja/consulta/${id}`);

    // Manejar la respuesta del servidor, por ejemplo, almacenar el token en el estado de tu aplicación.
    const token = response;
    // Puedes almacenar el token en el estado, en una cookie, en el almacenamiento local, etc.

    return token.data;
  } catch (error) {
    // Manejar errores, por ejemplo, mostrar un mensaje de error al usuario.
    console.error('Error en la autenticación:', error);
    throw error;
  }
};
const consultarCajas = async () => {
  try {
    const response = await axios.get(`${API_URL}/caja/cajas`);

    // Manejar la respuesta del servidor, por ejemplo, almacenar el token en el estado de tu aplicación.
    const token = response;
    // Puedes almacenar el token en el estado, en una cookie, en el almacenamiento local, etc.

    return token.data;
  } catch (error) {
    // Manejar errores, por ejemplo, mostrar un mensaje de error al usuario.
    console.error('Error en la autenticación:', error);
    throw error;
  }
};

const apertura = async (fondo, idUser) => {
  try {
    const response = await axios.post(`${API_URL}/caja`,{
        "idUser": idUser,
        "lngFondoDeCaja": fondo,
        "lngVentas": 0,
        "lngArticulosVendidos": 0,
        "lngEfectivoEnCaja": 0,
        "lngTotalCobrado": 0,
        "lngEfectivo": 0,
        "lngTarjeta": 0,
        "status": true
    });

    // Manejar la respuesta del servidor, por ejemplo, almacenar el token en el estado de tu aplicación.
    const token = response;
    // Puedes almacenar el token en el estado, en una cookie, en el almacenamiento local, etc.

    return token.data;
  } catch (error) {
    // Manejar errores, por ejemplo, mostrar un mensaje de error al usuario.
    console.error('Error en la autenticación:', error);
    throw error.response.data;
  }
};
const cerrarCaja = async (noCaja, strFechaCierre) => {
  try {
    const response = await axios.put(`${API_URL}/caja/cerrarCaja/${noCaja}/${strFechaCierre}`)

    // Manejar la respuesta del servidor, por ejemplo, almacenar el token en el estado de tu aplicación.
    const token = response;
    // Puedes almacenar el token en el estado, en una cookie, en el almacenamiento local, etc.

    return token.data;
  } catch (error) {
    throw error.response.data;
  }
};

const deleteCaja = async (noCaja) => {
  try {
    const response = await axios.delete(`${API_URL}/caja/eliminar/${noCaja}`)

    // Manejar la respuesta del servidor, por ejemplo, almacenar el token en el estado de tu aplicación.
    const token = response;
    // Puedes almacenar el token en el estado, en una cookie, en el almacenamiento local, etc.

    return token.data;
  } catch (error) {
    throw error.response.data;
  }
};

export default { consultaCaja, apertura,consultarCajas, cerrarCaja, deleteCaja };
