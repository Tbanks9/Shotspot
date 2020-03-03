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
      this.setState({ data: res.data })
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
    const { username, id } = this.state.data
    if (!this.state.data) return null
    return (
      <section className="user-section">
        <div className="user-container">
          <div className="user-info fadeInLeft">
            <h2 className="username">{username}</h2>
            <hr />
          </div>
            <Link to={`/users/${id}/edit`} className="button is-rounded is-medium is-warning">
              Edit Profile
            </Link>
          </div>
      </section>
    )
  }
}

export default UserProfile