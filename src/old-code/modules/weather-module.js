import React from "react";
import Weather from '../components/weather';
class WeatherModule extends React.Component {

    constructor(props) {
        super(props);
        this.data = null;
        this.latCoord = null;
        this.longCoord = null;
        this.options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        };
        this.success = this.success.bind(this);
        this.error = this.error.bind(this);
    }

    state = {data: null}
    componentDidMount() {
        navigator.geolocation.getCurrentPosition(this.success, this.error, this.options);
    }
    success(pos) {
        var crd = pos.coords;
        this.data = [crd.latitude, crd.longitude];
        this.getData();
    };

    async getData() {
        await fetch(`${process.env.REACT_APP_API_URL}/weather/?lat=${this.data[0]}&lon=${this.data[1]}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`)
            .then(res => res.json())
            .then(result => {
                this.setState({data: result});
            });
    }
    error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
    };

    render() {
        return (
            this.state.data &&
            <div className="weatherModule">
                <Weather weatherData={this.state.data} />
            </div>
        )
    }
}
export default WeatherModule;
