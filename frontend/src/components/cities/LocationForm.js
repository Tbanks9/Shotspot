import React from 'react'
import Select from 'react-select'
import ImageUpload from './ImageUpload'

const LocationForm = ({ data, options, handleChange, handleSubmit, handleMultiSelect }) => (
  <>
    <section className="hero-body-index">
      <div className="registerForm">
        <h2 className="create-title">Create a new Photography Spot</h2>
        <div className="registerContainer">
          <form onSubmit={handleSubmit}>
            <div className="field">
              <label className="registerLabel">Location</label>
              <div className="control">
                <input
                  className="input is-primary"
                  placeholder="Location Name"
                  name="location_name"
                  onChange={handleChange}
                  value={data.location_name}
                  required="required"
                />
              </div>
            </div>
            <div className="field">
              <label className="registerLabel">Description</label>
              <div className="control">
                <textarea
                  className="textarea is-primary"
                  placeholder="Description"
                  name="location_description"
                  onChange={handleChange}
                  value={data.location_description}
                />
              </div>
            </div>
            <div className="field">
              <label className="registerLabel">Upload an image</label>
              <div className="image-input">
                <ImageUpload
                  fieldName="location_image"
                  onChange={handleChange}
                  id="files"
                  placeholder="Upload an image"
                  value={data.location_image}
                />
              </div>
            </div>
            <div className="select-control">
              Select your city
              <Select
                getOptionValue={option => option.id}
                getOptionLabel={option => option.city_name}
                options={options}
                isMulti
                onChange={handleMultiSelect}
              />
            </div>
            <button type="submit" className="create-button">Submit</button>
          </form>
        </div>
      </div>
    </section>
  </>

)

export default LocationForm