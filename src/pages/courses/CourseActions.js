import { ColorWheelIcon } from '@radix-ui/react-icons';
import React, { useState } from 'react'
import { Button, Col, Container, Image, Row, Modal } from 'react-bootstrap';
import { axiosRes } from '../../api/axiosDefaults';

const CourseActions = (courseId) => {

    const [enrollment, setEnrollment] = useState(false)
    const [wishList, setWishList] = useState(false)

    const id = courseId


    const handleEnrollment = async (event) => {
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

    const handleWishList = async (event) => {
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
        <Row>
            <Col>
                {!enrollment && (
                    <Button onClick={handleEnrollment}>Enroll <i class="fa-solid fa-graduation-cap"></i>+</Button>
                )}
            </Col>
            <Col>
                {!wishList && (
                    <Button onClick={handleWishList}>Add to wish list <i class="fa-solid fa-heart"></i>+</Button>
                )}
            </Col>
        </Row>
    )
}

export default CourseActions