import { combineReducers } from 'redux';
import countries from 'all-countries-and-cities-json';

const countrieNames = Object.keys(countries);

const initialState = {
    textSearch: '',
    countries: [],
    countrieNames,
    currentCountry: null,
    weatherForCity: null,
    favoriteForCountry: false,
    weatherForSomeDays: null,
    cityList: [],
    favCityList: []
};

function MainReducer(state = initialState, action) {
    switch(action.type) {
        case 'COUNTRIE_CHANGE':
            return {
                ...state,
                currentCountry: action.payLoad
            }
        case 'SET_CITY':
            return {
                ...state,
                weatherForCity: action.payLoad
            }
        case 'SET_COUNTRY':
            return {
                ...state,
                favoriteForCountry: action.payLoad
            }
        case 'SET_WEATHER':
            return {
                ...state,
                weatherForSomeDays: action.payLoad
            }
        case 'SET_CITIES':
            return {
                ...state,
                cityList: action.payLoad
            }
        case 'SET_FAVORITE_CITIES':
            return {
                ...state,
                favCityList: action.payLoad
            }
        case 'SET_WORD':
            return {
                ...state,
                textSearch: action.payLoad
            }
        default:
            return state;
    }
}

export default combineReducers({
    weatherReducer: MainReducer
});