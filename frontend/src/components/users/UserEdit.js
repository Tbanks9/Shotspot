import React from 'react'
import axios from 'axios'
import Auth from '../../lib/auth'
import UserForm from './UserForm'
import { headers } from '../../lib/headers'


class UserEdit extends React.Component {
  state = {
    data: {
      first_name: '',
      second_name: '',
      username: '',
      email: ''
      // cities: []
    },
    errors: {}
  }

  async componentDidMount() {
    const userId = this.props.match.params.id
    console.log(this.props.match.params.id)
    try {
      const res = await axios.get(`/api/users/${userId}`, this.state.data, headers)
      this.setState({ data: res.data })
    } catch (err) {
      console.log('something is wrong', err)
    }
  }

  handleChange = ({ target: { name, value } }) => {
    const data = { ...this.state.data, [name]: value }
    this.setState({ data })
  }

  handleSubmit = async e => {
    e.preventDefault()
    console.log(this.props.match.params.id)
    const userId = this.props.match.params.id
    try {
      const res = await axios.put(`/api/users/${userId}`, this.state.data, headers)
      Auth.setToken(res.data.token)
      this.props.history.push('/')
    } catch (err) {
      this.setState(err.response.data.errors)
    }
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
    if (!this.state.data.first_name) return null
    return (
      <UserForm
        data={this.state.data}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        handleDelete={this.handleDelete}
        errors={this.state.errors}
      />
    )
  }
}

export default UserEdit