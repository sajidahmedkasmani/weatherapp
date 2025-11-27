import React, { Component, Fragment } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import "../../assets/css/bootstrap.min.css";
import "../../assets/css/custom.css";
import countries from "../../assets/countries.json";
import cities from "../../assets/cities.json";
import axios from "axios";
import Spinner from "../Spinner/Spinner";

class Weather extends Component {
  constructor(props) {
    super(props);

    this.state = {
      countries: countries,
      selectedCountry: "",
      cities: [],
      selectedCity: "",
      weather: null,
      error: null,
      loading: false,
    };
  }

  handleCountryChange = (e) => {
    const iso2 = e.target.value;
    const filteredCities = cities.filter((city) => city.country === iso2);

    this.setState({
      selectedCountry: iso2,
      cities: filteredCities,
      selectedCity: "",
      weather: null,
      error: null,
    });
  };

  handleCityChange = (e) => {
    this.setState({ selectedCity: e.target.value, weather: null, error: null });
  };

  handleWeatherChange = async () => {
    const { selectedCity } = this.state;

    this.setState({ loading: true, weather: null, error: null });

    try {
      const res = await axios.get(
        "https://api.openweathermap.org/data/2.5/weather",
        {
          params: {
            q: selectedCity,
            appid: "d1d2e90022f1a8d342adc85de937efe7",
            units: "metric",
          },
        }
      );

      const celsius = res.data.main.temp;
      const fahrenheit = (celsius * 9) / 5 + 32;
      const kelvin = celsius + 273.15;

      this.setState({
        weather: {
          celsius,
          fahrenheit,
          kelvin,
        },
        loading: false,
      });
    } catch (err) {
      this.setState({ error: "Weather not found", loading: false });
    }
  };

  render() {
    const AllCountries = this.state.countries;
    const CountriesDD = AllCountries.map((AllCountries) => {
      return (
        <option key={AllCountries.iso2} value={AllCountries.iso2}>
          {AllCountries.name}
        </option>
      );
    });

    const AllCities = this.state.cities;
    const CitiesDD = AllCities.map((AllCities, idx) => {
      return (
        <option key={idx} value={AllCities.name}>
          {AllCities.name}
        </option>
      );
    });

    return (
      <Fragment>
        <Container fluid={true} className="weather-bg">
          <br />
          <br />
          <br />
          <h1 className="text-black text-center p-5 main-h pt-5">
            <span style={{ fontWeight: "normal", fontStyle: "" }}>Hello!</span>
            <br />
            Which City weather will you like to see?
          </h1>
          <Container>
            <Form>
              <div className="selects">
                <select
                  name="countries"
                  id="countries"
                  className="select"
                  value={this.state.selectedCountry}
                  onChange={this.handleCountryChange}
                >
                  <option value="">Select any country</option>
                  {CountriesDD}
                </select>

                <select
                  name="cities"
                  id="cities"
                  className="select"
                  value={this.state.selectedCity}
                  onChange={this.handleCityChange}
                  disabled={!this.state.selectedCountry}
                >
                  <option value="">Select any city</option>
                  {CitiesDD}
                </select>

                <Button
                  className="rounded-pill px-5"
                  variant="primary"
                  style={{
                    display: "block",
                    marginTop: "1.5rem",
                    marginRight: "15rem",
                    justifySelf: "center",
                  }}
                  onClick={this.handleWeatherChange}
                >
                  CHECK WHETHER
                </Button>
              </div>
            </Form>
          </Container>

          <Container fluid={true} style={{}}>
            {this.state.error && <p>{this.state.error}</p>}

            {this.state.weather && (
              <Row className="measurements">
                <Col sm={3} md={3} lg={4}>
                  <h3 className="measure">
                    {this.state.weather.celsius.toFixed(1)}°
                  </h3>
                  <h6 className="text-center uppercase degree">Celcius</h6>
                </Col>
                <Col sm={3} md={3} lg={4}>
                  <h3 className="measure">
                    {this.state.weather.fahrenheit.toFixed(1)}°
                  </h3>
                  <h6 className="text-center uppercase degree">Farenheit</h6>
                </Col>
                <Col sm={3} md={3} lg={4}>
                  <h3 className="measure">
                    {this.state.weather.kelvin.toFixed(1)}°
                  </h3>
                  <h6 className="text-center uppercase degree">Kelvin</h6>
                </Col>
              </Row>
            )}
          </Container>
        </Container>
      </Fragment>
    );
  // }
}
}

export default Weather;
