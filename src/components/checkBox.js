import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { checkBoxHandler, syncCities, syncFavorite } from '../actions';

class CheckBox extends Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e) {
        this.props.checkBoxHandler(e);
        this.props.syncCities();
        this.props.syncFavorite();
    }
    render() {
        const { specificCountry } = this.props;
        const text = specificCountry ? 'Cities for choosen country' : 'All Cities';
        return (
            <div className="checkBox_wrapp">
                <p className="checkBoxDesc">{ text }</p>
                <div className="checkBox">
                    <input type="checkbox" id="toggle_checkbox" checked={specificCountry} onChange={this.handleChange} />
                    <label htmlFor="toggle_checkbox"></label>
                </div>
            </div>
        )
    }
}

CheckBox.propTypes = {
    specificCountry: PropTypes.bool.isRequired,
    checkBoxHandler: PropTypes.func.isRequired,
    syncCities: PropTypes.func.isRequired,
    syncFavorite: PropTypes.func.isRequired
};

const mapStateToProps = state => {
    return {
        specificCountry: state.weatherReducer.favoriteForCountry
    }
}

const mapDispatchToProps = dispatch => {
    return {
        checkBoxHandler: e => dispatch(checkBoxHandler(e)),
        syncCities: e => dispatch(syncCities(e)),
        syncFavorite: e => dispatch(syncFavorite(e))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckBox);