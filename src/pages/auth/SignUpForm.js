import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
// import styles from '../../styles/SignUpForm.module.css'
import styles from '../../styles/Authenticator.module.css'
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import logo from '../../assets/eduhub-color-logo.png'
import Asset from '../../components/Asset';


const SignUpForm = ({ onSignUpSuccess }) => {

    const [startLoading, setStartLoading] = useState(false);
    const [signUpData, setSignUpData] = useState({
        username: "",
        password1: "",
        password2: "",
    });

    const { username, password1, password2 } = signUpData; 

    const [errors, setErrors] = useState({});

    const history = useHistory();
    const form = useForm();

    const handleChange = (event) => {
        setSignUpData({
            ...signUpData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setStartLoading(true)
        try {
            await axios.post('/dj-rest-auth/registration/', signUpData);
            onSignUpSuccess();
        } catch(err) {
            setStartLoading(false);
            setErrors(err.response?.data);
        } finally {
            setStartLoading(false);
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

                    <Form.Group controlId="password1" >
                        <Form.Control
                            className={`mb-3 ${styles.FormControl}`}
                            placeholder='password'
                            type="password"
                            name="password1"
                            value={password1}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    {errors.password1?.map((message, idx) =>
                        <Alert variant="warning" key={idx}>{message}</Alert>
                    )}

                    <Form.Group controlId="password2">
                        <Form.Control
                            className={`mb-3 ${styles.FormControl}`}
                            placeholder='confirm password'
                            type="password"
                            name="password2"
                            value={password2}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    {errors.password2?.map((message, idx) =>
                        <Alert variant="warning" key={idx}>{message}</Alert>
                    )}

                    <Button className={styles.button} type="submit">
                        {!startLoading ? (
                            "Sign Up"
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

export default SignUpForm