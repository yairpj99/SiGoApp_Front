
import axios from 'axios';

const API_URL = 'http://localhost:8080';

const createNewUser = async (formState) => {
  try {
    const response = await axios.post(`${API_URL}/users`, {
        "password": "",
        "cdata":formState
    });

    // Manejar la respuesta del servidor, por ejemplo, almacenar el token en el estado de tu aplicación.
    const token = response;
    // Puedes almacenar el token en el estado, en una cookie, en el almacenamiento local, etc.
    return token.data.id;
  } catch (error) {
    // Manejar errores, por ejemplo, mostrar un mensaje de error al usuario.
    console.error(error);
    throw error;
  }
};

const changePassword = async (userId, newPassword) => {
  try {
    const response = await axios.put(
      `${API_URL}/users/${userId}/changePassword`,
      newPassword,
      {
        headers: {
          'Content-Type': 'text/plain',
        },
      }
    );

    // Handle the server response, e.g., store the token in your application state.
    const token = response;
    // You can store the token in the state, cookie, local storage, etc.
    return token.data.id;
  } catch (error) {
    // Handle errors, e.g., display an error message to the user.
    console.error(error);
    throw error;
  }
};


export default { createNewUser, changePassword };
