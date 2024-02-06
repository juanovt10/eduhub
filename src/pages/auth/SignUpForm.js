import React, { useState } from 'react';
import FloatingLabel from 'react-bootstrap-floating-label';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import styles from '../../styles/SignUpForm.module.css'
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Alert } from 'react-bootstrap';

const SignUpForm = () => {

    const [signUpData, setSignUpData] = useState({
        username: "",
        password1: "",
        password2: "",
    });

    const { username, password1, password2 } = signUpData; 

    const [errors, setErrors] = useState({});

    const history = useHistory();

    const handleChange = (event) => {
        setSignUpData({
            ...signUpData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post('/dj-rest-auth/registration/', signUpData);
            history.push('/signin');
        } catch(err) {
            setErrors(err.response?.data);
        }
    };

    return (
        <div className='d-flex justify-content-center align-items-center'>
            <Card>
                <Card.Body className={styles.CardBody}>
                    <Card.Title className={styles.CardTitle} >Sign Up</Card.Title>
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

                        <Button className={styles.ButtonPrimary} type="submit">
                            Sign Up
                        </Button>
                        {errors.non_field_errors?.map((message, idx) => 
                            <Alert variant="warning" className="mt-3" key={idx}>{message}</Alert>
                        )}
                    </Form>
                </Card.Body>
            </Card>
        </div>
    )
}

export default SignUpForm