import React from 'react';
import styles from '../styles/NotFound.module.css'
import Asset from './Asset';
import logoSvg from '../assets/eduhub-color-logo-no-name.png'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const NotFound = () => {
    const history = useHistory();

    const handleReturn = () => {
        history.goBack();
    }

    return (
        <div className={styles.pageContainer}>
            <Asset src={logoSvg} message="The page you are trying to reach does not exist." />
            <strong>
                Please try a different url or <span className={styles.returnLink} onClick={handleReturn}>go back.</span>
            </strong>
        </div>
    )
}

export default NotFound