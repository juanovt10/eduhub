import React from 'react'
import Card from 'react-bootstrap/Card';
import { Button, ListGroup, Row, Col } from 'react-bootstrap';
import Rating from '../../components/Rating';
import styles from '../../styles/CourseCard.module.css';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

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

    return (
        <Card>
            <Card.Header>{category}</Card.Header>
            <Card.Img className={styles.Image} variant="top" src={image} />
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>
                    {description}
                </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
                <ListGroup.Item>{price}</ListGroup.Item>
                <ListGroup.Item>{duration}</ListGroup.Item>
                <ListGroup.Item><Rating rating={overall_rating} /><span className="ml-1">({ratings_count})</span></ListGroup.Item>
            </ListGroup>
            <Card.Body>
                <Row>
                    <Col xs={5} className='d-flex justify-content-between align-items-center'>
                        {video_hours > 0 ? <i class="fa-solid fa-video"></i> : "" }
                        {article_count > 0 ? <i class="fa-brands fa-readme"></i> : "" }
                        {test_count > 0 ? <i class="fa-solid fa-pen-to-square"></i> : "" }  
                    </Col>
                    <Col xs={7} className='d-flex justify-content-center w-100'>
                        <Link to={`/courses/${id}`}>Explore course</Link>
                    </Col>
                </Row>                
            </Card.Body>
        </Card>
    )
}

export default CourseCard