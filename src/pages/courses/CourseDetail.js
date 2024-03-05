import React, { useState } from 'react'
import { useCurrentUser } from '../../context/CurrentUserContext'
import { Button, Col, Container, Image, Row } from 'react-bootstrap';
import styles from '../../styles/CourseDetail.module.css'
import Rating from '../../components/Rating';
import { axiosRes } from '../../api/axiosDefaults';


const CourseDetail = (props) => {
    const {
        id,
        title,
        description,
        owner,
        image,
        category,
        duration,
        created_at,
        price,
        video_hours,
        test_count,
        article_count,
        profile_id,
        profile_image,
        overall_rating,
        rating_id,
        ratings_count,
        enrollments_count,
    } = props

    const [enrollment, setEnrollment] = useState(false)
    const [wishList, setWishList] = useState(false)
    console.log(props)

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

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner;

    return (
        <div>
            <Container>
                <Row>
                    <Col md={6} className={styles.title}>
                        <h2>{title}</h2>
                        <p>{description}</p>
                    </Col>
                    <Col md={6}>
                        <Image className="d-none d-md-block" src={image} fluid/>
                        <h5 className="mt-2">By: {owner}. Created on: {created_at}</h5>
                    </Col>
                </Row>
                <Row>
                    <Col md={3}>
                        <p><i class="fa-solid fa-video"></i> {video_hours} total video hours</p>
                    </Col>
                    <Col md={3}>
                    <p><i class="fa-brands fa-readme"></i> {article_count} total articles</p>
                    </Col>
                    <Col md={3}>
                        <p><i class="fa-solid fa-pen-to-square"></i> {test_count} total tests</p>
                    </Col>
                    <Col md={3}>
                        <Rating rating={overall_rating} /><span className="ml-1">({ratings_count})</span>
                    </Col>
                </Row>
                        
                <Row>
                    <Col md={6}>
                        <p>Price: ${price}</p>
                    </Col>
                    <Col md={6}>
                        <p>Duration: {duration}</p>
                    </Col>
                </Row>    
                <Row>
                    <Col className={styles.title}>
                        {!enrollment && (
                            <Button onClick={handleEnrollment}>Enroll <i class="fa-solid fa-graduation-cap"></i>+</Button>
                        )}
                    </Col>
                    <Col className={styles.title}>
                        {!wishList && (
                            <Button onClick={handleWishList}>Add to wish list <i class="fa-solid fa-heart"></i>+</Button>
                        )}
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default CourseDetail