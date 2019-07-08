import axios from 'axios';

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

export const searchHandler = e => dispatch => {
    dispatch({
        type: 'SET_WORD',
        payLoad: e.value
    });
}
export const selectCountrieAction = (country) => dispatch => {
    dispatch({
        type: 'COUNTRIE_CHANGE',
        payLoad: country
    });
}
export const choseCity = city => dispatch => {
    dispatch({
        type: 'SET_CITY',
        payLoad: city
    });
}
export const saveInStorage = ([city, country]) => dispatch => {
    let weatherPlaces = {};
    if(localStorage.getItem('weatherPlaces')) weatherPlaces = JSON.parse(localStorage.getItem('weatherPlaces'));

    if(!weatherPlaces[country]) weatherPlaces[country] = [];

    (weatherPlaces[country].indexOf(city) < 0) && weatherPlaces[country].push(city);

    localStorage.setItem('weatherPlaces', JSON.stringify(weatherPlaces));

    dispatch({ type: 'SET_None', payLoad: '' });
}
export const removeFromStorage = param => dispatch => {
    let weatherPlaces = localStorage.getItem('weatherPlaces') ? JSON.parse(localStorage.getItem('weatherPlaces')) : {};
    
    weatherPlaces[param[1]] = [
        ...weatherPlaces[param[1]].slice(0, weatherPlaces[param[1]].indexOf(param[0])),
        ...weatherPlaces[param[1]].slice(weatherPlaces[param[1]].indexOf(param[0]) + 1)
    ];
    if(!weatherPlaces[param[1]].length) delete weatherPlaces[param[1]];

    localStorage.setItem('weatherPlaces', JSON.stringify(weatherPlaces));
    
    dispatch({ type: 'SET_None', payLoad: '' });
}
export const checkBoxHandler = (e) => dispatch => {    
    dispatch({
        type: 'SET_COUNTRY',
        payLoad: e.target.checked
    });
}
export const getWeather = city => dispatch => {
    try {
        axios.get('https://community-open-weather-map.p.rapidapi.com/forecast?units=metric&q=' + city,
            {
                headers: {
                    'Accept': 'application/json',
                    "X-RapidAPI-Host": "community-open-weather-map.p.rapidapi.com",
                    "X-RapidAPI-Key": API_KEY
                }
            }
        )
        .then(function(response) {
            dispatch({
                type: 'SET_WEATHER',
                payLoad: response.data
            });
        })
        .catch(function(error) {
            dispatch({
                type: 'SET_WEATHER',
                payLoad: ['Couldn\'t get weather data for: ' + city]
            });
        });
    } catch(err) {
        dispatch({
            type: 'SET_WEATHER',
            payLoad: ['Couldn\'t get weather data for: ' + city]
        });
    }
}
export const syncFavorite = () => (dispatch, getState) => {
    const favoriteSaved = localStorage.getItem('weatherPlaces') ? JSON.parse(localStorage.getItem('weatherPlaces')) : {};
    const { currentCountry, favoriteForCountry } = getState().weatherReducer;
    var cities = [];
    if(currentCountry && favoriteForCountry) {
        cities = favoriteSaved[currentCountry] ? favoriteSaved[currentCountry] : [];
        cities = cities.map(city => [city, currentCountry]);
    } else {
        cities = Object.keys(favoriteSaved).reduce((acc, arr, i, key) => {
            const mapped = favoriteSaved[arr].map(city => [city, key[i]]);

            acc.push(...mapped);
            return acc;
        }, []);
    }

    dispatch({
        type: 'SET_FAVORITE_CITIES',
        payLoad: cities
    });
}

export const syncCities = () => (dispatch, getState) => {
    const state = getState();
    axios.get('https://raw.githubusercontent.com/meMo-Minsk/all-countries-and-cities-json/master/countries.json')
        .then(function(result) {
            const { favoriteForCountry, textSearch, currentCountry, favCityList } = state.weatherReducer;
            var cities = [];
            if(favoriteForCountry) {
                cities = result.data[currentCountry].reduce((acc, val) => {
                    const isNotSavedInStorage = favCityList.flat().indexOf(val) === -1;
                    if(val.toLowerCase().indexOf(textSearch) > -1) acc.push([val, isNotSavedInStorage, currentCountry]);
                    return acc;
                }, []);
            } else {
                cities = Object.keys(result.data).reduce((acc, arr, i, allCountries) => {
                    const reduced = result.data[arr].reduce((acc, val) => {
                        const isNotSavedInStorage = favCityList.flat().indexOf(val) === -1;
                        if(val.toLowerCase().indexOf(textSearch) > -1) acc.push([val, isNotSavedInStorage, allCountries[i]]);
                        
                        return acc;
                    }, []);
                    acc.push(...reduced);
                    return acc;
                }, []).slice(0, 50);
            }
            cities = textSearch ?  cities : [];

            dispatch({
                type: 'SET_CITIES',
                payLoad: cities
            });
        })
        .catch(function(err) {
            console.log(err);
        });
}