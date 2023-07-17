import axios from 'axios';
import { ratesCrypto } from '../config/config';

const fetchCurrencyRate = async () => {
  try {
    const response = await axios.get(ratesCrypto);
    return response.data.data;
  } catch (error) {
    console.log('Error fetching currency rates:', error);
    return [];
  }
};

export default fetchCurrencyRate;
