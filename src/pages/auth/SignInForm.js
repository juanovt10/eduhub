import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import styles from '../../styles/SignUpForm.module.css'
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import { useSetCurrentUser } from '../../context/CurrentUserContext';

const SignInForm = () => {
    const setCurrentUser = useSetCurrentUser();

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
        try {
            const {data} = await axios.post('/dj-rest-auth/login/', signInData);
            setCurrentUser(data.user)
            history.push('/');
        } catch(err) {
            setErrors(err.response?.data);
        }
    };

    return (
        <div className='d-flex justify-content-center align-items-center'>
            <Card>
                <Card.Body className={styles.CardBody}>
                    <Card.Title className={styles.CardTitle} >Sign In</Card.Title>
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

                        <Button className={styles.ButtonPrimary} type="submit">
                            Sign In
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

export default SignInForm