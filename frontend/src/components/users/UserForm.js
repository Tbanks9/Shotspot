import React from 'react'

const UserForm = ({ data, handleChange, handleDelete, handleSubmit, errors }) => {

  return (
    <section className="hero-body-index">
      <form onSubmit={handleSubmit} className="user-container">
        <div className="registerForm">
          <div className="fieldContainer">
            <h2 className="title">Edit profile</h2>
            <div className="field">
              <label className="registerLabel">First name</label>
              <div className="control">
                <input
                  className={`input ${errors.first_name ? 'is-danger' : ''}`}
                  placeholder="Enter your surname"
                  id="first_name"
                  name="first_name"
                  onChange={handleChange}
                  value={data.first_name}
                />
              </div>
              {errors.name && <small className="help is-danger">{errors.first_name}</small>}
            </div>
            <div className="field">
              <label className="registerLabel">Second name</label>
              <div className="control">
                <input
                  className={`input ${errors.second_name ? 'is-danger' : ''}`}
                  placeholder="Enter your surname"
                  id="second_name"
                  name="second_name"
                  onChange={handleChange}
                  value={data.second_name}
                />
              </div>
              {/* {errors.name && <small className="help is-danger">{errors.first_name}</small>} */}
            </div>
            <div className="field">
              <label className="registerLabel">Username</label>
              <div className="control">
                <input
                  className={`input ${errors.username ? 'is-danger' : ''}`}
                  placeholder="Enter your username"
                  id="username"
                  name="username"
                  onChange={handleChange}
                  value={data.username}
                />
              </div>
              {/* {this.state.errors.name && <small className="help is-danger">{this.state.errors}</small>} */}
            </div>
            <div className="field">
              <label className="registerLabel">Email</label>
              <div className="control">
                <input
                  className={`input ${errors.email ? 'is-danger' : ''}`}
                  placeholder="Email"
                  name="email"
                  onChange={handleChange}
                  value={data.email}
                />
              </div>
              {/* {errors.email && <small className="help is-danger">{errors.email}</small>} */}
            </div>
            {/* <div className="field">
              <label className="label">PASSWORD</label>
              <div className="control">
                <input
                  className={`input is-rounded ${errors.password ? 'is-danger' : ''}`}
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={handleChange}
                />
              </div>
              {/* {errors.password && <small className="help is-danger">{errors.password}</small>} */}
            {/* </div>
            <div className="field">
              <label className="label">Password confirmation</label>
              <div className="control">
                <input
                  className={`input is-rounded ${errors.password_confirmation ? 'is-danger' : ''}`}
                  type="password"
                  placeholder="Password Confirmation"
                  id="password_confirmation"
                  name="password_confirmation"
                  onChange={handleChange}
                />
              </div> */}
              {/* {errors.password_confirmation && <small className="help is-danger">{errors.password_confirmation}</small>} */}
            {/* </div>  */}
          </div>
          <div className="buttons">
            <button type="submit" className="editButton1">Save</button>
            <br />
            <button onClick={handleDelete} className="editButton2">Delete</button>
          </div>
        </div>
      </form>
    </section>
  )
}

export default UserForm