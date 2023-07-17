import { assetHistoricalData } from '../config/config';


const fetchCurrencyAssetHistoricalData = async (id, interval, start, end) => {
  try {
    let url = `${assetHistoricalData}/${id}/history?interval=${interval}`;
    
    if (start && end) {
      const startTime = new Date(start).getTime();
      const endTime = new Date(end).getTime();
      url = `${url}&start=${startTime}&end=${endTime}`;
    }

    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Error fetching currency historical data:', error);
  }
};

export default fetchCurrencyAssetHistoricalData;
