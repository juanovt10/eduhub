import React from 'react'
import { useCurrentUser } from '../../context/CurrentUserContext'
import { Col, Image, Row } from 'react-bootstrap';
import styles from '../../styles/CourseDetail.module.css'
import Rating from '../../components/Rating';

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
                    <h5 className="mt-2">By: {owner}. Created on: {created_at}</h5>
                </Col>
            </Row>
            <Row>
                <Col className={styles.title}>
                    <p><i class="fa-solid fa-video"></i> {video_hours} total video hours</p>
                    <p><i class="fa-brands fa-readme"></i> {article_count} total articles</p>
                    <p><i class="fa-solid fa-pen-to-square"></i> {test_count} total tests</p>
                    <Rating rating={overall_rating} ratings_count={ratings_count}/>
                </Col>
                <Col>
                    <p>Price: ${price}</p>
                    <p>Duration: {duration}</p>
                </Col>
            </Row>
        </div>
    )
}

export default CourseDetail