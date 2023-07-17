import { baseUrl } from '../config/config';

const signUpUser = async (userData) => {
  try {
    const response = await fetch(`${baseUrl}/users/sign-up`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (response.ok) {
      return response.json();
    } else {
      const errorMessage = await response.text();
      throw new Error(errorMessage);
    }
  } catch (error) {
    throw new Error(error);
  }
};

export default signUpUser;
