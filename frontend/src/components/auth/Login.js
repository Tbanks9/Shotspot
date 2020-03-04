import React from 'react'
import axios from 'axios'
import Auth from '../../lib/auth'
import { headers } from '../../lib/headers'

class Login extends React.Component {
  state = {
    data: {
      email: '',
      password: ''
    },
    error: ''
  }

  handleChange = ({ target: { name, value } }) => {
    const data = { ...this.state.data, [name]: value }
    this.setState({ data, error: '' })
  }

  handleSubmit = async e => {
    e.preventDefault()
    try {
      const res = await axios.post('/api/login', this.state.data, headers)
      Auth.setToken(res.data.token)
      this.props.history.push('/')
    } catch (err) {
      this.setState({ error: 'Invalid Credentials' })
    }
  }

  render() {
    return (
      <>
        <section className="hero-body-index"> 
          <div className="logincontainer">
            <div className="logincolumns">
              <form onSubmit={this.handleSubmit} className="column">
                <h1 className="logintitle has-texted-centered">Login</h1>
                <div className="field">
                  <div className="control">
                    <input
                      className={`input is-large is-primary ${this.state.error ? 'is-dark' : ''}`}
                      id="email"
                      name="email"
                      placeholder="Email"
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
                <div className="loginfield">
                  <br></br>
                  <div className="control">
                    <input
                      className={`input is-large is-primary ${this.state.error ? 'is-danger' : ''}`}
                      type="password"
                      id="password"
                      name="password"
                      placeholder="Password"
                      onChange={this.handleChange}
                    />
                  </div>
                  {this.state.error && <small className="is-danger">{this.state.error}</small>}
                </div>
                <br></br>
                <button type="submit" className="loginButton">Login</button>
              </form>
            </div>
          </div>
        </section>
      </>
    )
  }
}

export default Login