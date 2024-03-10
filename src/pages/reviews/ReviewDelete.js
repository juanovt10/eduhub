import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import { axiosRes } from '../../api/axiosDefaults'

const ReviewDelete = ({onHide, fetchReviews, setCourse, setReviews, id}) => {

    const handleDelete = async () => {
        try {
            await axiosRes.delete(`/ratings/${id}/`)
            if (setCourse) {
                setCourse(prevCourse => ({
                    results: [{
                        ...prevCourse.results[0],
                        ratings_count: prevCourse.results[0].ratings_count -1
                    }]
                }))
            }

            if (setReviews) {
                setReviews(prevReviews => ({
                    ...prevReviews,
                    results: prevReviews.results.filter(review => review.id !== id),
                }))
            }


            fetchReviews();
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div>
            <Modal.Header closeButton>
                <Modal.Title>Delete review?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are you sure you want to delete the review?
            </Modal.Body>
            <Modal.Footer>
                <Button variant='primary' onClick={onHide}>No!!!</Button>
                <Button variant='danger' onClick={handleDelete}>Yes, Delete review</Button>
            </Modal.Footer>
        </div>
    )
}

export default ReviewDelete