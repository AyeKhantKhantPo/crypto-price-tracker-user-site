import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MaterialTable from 'material-table';
import fetchCurrencyAssetHistoricalData from '../api/currencyAssetApi';
import '../styles/CurrencyHistorical.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  Grid,
  Typography,
  Container,
} from '@mui/material';

const HistoricalDataPage = () => {
  const { id } = useParams();
  const [historicalData, setHistoricalData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [timeFrame, setTimeFrame] = useState('d1');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const defaultTheme = createTheme();

  useEffect(() => {
    fetchHistoricalData();
  }, [id, timeFrame, startDate, endDate]);

  const fetchHistoricalData = async () => {
    try {
      const data = await fetchCurrencyAssetHistoricalData(id, timeFrame, startDate, endDate);
      const formattedData = data.data.map((item, index) => ({
        number: index + 1,
        price: item.priceUsd,
        time: new Date(item.time).toLocaleString(),
      }));

      setHistoricalData(formattedData);
      setIsLoading(false);
    } catch (error) {
      console.log('Error fetching currency historical data:', error);
    }
  };

  const handleTimeFrameChange = (event) => {
    console.log("time frame", event.target.value)
    setTimeFrame(event.target.value);
  };


  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const handleReset = () => {
    setTimeFrame('d1');
    setStartDate('');
    setEndDate('');
  };

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
      title: 'Price (USD)',
      field: 'price',
      align: 'left',
      cellStyle: {
        textAlign: 'left',
      },
    },
    {
      title: 'Time',
      field: 'time',
      align: 'left',
      cellStyle: {
        textAlign: 'left',
      },
    },
  ];

  return (
    <ThemeProvider theme={defaultTheme}>

      <Container>
        <div className="historical-page">

          <Typography variant="h6" component="h2" className="historical-heading">
            {id} Historical Data
          </Typography>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={3}>
              <FormControl fullWidth>
                <InputLabel id="time-frame-label">Time Frame</InputLabel>
                <Select
                  labelId="time-frame-label"
                  id="time-frame-select"
                  value={timeFrame}
                  onChange={handleTimeFrameChange}
                >
                  <MenuItem value="m1">1 Minute</MenuItem>
                  <MenuItem value="m5">5 Minutes</MenuItem>
                  <MenuItem value="m15">15 Minutes</MenuItem>
                  <MenuItem value="m30">30 Minutes</MenuItem>
                  <MenuItem value="h1">1 Hour</MenuItem>
                  <MenuItem value="h2">2 Hours</MenuItem>
                  <MenuItem value="h6">6 Hours</MenuItem>
                  <MenuItem value="h12">12 Hours</MenuItem>
                  <MenuItem value="d1">1 Day</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                id="start-date"
                label="Start Date"
                type="datetime-local"
                value={startDate}
                onChange={handleStartDateChange}
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                id="end-date"
                label="End Date"
                type="datetime-local"
                value={endDate}
                onChange={handleEndDateChange}
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <Button variant="contained" color="secondary" onClick={handleReset} fullWidth>
                Reset
              </Button>
            </Grid>
          </Grid>

          <MaterialTable
            title=""
            columns={columns}
            data={historicalData}
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
        </div>
      </Container>
    </ThemeProvider>

  );
};

export default HistoricalDataPage;
