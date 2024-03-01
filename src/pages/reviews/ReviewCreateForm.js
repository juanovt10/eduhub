import React, { useState } from 'react';
import { Form, Col, Row, Alert, Button } from 'react-bootstrap';
import { axiosRes } from '../../api/axiosDefaults';
import RatingInput from '../../components/RatingInput';


const ReviewCreateForm = (props) => {
    const { course, setCourse, setReviews } = props
    const [errors, setErrors] = useState({});
    const [reviewData, setReviewData] = useState({
        title: "",
        content: "",
        rating: 0,
    })

    const { title, content, rating} = reviewData

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
            console.log(err)
        }
    }


    return (
        <Form className='pt-5 px-5' onSubmit={handleSubmit}>
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
                <Form.Group as={Col}>
                    <Form.Label>Content</Form.Label>
                    <Form.Control 
                        name="content"
                        value={content}
                        onChange={handleChange}
                        type="text"
                        placeholder="Enter course title" />
                </Form.Group>
                {errors.content?.map((message, idx) => (
                    <Alert variant="warning" key={idx}>
                        {message}
                    </Alert>
                ))}
                <Form.Group as={Col}>
                    <Form.Label>Rating</Form.Label>
                    <RatingInput rating={rating} setRating={handleRatingChange} />
                </Form.Group>
                {errors.rating?.map((message, idx) => (
                    <Alert variant="warning" key={idx}>
                        {message}
                    </Alert>
                ))}
            </Row>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    )
}

export default ReviewCreateForm;