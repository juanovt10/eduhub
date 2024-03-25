import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

const Asset = ({spinner, message, size}) => {
    return (
        <div className='d-flex justify-content-center align-items-center'>
            {spinner && <Spinner animation='border' size={size} />}
            {message && <p>{message}</p>}
        </div>
    )
}

export default Asset