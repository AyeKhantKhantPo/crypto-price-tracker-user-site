import React, { useState, useEffect, useContext } from 'react';
import MaterialTable from 'material-table';
import fetchCurrencyRate from '../api/currencyRateApi';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import IconButton from '@mui/material/IconButton';
import '../styles/CurrencyPairListContainer.css';
import AuthContext from '../AuthContext';
import {saveCurrencyPairApi, fetchSavedPairsApi} from '../api/savePairApi';

const CurrencyPairListContainer = () => {
  const [currencyPairs, setCurrencyPairs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isLoggedIn, username } = useContext(AuthContext);
  const [savedPairs, setSavedPairs] = useState([]);

  useEffect(() => {
    const fetchSavedPairs = async () => {
      try {
        if (isLoggedIn) {
          const savedPairs = await fetchSavedPairsApi(username);
          setSavedPairs(savedPairs);
        }
      } catch (error) {
        console.log('Error fetching saved pairs:', error);
      }
    };

    if (isLoggedIn) {
      fetchSavedPairs();
    }
  }, [isLoggedIn, username]);


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
              price: `$${price.toFixed(5)}`,
              save: savedPairs.includes(`${base}/${quote}`) ? (
                <StarIcon fontSize="large" style={{ color: 'yellow' }} />
              ) : (
                  <StarBorderIcon fontSize="large" />
              ),
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
  }, [savedPairs]);

  const handleSave = async (currencyPair) => {
    try {
      await saveCurrencyPairApi(username, currencyPair.pair);

      setSavedPairs([...savedPairs, currencyPair.pair]);
    } catch (error) {
      console.error('Error saving currency pair:', error);
    }
  };


  const columns = [
    {
      title: 'No.',
      field: 'number',
      type: 'numeric',
      align: 'left',
      cellStyle: {
        textAlign: 'left',
      },
    },
    {
      title: 'Currency Pair',
      field: 'pair',
      align: 'left',
      cellStyle: {
        textAlign: 'left',
      },
    },
    {
      title: 'Price',
      field: 'price',
      align: 'left',
      cellStyle: {
        textAlign: 'left',
      },
    },
    isLoggedIn && {
      title: 'Save',
      field: 'save',
      render: (rowData) => (
        <IconButton onClick={() => handleSave(rowData)}>
          {rowData.save}
        </IconButton>
      ),
    },
  ].filter(Boolean);

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
