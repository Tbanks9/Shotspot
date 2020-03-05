import React from 'react'
import axios from 'axios'
import Select from 'react-select'
// import { Link } from 'react-router-dom'
// import Auth from '../../lib/auth'

class CityIndex extends React.Component {
  state = {
    cities: null,
    cityFilter: '',
    chosenCity: 'ALL',
  }

  options = [
    { value: 'Bangkok', label: 'Bangkok' },
    { value: 'Hong Kong', label: 'Hong Kong' },
    { value: 'London', label: 'London' },
    { value: 'Sydney', label: 'Sydney' },
    { value: 'Reykjavik', label: 'Reykjavik' },
    { value: 'Lima', label: 'Lima' }
  ]

  async getData() {
    try {
      const res = await axios.get('/api/cities')
      this.setState({ cities: res.data })
    } catch (err) {
      console.log(err)
    }
  }

  componentDidMount() {
    this.getData()
  }

  handleChange = (e) => {
    this.setState({ chosenCity: e.value })
    console.log(this.state.chosenCity)
  }

  filterCities = () => {
    return this.state.cities.filter(city => {
      return city.city_name === this.state.chosenCity ||
        this.state.chosenCity === 'ALL'
    })
  }

  render() {
    if (!this.state.cities) return null
    console.log(this.state.cities)
    return (
      <>
        <section className="hero-body-index">
          <div className="fieldContainer">
            <h1 className="cityTitle">Pick your city</h1>
            <div className="control">
              <Select
                options={this.options}
                onChange={this.handleChange}
                className="selectBar"
              />
              <h2 className="header">City selected: <span>{this.state.chosenCity}</span></h2>
              {/* <h1>{this.filterCities().city_name}</h1>
              <hr />
              <h2>{this.filterCities().city_description}</h2> */}
              {this.filterCities().map(city =>
                city.photographyspots.map(spot =>
                  <div className="photograpySpot">
                    <br />
                    <h1 className="photoSpotTitle">{spot.location_name}</h1>
                    <br />
                    <img src={spot.location_image} className="image" alt={spot.location_name} />
                    <br />
                    <h2 className="description">{spot.location_description}</h2>
                    <br />
                  </div>
                ))}
            </div>
          </div>
        </section>
      </>
    )
  }
}

export default CityIndex