import { ColorWheelIcon } from '@radix-ui/react-icons';
import React, { useState } from 'react'
import { Button, Col, Container, Image, Row, Modal, Card } from 'react-bootstrap';
import { axiosRes } from '../../api/axiosDefaults';
import styles from "../../styles/CourseActions.module.css";
import Asset from '../../components/Asset';

const CourseActions = (courseId) => {

    const [enrollment, setEnrollment] = useState(false);
    const [wishList, setWishList] = useState(false);
    const [startLoading, setStartLoading] = useState(false);

    const id = courseId


    const handleEnrollment = async () => {
        setStartLoading(true);
        try {
            const response = await axiosRes.post('/enrollments/', {
                course: id,
            })

            if (response.status === 200 || response.status === 201) {
                setEnrollment(true);
            }
        } catch(err) {
            console.log(err)
        }       
    }

    const handleWishList = async () => {
        setStartLoading(true);
        try {
            const response = await axiosRes.post('/wish_lists/', {
                course: id,
            })

            if (response.status === 200 || response.status === 201) {
                setWishList(true);
            }
        } catch(err) {
            console.log(err)
        }
    }


    return (
        <Row className={styles.courseActionsContainer}>
            <Col xs={12} sm={6} className='mb-3 m-md-0 d-flex aling-items-center justify-content-center'>
                {!wishList && (
                    <Card className={styles.Card}>
                    <Card.Body>
                        <Card.Title>Save it for later!</Card.Title>
                        <Button className={styles.buttonSecondary} onClick={handleWishList}>Add to wish list <i class="fa-solid fa-heart"></i>+</Button>
                    </Card.Body>
                </Card>
                )}
            </Col>
            <Col xs={12} sm={6} className='mb-3 m-md-0 d-flex aling-items-center justify-content-center'>
                {!enrollment && (
                <Card className={styles.Card}>
                    <Card.Body>
                        <Card.Title>Start learning now!</Card.Title>
                        <Button className={styles.buttonPrimary} onClick={handleEnrollment}>
                            {!startLoading ? (
                                <>
                                    Enroll <i class="fa-solid fa-graduation-cap"></i>
                                </>
                            ) : (
                                <Asset spinner size='sm'/>
                            )}
                        </Button>
                    </Card.Body>
                </Card>
                )}
            </Col>
        </Row>
    )
}

export default CourseActions