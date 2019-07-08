import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getWeather, removeFromStorage, syncCities, syncFavorite } from '../actions';

class FavoriteCities extends Component {
    constructor(props) {
        super(props);
        
        this.handleRemove = this.handleRemove.bind(this);
    }

    handleRemove(city) {
        this.props.removeFromStorage(city);
        this.props.syncFavorite();
        this.props.syncCities();
    }

    render() {
        const { favCityList, getWeather } = this.props;

        let listOfCities = favCityList.map((city, i) => <li key={i}>
            <span onClick={getWeather.bind(null, city)}>{city[0]}</span>
            { <button title="Remove from favorites" className="removeBtn" onClick={this.handleRemove.bind(this, [city[0], city[1]])}>-</button> }
        </li>);

        if(listOfCities.length) listOfCities.unshift(<li key={'a202'}><h4 className="favTitle">Favorite cities</h4></li>);
        else
            listOfCities = [<li key={'a202'}><h4 className="favTitle">Favorite cities</h4></li>, <li key={'a201'}><span>No favorite cities</span></li>];

        return (
            <ul className="favoriteCities">
                { listOfCities }
            </ul>
        )
    }
}

FavoriteCities.propTypes = {
    favCityList: PropTypes.array.isRequired,
    getWeather: PropTypes.func.isRequired,
    removeFromStorage: PropTypes.func.isRequired,
    syncCities: PropTypes.func.isRequired,
    syncFavorite: PropTypes.func.isRequired
};

const  mapStateToProps = state => {
    return {
        favCityList: state.weatherReducer.favCityList
    }
}

const  mapDispatchToProps = dispatch => {
    return {
        removeFromStorage: e => dispatch(removeFromStorage(e)),
        getWeather: e => dispatch(getWeather(e)),
        syncCities: e => dispatch(syncCities(e)),
        syncFavorite: e => dispatch(syncFavorite(e))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FavoriteCities);