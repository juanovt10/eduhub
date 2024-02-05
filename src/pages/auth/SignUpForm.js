import React from 'react';
import FloatingLabel from 'react-bootstrap-floating-label';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import styles from '../../styles/SignUpForm.module.css'

const SignUpForm = () => {
    return (
        <div className='d-flex justify-content-center align-items-center'>
            <Card>
                <Card.Body className={styles.CardBody}>
                    <Card.Title className={styles.CardTitle} >Sign Up</Card.Title>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Email address"
                        className="mb-3"
                    >
                        <Form.Control className={styles.FormControl} type="email" placeholder="name@example.com" />
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingPassword" label="Password">
                        <Form.Control className={styles.FormControl} type="password" placeholder="Password" />
                    </FloatingLabel>
                    <Button className={styles.ButtonPrimary} type="submit">
                        Submit
                    </Button>
                </Card.Body>
            </Card>
            
        </div>
    )
}

export default SignUpForm