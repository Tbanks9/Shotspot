import React from 'react'
import axios from 'axios'
import LocationForm from './LocationForm'
import Auth from '../../lib/auth'

class LocationNew extends React.Component {
  state = {
    data: {
      // user: {},
      location_name: '',
      location_description: '',
      location_image: '',
    },
    city: {},
    errors: {}
  }

  componentDidMount() {
    axios.get('/api/cities')
      .then(res => this.setState({ city: res.data }))
      .catch(err => console.log(err))
  }

  handleChange = ({ target: { name, description, image, value } }) => {
    const data = { ...this.state.data, [name]: value, [description]: value, [image]: value }
    const errors = { ...this.state.errors, [name]: '' }
    this.setState({ data, errors })
  }

  // handleChange(e) {
  //   const data = { ...this.state.data, [e.target.location_name]: e.target.value }
  //   const errors = { ...this.state.errors, [e.target.name]: '' }
  //   this.setState({ data, errors })
  // }

  handleMultiSelect = (selected) => {
    // const city = selected ? selected.map(item => item.value) : []
    if (!selected) {
      return this.setState({ data: { ...this.state.data, city: {} } })
    }
    const data = { ...this.state.data, city: selected.map(sel => sel.city_name) }
    this.setState({ data })
  }

  // handleSubmit = async e => {
  //   e.preventDefault()
  //   axios.post('/api/photographyspots', this.state.data, {
  //     headers: { Authorization: `Bearer ${Auth.getToken()}` }
  //   })
  //     .then(res => {
  //       this.props.history.push('/cities')
  //     })
  //     .catch(err => this.setState({ errors: err.message }))
  //   console.log(this.state)
  // }

  handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('/api/photographyspots/', this.state.data, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      this.props.history.push('/cities')
    } catch (err) {
      this.setState({ errors: err.response.data.errors })
    }
  }

  render() {
    const { city, data, errors } = this.state
    console.log(errors)
    console.log(city)
    console.log(data)
    return (
      <div className="create-page-wrapper">
        <LocationForm
          data={data}
          errors={errors}
          options={city}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          handleMultiSelect={this.handleMultiSelect}
        />
      </div>
    )
  }
}

export default LocationNew