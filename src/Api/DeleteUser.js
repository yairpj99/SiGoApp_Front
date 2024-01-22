
import axios from 'axios';

const API_URL = 'http://localhost:8080';

const deleteUser = async (userId) => {
  try {
    const response = await axios.delete(`${API_URL}/users/${userId}`)
    // Manejar la respuesta del servidor, por ejemplo, almacenar el token en el estado de tu aplicación.
    const token = response.data;
    // Puedes almacenar el token en el estado, en una cookie, en el almacenamiento local, etc.
    return token;
  } catch (error) {
    // Manejar errores, por ejemplo, mostrar un mensaje de error al usuario.
    console.error(error);
    throw error;
  }
};

export default { deleteUser };
