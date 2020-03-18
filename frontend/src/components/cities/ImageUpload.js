import React from 'react'
import axios from 'axios'

class ImageUpload extends React.Component {
  state = {
    location_image: null
  }


  handleUpload = async ({ target: { files } }) => {
    const data = new FormData()
    data.append('file', files[0])
    data.append('upload_preset', 'wyzoqklf')
    const res = await axios.post('https://api.cloudinary.com/v1_1/tbanks9/image/upload', data)
    this.setState({ location_image: res.data.url }, () => {
      console.log('uploading photo')
      this.props.onChange({ target: { name: this.props.fieldName, value: res.data.url } })
      console.log(this.props)
    })
  }

  render() {
    const labelClass = this.props.labelClassName ? this.props.labelClassName : 'default_class'
    const { location_image } = this.state
    return (
      <>
        {location_image ?
          <div>
            <img src={location_image} />
          </div>
          :
          <>
            <label className={labelClass}>{this.props.labelText}</label>
            <input
              className={this.props.inputClassName}
              type="file"
              onChange={this.handleUpload}
            />
          </>
        }
      </>
    )
  }
}

export default ImageUpload