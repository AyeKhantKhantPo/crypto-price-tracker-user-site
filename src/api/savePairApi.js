import { baseUrl} from '../config/config';


export const fetchSavedPairsApi = async (username) => {
  const url = `${baseUrl}/save-currency-pair/${username}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.savedPairs;
  } catch (error) {
    throw new Error(`Error fetching saved pairs: ${error}`);
  }
};


export const saveCurrencyPairApi = async (username, pair) => {
  const url = `${baseUrl}/save-currency-pair`;

  try {
    const savePayload = {
      username: username,
      pair: pair,
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(savePayload),
    });

    if (response.ok) {
      console.log('Currency pair saved:', response);
    } else {
      const errorMessage = await response.text();
      throw new Error(errorMessage);
    }
  } catch (error) {
    throw new Error(`Error saving currency pair: ${error}`);
  }
};

