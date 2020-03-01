import React from 'react'
import axios from 'axios'
// import Select from 'react-select'

class Register extends React.Component {
  state = {
    data: {},
    errors: {}
  }

//   options = [
//     { value: 'Hong Kong', label: 'Hong Kong' },
//     { value: 'Beijing', label: 'Beijing' },
//     { value: 'London', label: 'London' },
//     { value: 'Tokyo', label: 'Tokyo' },
//     { value: 'Athens', label: 'Athens' },
//     { value: 'New Delhi', label: 'New Delhi' },
//     { value: 'Naples', label: 'Naples' },
//     { value: 'Osaka', label: 'Osaka' },
//     { value: 'Havana', label: 'Havana' },
//     { value: 'Mexico City', label: 'Mexico City' },
//     { value: 'Marrakech', label: 'Marrakech' }
//   ]

  handleChange = e => {
    const data = { ...this.state.data, [e.target.name]: e.target.value }
    const errors = { ...this.state.errors, [e.target.name]: '' }
    this.setState({ data, errors })
  }

  handleMultiChange = (selected) => {
    const skills = selected ? selected.map(item => item.value) : []
    const data = { ...this.state.data, skills }
    this.setState({ data })
  }

  handleSubmit = async e => {
    e.preventDefault()
    console.log('submitting', this.state.data)
    try {
      await axios.post('/api/register', this.state.data)
      this.props.history.push('/login')
    } catch (err) {
      this.setState({ errors: err.response.data.errors })
    }
  }

  render() {
    return (
      <section className="user-section">
        <form onSubmit={this.handleSubmit} className="user-container">
          <div className="user-info">
            <h2 className="title">Register</h2>
            <br />
            <div className="fieldContainer">
              <div className="field">
                <label className="label">First name</label>
                <div className="control">
                  <input
                    className={`input ${this.state.errors.name ? 'is-danger' : ''}`}
                    placeholder="First name"
                    id="first_name"
                    name="first_name"
                    onChange={this.handleChange}
                  />
                </div>
                {this.state.errors.name && <small className="help is-danger">{this.state.errors.name}</small>}
              </div>
              <div className="field">
                <label className="label">Surname</label>
                <div className="control">
                  <input
                    className={`input ${this.state.errors.name ? 'is-danger' : ''}`}
                    placeholder="Surname"
                    id="second_name"
                    name="second_name"
                    onChange={this.handleChange}
                  />
                </div>
                {this.state.errors.name && <small className="help is-danger">{this.state.errors.name}</small>}
              </div>
              <div className="field">
                <label className="label">Email</label>
                <div className="control">

                  <input
                    className={`input ${this.state.errors.email ? 'is-danger' : ''}`}
                    placeholder="Email"
                    id="email"
                    name="email"
                    onChange={this.handleChange}
                  />
                </div>
                {this.state.errors.email && <small className="help is-danger">{this.state.errors.email}</small>}
              </div>
              <div className="field">
                <label className="label">Password</label>
                <div className="control">
                  <input
                    className={`input ${this.state.errors.password ? 'is-danger' : ''}`}
                    type="password"
                    placeholder="Password"
                    id="password"
                    name="password"
                    onChange={this.handleChange}
                  />
                </div>
                {this.state.errors.password && <small className="help is-danger">{this.state.errors.password}</small>}
              </div>
              <div className="field">
                <label className="label">Password Confirmation</label>
                <div className="control">
                  <input
                    className={`input ${this.state.errors.passwordConfirmation ? 'is-danger' : ''}`}
                    type="password"
                    placeholder="Password Confirmation"
                    id="password_confirmation"
                    name="password_confirmation"
                    onChange={this.handleChange}
                  />
                </div>
                {this.state.errors.passwordConfirmation && <small className="help is-danger">{this.state.errors.passwordConfirmation}</small>}
              </div>
            </div>
          </div>
          <div className="user-image">
            {/* <ImageUpload
              handleChange={this.handleChange}
              fieldName="image"
              inputClassName="my-input-class"
            /> */}
            <hr />
            <button type="submit" className="button  is-primary">Save</button>
          </div>
          <div className="skills-recipes">
            <div className="fieldContainer">
              <label className="label">What are your skills?</label>
              <div className="control">
                {/* <Select
                  options={this.options}
                  isMulti
                  onChange={this.handleMultiChange}
                /> */}
              </div>
              <div className="field">
                <label className="label">Cities visited</label>
                <div className="control">
                  <input
                    className={`input ${this.state.errors.city ? 'is-danger' : ''}`}
                    placeholder="City"
                    name="city"
                    onChange={this.handleChange}
                  />
                </div>
                {this.state.errors.city && <small className="help is-danger">{this.state.errors.city}</small>}
              </div>
            </div>
          </div>
        </form>
      </section>
    )
  }
}

export default Register