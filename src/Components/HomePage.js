import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker';
import {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';
import axios from 'axios';

import '../Styles/HomePage.css'
import SearchBar from './SearchBar'
import WeatherShowData from './WeatherShowData'

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            address: '',
            zoom: 11,
            marker: {
                lat: 59.95,
                lng: 30.33
            },
            center: {
                lat: 59.95,
                lng: 30.33
            },
            weather: undefined
        }
    }

    handleSelect = address => {
        if (typeof (address) !== 'object') {
            geocodeByAddress(address)
                .then(results => getLatLng(results[0]))
                .then(latLng => {

                    this.setState({
                        marker: {
                            lat: latLng.lat,
                            lng: latLng.lng
                        }
                    })

                })
                .then(() => {
                    this.passCordinates()
                })
                .catch(error => alert('Error', error));
        }
        else {
            this.setState({
                marker: {
                    lat: address.lat,
                    lng: address.lng
                }
            })
            this.passCordinates()
        }
    };



    passCordinates = () => {
        let marker = this.state.marker

        this.getWeather(marker?.lat, marker?.lng)
            .then(weather => {
                this.setState({
                    weather: {
                        location: weather?.name + ", " + weather.sys.country,
                        temp: weather.main.temp,
                        desc: weather.weather[0].main,
                        feelsLike: weather.main.feels_like,
                        cloudiness: weather.clouds.all,
                        tempMin: weather.main.temp_min,
                        tempMax: weather.main.temp_max,
                        humidity: weather.main.humidity,
                        windSpeed: weather.wind.speed,
                        icon: weather.weather[0].icon
                    }
                })
            }).catch(error => {
                alert("Invalid data", error)
            })
    }

    getWeather = async (lat, lng) => {
        try {
            const { data } = await axios.get('https://api.openweathermap.org/data/2.5/weather?',
                {
                    params: {
                        lat: lat,
                        lon: lng,
                        appid: process.env.REACT_APP_SECRET2,
                        units: 'metric'
                    }
                })

            return data
        }
        catch (error) {
            console.log(error.response);
            alert("Error", error.response);
        }
    }

    onClick = (coord) => {
        this.setState({ marker: {} })
        const latLng = {
            lat: coord.lat,
            lng: coord.lng
        }
        this.setState({ marker: { lat: coord.lat, lng: coord.lng } })
        this.handleSelect(latLng)
    }

    render() {
        return (
            <div className="background">

                <SearchBar handleSelect={this.handleSelect} />
                <WeatherShowData data={this.state.weather} />

                <div className="mapContainer">
                    <GoogleMapReact
                        bootstrapURLKeys={{ key: process.env.REACT_APP_SECRET }}
                        defaultCenter={this.state.center}
                        center={this.state.marker}
                        onClick={this.onClick}
                        minZoom={11}
                        defaultZoom={this.state.zoom}
                    >
                        <Marker
                            lat={this.state.marker.lat}
                            lng={this.state.marker.lng}
                        />
                    </GoogleMapReact>
                </div>
            </div>
        )
    }
}

export default HomePage
