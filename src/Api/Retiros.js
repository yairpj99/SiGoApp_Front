
import axios from 'axios';

const API_URL = 'http://localhost:8080';

const consultarRetiros = async () => {
  try {
    const response = await axios.get(`${API_URL}/retiros`);

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

const consultarRetirosFecha = async (strFecha) => {
  try {
    const response = await axios.get(`${API_URL}/retiros/fecha/${strFecha}`);

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

const consultarRetirosnoCaja = async (noCaja) => {
  try {
    const response = await axios.get(`${API_URL}/retiros/noCaja/${noCaja}`);
    const token = response;
    return token.data;
  } catch (error) {
    // Manejar errores, por ejemplo, mostrar un mensaje de error al usuario.
    throw error;
  }
};

const enviarRetiro = async (data)=>{
  try{
    const response = await axios.post(`${API_URL}/retiros/nuevoRetiro`,data);
    return response.data;
  }catch(error){
    throw error;
  }
}

export default { consultarRetiros, enviarRetiro, consultarRetirosFecha, consultarRetirosnoCaja };
