import axios from 'axios';

const fetchCurrencyPairs = async () => {
  try {
    const response = await axios.get('https://api.coincap.io/v2/rates');
    return response.data.data;
  } catch (error) {
    console.log('Error fetching currency pairs:', error);
    return [];
  }
};

export default fetchCurrencyPairs;
