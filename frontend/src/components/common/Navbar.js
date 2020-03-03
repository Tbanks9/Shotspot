import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import Auth from '../../lib/auth'


class Navbar extends React.Component {
  state = {
    navbarOpen: false,
    searchResult: null
  }

  handleClick = (e) => {
    localStorage.setItem('skill', e.target.innerHTML)
  }

  handleLogout = () => {
    Auth.logout()
    this.props.history.push('/')
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.setState({ navbarOpen: false })
    }
  }

  render() {
    return (
      <nav className="navbar nav is-transparent is-fixed-top">
        <div className="container">
          <Link className="navbar-item" to="/">Home</Link>
          {/* <Link className="navbar-item" to="/map/london">Map</Link> */}
          <Link className="navbar-item" to="/cities">Cities</Link>
          <div className="navbar-end">
            {!Auth.isAuthenticated() && <Link className="navbar-item" to="/register">Register</Link>}
            {!Auth.isAuthenticated() && <Link className="navbar-item" to="/login">Login</Link>}
            {/* {Auth.isAuthenticated() && <Link className="navbar-item has-text-white" to="/messages">Inbox</Link>} */}
            {Auth.isAuthenticated() && <Link className="navbar-item" to="/profile">Profile</Link>}
            {Auth.isAuthenticated() && <a href className="navbar-item" onClick={this.handleLogout}>Logout</a>}
          </div>
        </div>
      </nav>
    )
  }
}

export default withRouter(Navbar)