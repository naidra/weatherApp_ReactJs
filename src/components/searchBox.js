import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { searchHandler, syncCities, syncFavorite } from '../actions';

const debounce = (func, delay) => {
    let inDebounce;
    return function(e) {
        const target = e.currentTarget;
        clearTimeout(inDebounce);
        inDebounce = setTimeout(() => func(target), delay);
    }
}

class SearchBox extends Component {
    constructor() {
        super();
        
        this.searchCity = debounce(this.searchCity.bind(this), 250);
    }

    searchCity(e) {
        this.props.searchHandler(e);
        this.props.syncCities();
        this.props.syncFavorite();
    }
    render() {
        return <input className="searchBar" type="text" ref="searchTag" onChange={this.searchCity} placeholder="Search cities" />
    }
}

SearchBox.propTypes = {
    searchHandler: PropTypes.func.isRequired
};

const mapStateToProps = state => {
    return {
        country: state.weatherReducer.currentCountry
    }
}

const mapDispatchToProps = dispatch => {
    return {
        searchHandler: e => dispatch(searchHandler(e)),
        syncCities: e => dispatch(syncCities(e)),
        syncFavorite: e => dispatch(syncFavorite(e))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBox);