import React, { useEffect, useState } from 'react';
import { Form, Col, Row, Alert, Button } from 'react-bootstrap';
import { axiosRes } from '../../api/axiosDefaults';
import RatingInput from '../../components/RatingInput';
import styles from '../../styles/Review.module.css';
import Avatar from '../../components/Avatar';
import { useCurrentUser } from '../../context/CurrentUserContext';
import { axiosReq } from '../../api/axiosDefaults';


const ReviewCreateForm = (props) => {
    const { course, setCourse, setReviews } = props
    const currentUser = useCurrentUser();
    const [userData, setUserData] = useState({});
    const [errors, setErrors] = useState({});
    const [reviewData, setReviewData] = useState({
        title: "",
        content: "",
        rating: 0,
    })

    useEffect(() => {
        const fetchUserData = async () => {
            const userDataResponse = await axiosReq.get(`/profiles/${currentUser.pk}`)
            console.log(userDataResponse.data)
            setUserData(userDataResponse.data)
        }

        fetchUserData();
    }, [])


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
                <Col>
                <div className='d-flex align-items-center justify-content-start'>
                        <Avatar
                            src={userData.image}
                            height={40}
                        />
                        <div>
                            <h5 className='m-0'>{userData.owner}</h5>
                        </div>
                    </div>
                </Col>
            </Row>
            <Row>
                <h5>Let us know what you think about teh course!</h5>
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
                            <Form.Label>Content</Form.Label>
                            <Form.Control 
                                name="content"
                                value={content}
                                onChange={handleChange}
                                as="textarea"
                                placeholder="Enter course title" />
                        </Form.Group>
                        {errors.content?.map((message, idx) => (
                            <Alert variant="warning" key={idx}>
                                {message}
                            </Alert>
                        ))}
                    </Row>
                    <Row>
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
            </Row>
        </div>
    )
}

export default ReviewCreateForm;