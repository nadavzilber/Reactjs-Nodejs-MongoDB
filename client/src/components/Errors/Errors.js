import React from 'react'
import './Error.css'

const Error = (props) => {
  return (
    <div className='errors'>
      <p>{props.errMsg}</p>
    </div>
    )
}

export default Error;