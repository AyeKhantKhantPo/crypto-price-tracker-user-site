import { baseUrl } from '../config/config';


const signInUser = async (userData) => {
  const url = `${baseUrl}/users/sign-in`;


  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      const errorMessage = await response.text();
      throw new Error(errorMessage);
    }
  } catch (error) {
    throw new Error(error);
  }
};

export default signInUser;
