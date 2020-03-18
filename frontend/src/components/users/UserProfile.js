import React from 'react'
import axios from 'axios'
import Auth from '../../lib/auth'
import { headers } from '../../lib/headers'
import { Link } from 'react-router-dom'

class UserProfile extends React.Component {
  state = {
    data: {},
  }

  async getData() {
    const currentUser = Auth.getUser()
    try {
      const res = await axios.get(`/api/users/${currentUser}`, this.state.data, headers)
      console.log(res.data)
      this.setState({ data: res.data })
      console.log(currentUser)
    } catch (err) {
      this.props.history.push('/notfound')
    }
  }

  componentDidMount() {
    this.getData()
  }

  handleChange = ({ target: { name, value } }) => {
    const user = { ...this.state.user, [name]: value }
    this.setState({ user })
  }

  handleDelete = async () => {
    const userId = this.props.match.params.id
    try {
      await axios.delete(`/api/users/${userId}`, this.state.data, headers)
      this.props.history.push('/')
    } catch (err) {
      console.log(err.response)
    }
  }

  render() {
    if (!this.state.data.cities) return null
    const { cities } = this.state.data
    return (
      <section className="user-body-index">
        <div className="userContainer">
          <h2 className="username">Hey, {this.state.data.username}! 👋 </h2>
          {cities ?
            <><h3 className="username">So far you've visited..</h3>
            {this.state.data.cities.map(city =>
              <div className="userCities">
                <br />
                <h1 className="photoSpotTitle">{city.city_name}</h1>
                <br />
              </div>
            )}</>
            :
            <p>No countries visited yet!</p>}
          <div className="buttonContainer">
            <Link to={`/profile/${this.state.data.id}/edit`} type="submit" className="loginButton">
              Edit Profile
            </Link>
          </div>
        </div>
      </section>
    )
  }
}

export default UserProfile