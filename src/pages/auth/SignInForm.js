import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import styles from '../../styles/Authenticator.module.css'
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import { useSetCurrentUser } from '../../context/CurrentUserContext';
import { axiosReq } from '../../api/axiosDefaults'; 
import logo from '../../assets/eduhub-color-logo.png'
import Asset from '../../components/Asset';

const SignInForm = () => {
    const setCurrentUser = useSetCurrentUser();

    const [startLoading, setStartLoading] = useState(false);
    const [signInData, setSignInData] = useState({
        username: "",
        password: "",
    });

    const { username, password } = signInData; 

    const [errors, setErrors] = useState({});

    const history = useHistory();

    const handleChange = (event) => {
        setSignInData({
            ...signInData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setStartLoading(true);
        try {
            const {data} = await axios.post('/dj-rest-auth/login/', signInData);
            setCurrentUser(data.user)

            const newProfileId = data.user.profile_id

            const profileResponse = await axiosReq.get(`/profiles/${newProfileId}/`)

            const profileData = profileResponse.data
            
            if (profileData.bio === "") {
                history.push('/profiles/create')
            } else {
                history.push('/');
            }

        } catch(err) {
            setStartLoading(false);
            setErrors(err.response?.data);
        }

    };
    
    return (
        <Card className={styles.Card}>
            <Card.Body className={styles.formContainer}>
                <img src={logo} alt="logo" className={styles.logo} />
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="username">
                        <Form.Control
                            className={`mb-3 ${styles.FormControl}`}
                            type="text"
                            name="username"
                            placeholder='Username'
                            value={username}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    {errors.username?.map((message, idx) =>
                        <Alert variant="warning" key={idx}>{message}</Alert>
                    )}

                    <Form.Group controlId="password" >
                        <Form.Control
                            className={`mb-3 ${styles.FormControl}`}
                            placeholder='password'
                            type="password"
                            name="password"
                            value={password}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    {errors.password?.map((message, idx) =>
                        <Alert variant="warning" key={idx}>{message}</Alert>
                    )}

                    <Button className={styles.button} type="submit">
                        {!startLoading ? (
                            "Sign In"
                        ) : (
                            <Asset spinner size='sm' />
                        )}
                    </Button>
                    {errors.non_field_errors?.map((message, idx) =>
                        <Alert variant="warning" className="mt-3" key={idx}>{message}</Alert>
                    )}
                </Form>
            </Card.Body>
        </Card>
    )
}

export default SignInForm