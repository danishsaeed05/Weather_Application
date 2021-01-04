import React from 'react'
import '../Styles/WeatherShowData.css'

function WeatherShowData({ data }) {
    return (
        <div className="container">
            <div className="mainData">
                <h3>{data?.location}</h3>
                <div className="tempImage">
                    <h1 className="temperature">{data.temp}&deg;</h1>
                    <img src={`http://openweathermap.org/img/w/${data.icon}.png`} style={{ height: '100px', width: '100px' }} alt="Icon representing current weather" />
                </div>
                <p>{data.desc}</p>
            </div>
            <div>

                <div className="properties">

                    <div className="feelClourd">
                        <p><b>Feels Like:</b> {data.feelsLike}&deg;</p>
                        <p><b>Cloudiness:</b> {data.cloudiness}%</p>
                    </div>

                    <div className="minMax">
                        <p><b>temp_min:</b> {data.tempMin}&deg;</p>
                        <p><b>temp_max:</b> {data.tempMax}&deg;</p>
                    </div>

                    <div className="humWind">
                        <p><b>humidity</b>: {data.humidity}%</p>
                        <p><b>Wind Speed:</b> {data.windSpeed} m/sec</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

WeatherShowData.defaultProps = {
    data: {
        location: "------, --",
        temp: "0",
        desc: "--------",
        feelsLike: "--",
        cloudiness: "--",
        tempMin: "--",
        tempMax: "--",
        humidity: "--",
        windSpeed: "--",
        icon: "13d"
    }
}

export default WeatherShowData
