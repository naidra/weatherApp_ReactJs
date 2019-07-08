import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getWeather, saveInStorage, syncCities, syncFavorite } from '../actions';
import FavoriteCities from './favoriteCities';


class Cities extends Component {
    constructor(props) {
        super(props);
    
        this.handleAdding = this.handleAdding.bind(this);
    }
    componentDidMount() {
        this.props.syncFavorite();
        this.props.syncCities();
    }
    handleAdding(e) {
        this.props.saveInStorage(e);
        this.props.syncFavorite();
        this.props.syncCities();
    }
    render() {
        const { textSearch, cityList, getWeather } = this.props;
        return (
            <Fragment>
                <div className="container lists">
                    <ul className={`listOfCities show`}>{
                        cityList.map(
                            (city, i) => <li key={i}>
                                <span onClick={getWeather.bind(null, city[0])}>{city[0]}</span>
                                {
                                    (city[1]) ? <button title="Add to favorites" onClick={this.handleAdding.bind(this, [city[0], city[2]])}>+</button> : null
                                }
                            </li>
                        )}{ (textSearch && !cityList.length) && <li><span>City not found</span></li>
                    }</ul>
                    <FavoriteCities />
                </div>
            </Fragment>
        )
    }
}

Cities.propTypes = {
    name: PropTypes.string,
    textSearch: PropTypes.string,
    country: PropTypes.string,
    allCountries: PropTypes.array,
    getWeather: PropTypes.func.isRequired,
    favoriteForCountry: PropTypes.bool.isRequired,
    cityList: PropTypes.array.isRequired
};

const  mapStateToProps = state => {
    return {
        textSearch: state.weatherReducer.textSearch,
        country: state.weatherReducer.currentCountry,
        allCountries: state.weatherReducer.countries,
        favoriteForCountry: state.weatherReducer.favoriteForCountry,
        cityList: state.weatherReducer.cityList
    }
}

const  mapDispatchToProps = dispatch => {
    return {
        getWeather: e => dispatch(getWeather(e)),
        syncCities: e => dispatch(syncCities(e)),
        syncFavorite: e => dispatch(syncFavorite(e)),
        saveInStorage: e => dispatch(saveInStorage(e))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cities);