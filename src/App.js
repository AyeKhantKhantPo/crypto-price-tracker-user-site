import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CurrencyPairListContainer from './components/CurrencyPairListContainer';
import CurrencyDetailsListContainer from './components/CurrencyDetailsListContainer';
import CurrencyHistoricalData from './components/CurrencyHistorical';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import NavBar from './components/NavBar';
import './styles/NavBar.css';
import { AuthProvider } from './AuthContext';


const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="main-content">
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pairs" element={<CurrencyPairListContainer />} />
            <Route path="/details" element={<CurrencyDetailsListContainer />} />
            <Route path="/historical-data/:id" element={<CurrencyHistoricalData />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>

  );
};

const Home = () => {
  return <div></div>;
};

export default App;
