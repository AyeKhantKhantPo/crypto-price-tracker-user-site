import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import fetchCurrencyRate from '../api/currencyRateApi';
import '../styles/CurrencyPairListContainer.css';

const CurrencyPairListContainer = () => {
  const [currencyPairs, setCurrencyPairs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchCurrencyRate();
        const pairs = [];
        let count = 1
        data.forEach((item, index) => {
          for (let i = index + 1; i < data.length; i++) {
            const base = item.symbol;
            const quote = data[i].symbol;
            const baseRate = parseFloat(item.rateUsd);
            const quoteRate = parseFloat(data[i].rateUsd);
            const price = baseRate / quoteRate;

            const pair = {
              number: count++,
              pair: `${base}/${quote}`,
              price: `$${price.toFixed(5)}`
            };

            pairs.push(pair);
          }
        });

        setCurrencyPairs(pairs);
        setIsLoading(false);
      } catch (error) {
        console.log('Error fetching currency pairs:', error);
      }
    };

    fetchData();
  }, []);

  const columns = [
    {
      title: 'No.',
      field: 'number',
      type: 'numeric',
      align: 'left',
      cellStyle: {
        textAlign: 'left'
      }
    },
    {
      title: 'Currency Pair',
      field: 'pair',
      align: 'left',
      cellStyle: {
        textAlign: 'left'
      }
    },
    {
      title: 'Price',
      field: 'price',
      align: 'left',
      cellStyle: {
        textAlign: 'left'
      }
    },
  ];

  return (
    <MaterialTable
      title="Crypto Currency Pair Price List"
      columns={columns}
      data={currencyPairs}
      isLoading={isLoading}
      options={{
        padding: 'dense',
        pageSize: 100,
        pageSizeOptions: [100, 150, 200, 250, 300],
        emptyRowsWhenPaging: false,
        sorting: true,
        headerStyle: {
          backgroundColor: '#EEE'
        },
      }}
    />
  );
};

export default CurrencyPairListContainer;
