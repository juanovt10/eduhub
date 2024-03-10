import React, { useState } from 'react'
import { Form, Modal, Button } from 'react-bootstrap'
import RatingInput from '../../components/RatingInput'
import { axiosRes } from '../../api/axiosDefaults'

const ReviewEditForm = ({onHide, fetchReviews, ...props}) => {

    const [reviewData, setReviewData] = useState({...props})

    const {id, title, rating, content} = reviewData;

    console.log(id)

    const handleChange = (e) => {
        setReviewData({
            ...reviewData,
            [e.target.name]: e.target.value,
        })
    }

    const handleRatingChange = (newRating) =>{
        setReviewData({ ...reviewData, rating: newRating})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axiosRes.put(`/ratings/${id}/`, {
                title,
                content,
                rating,
            });
            fetchReviews();
            onHide();
        } catch (err) {
            console.log(err)
        }
    }



    return (
        <div>
            <Modal.Header closeButton>
                <Modal.Title>Edit review</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Control 
                            name='title'
                            value={title}
                            onChange={handleChange}
                            type='text'
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control 
                            name='content'
                            value={content}
                            onChange={handleChange}
                            type='text'
                        />
                    </Form.Group>
                    <Form.Group>
                        <RatingInput rating={rating} setRating={handleRatingChange} />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Modal.Body>
        </div>
    )
}

export default ReviewEditForm