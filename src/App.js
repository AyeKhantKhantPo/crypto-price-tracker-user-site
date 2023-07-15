import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CurrencyPairListContainer from './components/CurrencyPairListContainer';
import NavBar from './components/NavBar';
import './styles/NavBar.css'; // Import the navbar CSS file

const App = () => {
  return (
    <Router>
      <NavBar />
      <div className="main-content"> {/* Add the main-content class */}
        <Routes>
          <Route path="/pairs" element={<CurrencyPairListContainer />} />
          {/* Additional routes and components for currency details, user registration, etc. */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
