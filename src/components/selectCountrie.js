import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { selectCountrieAction, syncCities, syncFavorite } from '../actions';

class SelectCountry extends Component {
    constructor() {
        super();

        this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount() {
        this.props.selectCountrie('Albania');
    }
    handleChange(e) {
        this.props.selectCountrie(e.target.value);
        this.props.syncCities();
        this.props.syncFavorite();
    }
    render() {
        const { cNames, country, specificCountry } = this.props;
        if(!specificCountry) return null;
        return (
            <select className="selectTag" onChange={this.handleChange} defaultValue={country}>
                {
                    cNames && cNames.map((place, i) => <option key={i} value={place}>{place}</option>)
                }
            </select>
        )
    }
}

SelectCountry.propTypes = {
    cNames: PropTypes.array.isRequired,
    countries: PropTypes.array.isRequired,
    country: PropTypes.string,
    specificCountry: PropTypes.bool.isRequired,
    selectCountrie: PropTypes.func.isRequired,
    syncCities: PropTypes.func.isRequired,
    syncFavorite: PropTypes.func.isRequired
};

const  mapStateToProps = state => {
    return {
        cNames: state.weatherReducer.countrieNames,
        countries: state.weatherReducer.countries,
        country: state.weatherReducer.currentCountry,
        specificCountry: state.weatherReducer.favoriteForCountry
    }
}

const mapDispatchToProps = dispatch => {
    return {
        selectCountrie: e => dispatch(selectCountrieAction(e)),
        syncCities: e => dispatch(syncCities(e)),
        syncFavorite: e => dispatch(syncFavorite(e))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectCountry);