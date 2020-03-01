import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Auth from '../../lib/auth'

class CityIndex extends React.Component {
  state = {
    cities: [],
    cityFilter: ''
  }

  async getData() {
    try {
      const res = await axios.get('/api/cities')
      let filteredCities = []
      const cityFilter = localStorage.getItem('city')
      if (cityFilter === 'ALL') {
        filteredCities = [...res.data]
      } 
      // else {
      //   res.data.filter(user => {
      //     if (user.cities.includes(`${cityFilter}`) && city._id !== Auth.getCity()) {
      //       filteredCities = [...filteredCities, city]
      //     } return res.data
      //   })
      // }
      this.setState({ cities: filteredCities, cityFilter })
    } catch (err) {
      console.log(err)
    }
  }

  componentDidMount() {
    this.getData()
  }

  // componentDidUpdate() {
  //   const cityFilter = localStorage.getItem('city')
  //   cityFilter !== this.state.cityFilter ? this.getData() : null
  // }

  render() {
    return (
      <section className="hero is-fullheight-with-navbar">
        {/* <div className="hero-body-index">
        </div>
        <h2 className="skill-header">CITY : <span>{localStorage.getItem('city')}</span></h2>
        {this.state.cities.map(city => (
          <Link to={`/cities/${city._id}`} key={city._id}>
            <div className="box">
              <article className="media">
                <img src={city.image} alt={user.name} />
                <div className="info">
                  <div className="bio">
                    <h3 className="title">{user.name}</h3>
                    {user.avgRating > 0 ?
                      <h3>{user.avgRating} <span className="star">★</span></h3>
                      :
                      <h5>Not yet rated</h5>}
                    <h4>{user.city}</h4>
                  </div>
                  <div className="skills">
                    {user.skills.map((skill, i) => <p key={i}>{skill}</p>)}
                  </div>
                </div>
              </article>
            </div>
          </Link>
        ))
        } */}
      </section>
    )
  }
}

export default CityIndex