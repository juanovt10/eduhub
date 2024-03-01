import React from 'react'
import Spinner from 'react-bootstrap/Spinner'

const Asset = ({spinner, message}) => {
    return (
        <div className='d-flex justify-content-center align-items-center'>
            {spinner && <Spinner animation='border'/>}
            {message && <p>{message}</p>}
        </div>
    )
}

export default Asset