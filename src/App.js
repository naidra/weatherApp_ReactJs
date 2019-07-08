import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import Header from './components/header';
import Footer from './components/footer';
import SearchBox from './components/searchBox';
import CheckBox from './components/checkBox';
import SelectCountry from './components/selectCountrie';
import Cities from './components/cities';
import WeatherContainer from './components/weatherContent';

function App() {
  return (
    <Provider store={store}>
      <div className="app-container">
        <Header />
        <div className="filters">
          <div className="container">
            <CheckBox />
            <SearchBox />
            <SelectCountry />
          </div>
        </div>
        <Cities />
        <WeatherContainer />
      </div>
      <Footer />
    </Provider>
  );
}

export default App;