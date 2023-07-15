import React from 'react';
import { Container, TextField, Typography, Grid, Card, CardContent } from '@mui/material';

const CurrencyPairList = ({ currencyPairs, searchTerm, handleSearch }) => {
  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        Crypto Currency Price Tracker
      </Typography>
      <TextField
        label="Search"
        value={searchTerm}
        onChange={handleSearch}
        fullWidth
        margin="normal"
      />

      <Grid container spacing={2}>
        {currencyPairs.map((pair) => (
          <Grid item key={pair.id} xs={12} sm={6} md={4}>
            <CurrencyPairCard pair={pair} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

const CurrencyPairCard = ({ pair }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" component="div">
          {pair.name}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Price: {pair.price}
        </Typography>
        {/* Additional details or actions */}
      </CardContent>
    </Card>
  );
};

export default CurrencyPairList;
