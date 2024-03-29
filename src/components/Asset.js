import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

const Asset = ({src, spinner, message, size}) => {
    return (
        <div className='d-flex flex-column justify-content-center align-items-center'>
            {spinner && <Spinner animation='border' size={size} />}
            {src && <img src={src} alt={message} />}
            {message && <p className='text-center'>{message}</p>}
        </div>
    )
}

export default Asset