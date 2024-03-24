import React, { useEffect, useState } from 'react';
import { Form, Col, Row, Alert, Button } from 'react-bootstrap';
import { axiosRes } from '../../api/axiosDefaults';
import RatingInput from '../../components/RatingInput';
import styles from '../../styles/Review.module.css';
import Asset from '../../components/Asset';


const ReviewCreateForm = (props) => {
    const { course, setCourse, setReviews } = props
    const [startLoadingSubmition, setStartLoadingSubmition] = useState(false);
    const [errors, setErrors] = useState({});
    const [reviewData, setReviewData] = useState({
        title: "",
        content: "",
        rating: 0,
    })

    const { title, content, rating} = reviewData;

    const handleChange = (event) => {
        setReviewData({
            ...reviewData,
            [event.target.name]: event.target.value,
        });
    }

    const handleRatingChange = (newRating) => {
        setReviewData({ ...reviewData, rating: newRating});
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setStartLoadingSubmition(true);
        try {
            const { data } = await axiosRes.post('/ratings/', {
                title,
                content, 
                rating, 
                course,
            });
            setReviews((prevReviews) => ({
                ...prevReviews,
                results: [data, ...prevReviews.results]
            }));
            setCourse((prevCourse) => ({
                results: [
                {
                    ...prevCourse.results[0],
                    ratings_count: prevCourse.results[0].ratings_count + 1,
                },
                ],
            }));
        } catch(err) {
            console.log(err.response.data)
        }
    }

    return (
        <div className={styles.reviewContainer}>
            <Row>
                <h5 className='mb-3'>Let us know what you think about the course!</h5>
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Form.Group as={Col}>
                            <Form.Label>Title</Form.Label>
                            <Form.Control 
                                name="title"
                                value={title}
                                onChange={handleChange}
                                type="text"
                                placeholder="Enter course title" />
                        </Form.Group>
                        {errors.title?.map((message, idx) => (
                            <Alert variant="warning" key={idx}>
                                {message}
                            </Alert>
                        ))}
                    </Row>
                    <Row>
                        <Form.Group as={Col}>
                            <Form.Control 
                                name="content"
                                value={content}
                                onChange={handleChange}
                                as="textarea"
                                placeholder="Enter your review" />
                        </Form.Group>
                        {errors.content?.map((message, idx) => (
                            <Alert variant="warning" key={idx}>
                                {message}
                            </Alert>
                        ))}
                    </Row>
                    <Row>
                        <Form.Group as={Col} className='d-flex'>
                            <Form.Label className='mr-2'>Your rating:</Form.Label>
                            <RatingInput rating={rating} setRating={handleRatingChange} />
                        </Form.Group>
                        {errors.rating?.map((message, idx) => (
                            <Alert variant="warning" key={idx}>
                                {message}
                            </Alert>
                        ))}
                    </Row>
                    <Button className={styles.buttonPrimary} type="submit">
                        {!startLoadingSubmition ? (
                            "Submit"
                        ) : (
                            <Asset spinner size='sm'/>
                        )}
                    </Button>
                </Form>
            </Row>
        </div>
    )
}

export default ReviewCreateForm;