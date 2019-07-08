import React, { Component } from 'react';
import { connect } from 'react-redux';

class WeatherContainer extends Component {
    render() {
        const weatherForSomeDays = this.props.weatherForSomeDays;

        if(weatherForSomeDays && weatherForSomeDays.length === 1) {
            return (
                <div className="container">
                    <div className="weatherWrapper">
                        <h4 className="weatherError">{weatherForSomeDays[0]}</h4>
                    </div>
                </div>
            )
        } else if (weatherForSomeDays) {
            var { name } = weatherForSomeDays.city;
            var { list } = weatherForSomeDays;
            list = list.reduce((acc, val) => {
                if(!acc.some(el => el.dt_txt.includes(val.dt_txt.split(' ')[0])))
                    acc.push(val)

                return acc;
            }, []);
            console.log(list);
        }

        return (weatherForSomeDays ?
        (
            <div className="container">
            <div className="weatherWrapper">
                <h3>Weather for: { name + " (" + weatherForSomeDays.city.country + ")"}</h3>
                <div className="daysContainer">
                    {
                        list.map((day, i) => {
                            if(!i) {
                                return (
                                    <div key={i} className="day first">
                                        <p className="time">Today</p>
                                        <div className="innerCont">
                                            <img alt="ICON" src={'http://openweathermap.org/img/wn/' + day.weather[0].icon + '@2x.png'} />
                                            <div className="textContent">
                                                <p className="desc">{day.weather[0].description}</p>
                                                <div className="group">
                                                    <b className="tempDesc">Temperature</b>
                                                    <p className="temperature">
                                                        <span className="min">Min: {Math.floor(day.main.temp_min)+'\xB0C'}</span>&nbsp;&nbsp;&nbsp;
                                                        <span className="max">Max: {Math.ceil(day.main.temp_max)+'\xB0C'}</span>
                                                    </p>
                                                </div>
                                                <div className="group">
                                                    <p className="humidity">Humidity: {day.main.humidity} %</p>
                                                </div>
                                                <div className="group">
                                                    <b className="tempDesc">Wind</b>
                                                    <p className="pressure">
                                                        <span>Speed: {Math.round(day.wind.speed)} km/h</span>&nbsp;&nbsp;&nbsp;
                                                        <span>Direction:</span>
                                                        <span style={{transform: `rotate(${day.wind.deg}deg)` }} className="windArrow"> ⇾</span>
                                                    </p>
                                                </div>
                                                <div className="group">
                                                    <p className="pressure">Pressure: {day.main.pressure}</p>
                                                </div>
                                                <div className="group last">
                                                    <p className="sea_level">Sea level: {day.main.sea_level}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            } else {
                                return (
                                    <div key={i} className="day">
                                        <p className="time">{day.dt_txt.split(' ')[0]}</p>
                                        <img alt="ICON" src={'http://openweathermap.org/img/wn/' + day.weather[0].icon + '@2x.png'} />
                                        <p className="tempDesc">Temperature</p>
                                        <p className="temperature">
                                            <span className="min">Min: {Math.floor(day.main.temp_min)+'\xB0C'}</span>&nbsp;&nbsp;&nbsp;
                                            <span className="max">Max: {Math.ceil(day.main.temp_max)+'\xB0C'}</span>
                                        </p>
                                    </div>
                                )
                            }
                        })
                    }
                </div>
            </div>
            </div>
        ) :
        null)
    }
}

const  mapStateToProps = state => {
    return {
        weatherForSomeDays: state.weatherReducer.weatherForSomeDays
    }
}

export default connect(mapStateToProps)(WeatherContainer);