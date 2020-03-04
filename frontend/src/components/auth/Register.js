import React from 'react'
import axios from 'axios'
// import Select from 'react-select'

class Register extends React.Component {
  state = {
    data: {}
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
    this.setState({ data })
  }

  // handleMultiChange = (selected) => {
  //   const skills = selected ? selected.map(item => item.value) : []
  //   const data = { ...this.state.data, skills }
  //   this.setState({ data })
  // }

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
      <section className="hero-body-index">
        <form onSubmit={this.handleSubmit} className="user-container">
          <div className="registerForm">
            {/* <h2 className="title">Register</h2> */}
            <br />
            <div className="registerContainer">
              <div className="field">
                <label className="registerLabel">First name</label>
                <div className="control">
                  <input
                    className="input"
                    placeholder="Enter your first name"
                    id="first_name"
                    name="first_name"
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="field">
                <label className="registerLabel">Surname</label>
                <div className="control">
                  <input
                    className="input"
                    placeholder="Enter your surname"
                    id="second_name"
                    name="second_name"
                    onChange={this.handleChange}
                  />
                </div>
                {/* {this.state.errors.name && <small className="help is-danger">{this.state.errors}</small>} */}
              </div>
              <div className="field">
                <label className="registerLabel">Username</label>
                <div className="control">
                  <input
                    className="input"
                    placeholder="Enter your username"
                    id="username"
                    name="username"
                    onChange={this.handleChange}
                  />
                </div>
                {/* {this.state.errors.name && <small className="help is-danger">{this.state.errors}</small>} */}
              </div>
              <div className="field">
                <label className="registerLabel">Email</label>
                <div className="control">
                  <input
                    className="input"
                    placeholder="Enter email"
                    id="email"
                    name="email"
                    onChange={this.handleChange}
                  />
                </div>
                {/* {this.state.errors.email && <small className="help is-danger">{this.state.errors}</small>} */}
              </div>
              <div className="field">
                <label className="registerLabel">Password</label>
                <div className="control">
                  <input
                    className="input"
                    type="password"
                    placeholder="Enter password"
                    id="password"
                    name="password"
                    onChange={this.handleChange}
                  />
                </div>
                {/* {this.state.errors.password && <small className="help is-danger">{this.state.errors}</small>} */}
              </div>
              <div className="field">
                <label className="registerLabel">Password Confirmation</label>
                <div className="control">
                  <input
                    className="input"
                    type="password"
                    placeholder="Re-enter password"
                    id="password_confirmation"
                    name="password_confirmation"
                    onChange={this.handleChange}
                  />
                </div>
                <br />
                <button type="submit" className="registerButton">Register now</button>
                {/* {this.state.errors.passwordConfirmation && <small className="help is-danger">{this.state.errors}</small>} */}
              </div>
            </div>
          </div>
          {/* <div className="user-image">
            <ImageUpload
              handleChange={this.handleChange}
              fieldName="image"
              inputClassName="my-input-class"
            />
          </div> */}
          {/* <div className="skills-recipes">
            <div className="fieldContainer">
              <div className="control"> */}
          {/* <Select
                  options={this.options}
                  isMulti
                  onChange={this.handleMultiChange}
                /> */}
          {/* </div> */}
          {/* <div className="field">
                <label className="label">Cities visited</label>
                <div className="control">
                  <input
                    className="input"
                    placeholder="City"
                    name="city"
                    onChange={this.handleChange}
                  />
                </div>
                {/* {this.state.errors.city && <small className="help is-danger">{this.state.errors.city}</small>} */}
          {/* </div>  */}
          {/* </div>
          </div> */}
        </form>
      </section>
    )
  }
}

export default Register