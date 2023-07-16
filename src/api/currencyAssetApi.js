const fetchCurrencyAssetHistoricalData = async (id, interval) => {
  try {
    const response = await fetch(`https://api.coincap.io/v2/assets/${id}/history?interval=${interval}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Error fetching currency historical data:', error);
  }
};

export default fetchCurrencyAssetHistoricalData;
