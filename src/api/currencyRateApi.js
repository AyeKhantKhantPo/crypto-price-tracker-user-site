import axios from 'axios';

const fetchCurrencyRate = async () => {
  try {
    const response = await axios.get('https://api.coincap.io/v2/rates');
    return response.data.data;
  } catch (error) {
    console.log('Error fetching currency rates:', error);
    return [];
  }
};

export default fetchCurrencyRate;
