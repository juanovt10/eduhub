import React from 'react';
import styles from '../styles/Avatar.module.css';

const Avatar = ({ src, height, text }) => {

  return (
    <span className='d-flex flex-column justify-content-center align-items-center'>
        <img 
            className={styles.Avatar}
            src={src}
            height={height}
            width={height}
            alt="avatar"
        />
        {text}
    </span>
  )
}

export default Avatar