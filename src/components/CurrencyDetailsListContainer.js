import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MaterialTable from 'material-table';
import fetchCurrencyRate from '../api/currencyRateApi';
import Button from '@mui/material/Button';
import TimelineIcon from '@mui/icons-material/Timeline';
import '../styles/CurrencyDetailsListContainer.css';

const CurrencyDetailsListContainer = () => {
  const [currencyDetails, setCurrencyDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchCurrencyRate();
        let count = 1
        const details = await Promise.all(
          data.map(async (item) => {
            let id = item.id
            return {
              number: count++,
              id: id,
              symbol: item.symbol,
              currencySymbol: item.currencySymbol,
              rate: `$${parseFloat(item.rateUsd).toFixed(5)}`,
              type: item.type,
              historicalData: id,
            };
          })
        );

        setCurrencyDetails(details);
        setIsLoading(false);
      } catch (error) {
        console.log('Error fetching currency details:', error);
      }
    };

    fetchData();
  }, []);

  const columns = [
    {
      title: 'No.',
      field: 'number',
      align: 'left',
      cellStyle: {
        textAlign: 'left',
      },
    },
    {
      title: 'ID',
      field: 'id',
      align: 'left',
      cellStyle: {
        textAlign: 'left',
      },
    },
    {
      title: 'Symbol',
      field: 'symbol',
      align: 'left',
      cellStyle: {
        textAlign: 'left',
      },
    },
    {
      title: 'Currency Symbol',
      field: 'currencySymbol',
      align: 'left',
      cellStyle: {
        textAlign: 'left',
      },
    },
    {
      title: 'Rate',
      field: 'rate',
      align: 'left',
      cellStyle: {
        textAlign: 'left',
      },
    },
    {
      title: 'Type',
      field: 'type',
      align: 'left',
      cellStyle: {
        textAlign: 'left',
      },
    },
    {
      title: 'Historical Data',
      field: 'historicalData',
      align: 'left',
      cellStyle: {
        textAlign: 'left',
      },
      render: (rowData) => (
        <Button onClick={() => handleOpenHistoricalData(rowData.id)}><TimelineIcon /></Button>
      ),
    },
  ];

  const handleOpenHistoricalData = async (id) => {
    // Handle opening the historical data for the selected cryptocurrency
    navigate(`/historical-data/${id}`);


  };

  return (
    <MaterialTable
      title="Crypto Currency Detail List"
      columns={columns}
      data={currencyDetails}
      isLoading={isLoading}
      options={{
        padding: 'dense',
        pageSize: 100,
        pageSizeOptions: [100, 150, 200, 250, 300],
        emptyRowsWhenPaging: false,
        headerStyle: {
          backgroundColor: '#EEE',
        },
      }}
    />
  );
};

export default CurrencyDetailsListContainer;
