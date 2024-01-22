
import axios from 'axios';

const API_URL = 'http://localhost:8080';

const consultartVentas = async () => {
  try {
    const response = await axios.get(`${API_URL}/ventas`)
    // Manejar la respuesta del servidor, por ejemplo, almacenar el token en el estado de tu aplicación.
    const token = response;
    // Puedes almacenar el token en el estado, en una cookie, en el almacenamiento local, etc.
    return token.data;
  } catch (error) {
    // Manejar errores, por ejemplo, mostrar un mensaje de error al usuario.
    console.error(error);
    throw error;
  }
};

const registroVenta = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/ventas`,data);
    // Manejar la respuesta del servidor, por ejemplo, almacenar el token en el estado de tu aplicación.
    const token = response;
    // Puedes almacenar el token en el estado, en una cookie, en el almacenamiento local, etc.
    return token
  } catch (error) {
    // Manejar errores, por ejemplo, mostrar un mensaje de error al usuario.
    throw error.response.data;;
  }
};

const delteRegistro = async(id)=>{
  try {
    const response = await axios.delete(`${API_URL}/ventas/${id}`);
    // Manejar la respuesta del servidor, por ejemplo, almacenar el token en el estado de tu aplicación.
    const token = response;
    // Puedes almacenar el token en el estado, en una cookie, en el almacenamiento local, etc.
    return token
  } catch (error) {
    // Manejar errores, por ejemplo, mostrar un mensaje de error al usuario.
    throw error.response.data;;
  }
}

const findByStrFechaDeVenta = async(strFechaDeVenta)=>{
  try {
    const response = await axios.get(`${API_URL}/ventas/fecha/${strFechaDeVenta}`);
    // Manejar la respuesta del servidor, por ejemplo, almacenar el token en el estado de tu aplicación.
    const token = response;
    // Puedes almacenar el token en el estado, en una cookie, en el almacenamiento local, etc.
    return token.data
  } catch (error) {
    // Manejar errores, por ejemplo, mostrar un mensaje de error al usuario.
    throw error.response.data;
  }
}

const findByid = async(id)=>{
  try {
    const response = await axios.get(`${API_URL}/ventas/${id}`);
    // Manejar la respuesta del servidor, por ejemplo, almacenar el token en el estado de tu aplicación.
    const token = response;
    // Puedes almacenar el token en el estado, en una cookie, en el almacenamiento local, etc.
    return token.data
  } catch (error) {
    // Manejar errores, por ejemplo, mostrar un mensaje de error al usuario.
    throw error.response.data;
  }
}

export default { registroVenta, consultartVentas, delteRegistro,findByStrFechaDeVenta, findByid };
