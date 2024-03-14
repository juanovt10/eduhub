import React from 'react'
import Card from 'react-bootstrap/Card';
import { Button, ListGroup, Row, Col } from 'react-bootstrap';
import Rating from '../../components/Rating';
import styles from '../../styles/CourseCard.module.css';
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const CourseCard = (props) => {
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

    const history = useHistory();

    const goToCourse = () => {
        history.push(`/courses/${id}`);
    }

    return (

        <Card className={styles.CompactCard}>
            <div className={styles.CardImageContainer}>
                <Card.Img className={styles.Image} variant="top" src={image} />
                <div className={styles.CategoryLabel}>{category}</div>
            </div>
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text className={styles.CompactDescription}>
                    {description.length > 50 ? `${description.substring(0, 50)}...` : description}
                </Card.Text>
                <div className={styles.CourseDetails}>
                    <span>${price}</span>
                    <span>{enrollments_count} Enrollments</span>
                </div>
                <div className='d-flex justify-content-center align-items-center my-3'>
                    <Rating rating={overall_rating} /> ({ratings_count})
                </div>
                <div className='d-flex justify-content-evenly'>
                    {video_hours > 0 && <i className="fa-solid fa-video" title="Video Hours"></i>}
                    {article_count > 0 && <i className="fa-brands fa-readme" title="Articles"></i>}
                    {test_count > 0 && <i className="fa-solid fa-pen-to-square" title="Tests"></i>}
                </div>
            </Card.Body>
            <Card.Footer className="text-center">
                <Button onClick={goToCourse} className={styles.buttonPrimary}>Explore Course</Button>
            </Card.Footer>
        </Card>
    )
}

export default CourseCard