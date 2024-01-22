
import axios from 'axios';

const API_URL = 'http://localhost:8080';

const login = async (id, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      id: id,
      password: password,
    });

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

export default { login };
