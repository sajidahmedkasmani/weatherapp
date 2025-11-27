import React, { Component, Fragment } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import '../../assets/css/bootstrap.min.css';
import '../../assets/css/custom.css';
import countries from '../../assets/countries.json';
import cities from '../../assets/cities.json';
import axios from 'axios';

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
      loading: false
    };
  }

  handleCountryChange = (e) => {
    const iso2 = e.target.value;
    const filteredCities = cities.filter(city => city.country === iso2);

    this.setState({
      selectedCountry: iso2,
      cities: filteredCities,
      selectedCity: '',
      weather: null,
      error: null
    });
  };

  handleCityChange = (e) => {
    this.setState({ selectedCity: e.target.value, weather: null, error: null });
  };

  handleWeatherChange = async () => {
    const { selectedCity } = this.state;

    if (!selectedCity) {
      alert("Please select a city");
      return;
    }

    this.setState({ loading: true, error: null, weather: null });

    try {
      const res = await axios.get("https://api.openweathermap.org/data/2.5/weather", {
        params: {
          q: selectedCity,
          appid: "d1d2e90022f1a8d342adc85de937efe7",
          units: "metric"
        }
      });

      const celsius = res.data.main.temp;
      const fahrenheit = (celsius * 9 / 5) + 32;
      const kelvin = celsius + 273.15;

      this.setState({
        weather: {
          celsius,
          fahrenheit,
          kelvin
        },
        loading: false
      });

    } catch (err) {
      this.setState({ error: "Weather not found", loading: false });
    }
  };

  render() {
    const { countries, selectedCountry, cities, selectedCity, weather, error, loading } = this.state;

    const CountriesDD = countries.map((country) => (
      <option key={country.iso2} value={country.iso2}>{country.name}</option>
    ));

    const CitiesDD = cities.map((city, idx) => (
      <option key={idx} value={city.name}>{city.name}</option>
    ));

    return (
      <Fragment>
        <Container fluid={true} className="weather-bg">
          <h1 className='text-white text-center p-5 main-h'>
            <span style={{ fontWeight: 'normal', fontStyle: 'italic' }}>Hello!</span> <br /> 
            Which City weather will you like to see?
          </h1>
          <Container>
            <Form>
              <div className="selects">
                <select name="countries" id="countries" className="select" value={selectedCountry} onChange={this.handleCountryChange}>
                  <option value="">Select any country</option>
                  {CountriesDD}
                </select>

                <select name="cities" id="cities" className="select" value={selectedCity} onChange={this.handleCityChange} disabled={!selectedCountry}>
                  <option value="">Select any city</option>
                  {CitiesDD}
                </select>

                <Button 
                  className="rounded-pill px-5" 
                  variant='primary' 
                  style={{ display: 'block', marginTop: '1.5rem', marginRight: '15rem', justifySelf: 'center' }}
                  onClick={this.handleWeatherChange}
                  disabled={loading}
                >
                  {loading ? 'Loading...' : 'SEARCH'}
                </Button>
              </div>
            </Form>
          </Container>

          <Container fluid={true} style={{ marginTop: '2rem' }}>
            {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

            {weather && (
              <Row className='measurements'>
                <Col sm={3} md={3} lg={4}>
                  <h3 className="measure">{weather.celsius.toFixed(1)}°</h3>
                  <h6 className="text-center uppercase degree">Celsius</h6>
                </Col>
                <Col sm={3} md={3} lg={4}>
                  <h3 className="measure">{weather.fahrenheit.toFixed(1)}°</h3>
                  <h6 className="text-center uppercase degree">Fahrenheit</h6>
                </Col>
                <Col sm={3} md={3} lg={4}>
                  <h3 className="measure">{weather.kelvin.toFixed(1)}°</h3>
                  <h6 className="text-center uppercase degree">Kelvin</h6>
                </Col>
              </Row>
            )}
          </Container>
        </Container>
      </Fragment>
    );
  }
}

export default Weather;
    