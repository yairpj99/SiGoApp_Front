
import axios from 'axios';

const API_URL = 'http://localhost:8080';

const consultarInventarios = async () => {
  try {
    const response = await axios.get(`${API_URL}/inventario`)
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

const newArticulo = async (formState) => {
  try {
    const response = await axios.post(`${API_URL}/inventario`, {
      "strDescripcion": formState.strDescripcion,
      "strMarca": formState.strMarca,
      "strCategoria": formState.strCategoria,
      "strTalla": formState.strTalla,
      "lngPrecioUnitario": formState.lngPrecioUnitario,
      "lngDescuentoDirecto": formState.lngDescuentoDirecto,
      "lngCantidad": formState.lngCantidad,
      "strAlmacen": formState.strAlmacen
  });
    // Manejar la respuesta del servidor, por ejemplo, almacenar el token en el estado de tu aplicación.
    const token = response;
    // Puedes almacenar el token en el estado, en una cookie, en el almacenamiento local, etc.
    return token
  } catch (error) {
    // Manejar errores, por ejemplo, mostrar un mensaje de error al usuario.
    console.error(error);
    throw error;
  }
};

const consultarById = async(id)=>{
  try {
    const response = await axios.get(`${API_URL}/inventario/${id}`)
    // Manejar la respuesta del servidor, por ejemplo, almacenar el token en el estado de tu aplicación.
    const token = response;
    // Puedes almacenar el token en el estado, en una cookie, en el almacenamiento local, etc.
    return token.data;
  } catch (error) {
    // Manejar errores, por ejemplo, mostrar un mensaje de error al usuario.
    console.error(error);
    throw error;
  }
}

const consultarByCategoria = async(strCategoria)=>{
  try {
    const response = await axios.get(`${API_URL}/inventario/categoria/${strCategoria}`)
    // Manejar la respuesta del servidor, por ejemplo, almacenar el token en el estado de tu aplicación.
    const token = response;
    // Puedes almacenar el token en el estado, en una cookie, en el almacenamiento local, etc.
    return token.data;
  } catch (error) {
    // Manejar errores, por ejemplo, mostrar un mensaje de error al usuario.
    console.error(error);
    throw error;
  }
}

const consultarByMarca = async(strMarca)=>{
  try {
    const response = await axios.get(`${API_URL}/inventario/marca/${strMarca}`)
    // Manejar la respuesta del servidor, por ejemplo, almacenar el token en el estado de tu aplicación.
    const token = response;
    // Puedes almacenar el token en el estado, en una cookie, en el almacenamiento local, etc.
    return token.data;
  } catch (error) {
    // Manejar errores, por ejemplo, mostrar un mensaje de error al usuario.
    console.error(error);
    throw error;
  }
}

const deleteById = async(id)=>{
  try {
    const response = await axios.delete(`${API_URL}/inventario/${id}`)
    // Manejar la respuesta del servidor, por ejemplo, almacenar el token en el estado de tu aplicación.
    const token = response;
    // Puedes almacenar el token en el estado, en una cookie, en el almacenamiento local, etc.
    return token.data;
  } catch (error) {
    // Manejar errores, por ejemplo, mostrar un mensaje de error al usuario.
    console.error(error);
    throw error;
  }
}

const agregarArticulosInventario = async(sku)=>{
  try{
    const response = await axios.put(`${API_URL}/inventario/agregarUno/${sku}`);
    return response.data;
  }catch(error){
    throw error.response.data;
  }
}





export default { consultarInventarios, newArticulo, consultarById, deleteById, 
  consultarByCategoria, consultarByMarca, agregarArticulosInventario};
