import React from 'react'
import { useCurrentUser } from '../../context/CurrentUserContext'
import { Col, Image, Row } from 'react-bootstrap';
import styles from '../../styles/CourseDetail.module.css'

const CourseDetail = (props) => {
    const {
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

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner;

    return (
        <div>
            <Row>
                <Col className={styles.title}>
                    <h2>{title}</h2>
                    <p>{description}</p>
                </Col>
                <Col className={styles.title}>
                    <Image src={image}/>
                </Col>
            </Row>
            <Row>
                <Col>
                    {}
                </Col>
            </Row>
        </div>
    )
}

export default CourseDetail