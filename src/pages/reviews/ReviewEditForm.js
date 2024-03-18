import React, { useState } from 'react'
// import { Form, Modal, Button } from 'react-bootstrap'
import { Form, Button} from 'react-bootstrap'
import RatingInput from '../../components/RatingInput'
import { axiosRes } from '../../api/axiosDefaults'
// import {Button} from '../../@/components/ui/button';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetClose,
    SheetFooter,
    SheetTitle,
    SheetTrigger,
} from "../../@/components/ui/sheet";
import { Input } from '../../@/components/ui/input';
import { Label } from '../../@/components/ui/label';
import styles from '../../styles/ReviewEdit.module.css'

// const ReviewEditForm = ({onHide, fetchReviews, ...props}) => {
const ReviewEditForm = ({onHide, fetchReviews, ...props}) => {

    const [reviewData, setReviewData] = useState({...props})
    const {id, title, rating, content} = reviewData;

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
        } catch (err) {
            console.log(err)
        } finally {            
            onHide();
        }
    }



    return (
        <SheetContent className={styles.sheetContainer} side={'right'}>
            <SheetHeader>
                <SheetTitle className={styles.sheetTitle}>Edit review</SheetTitle>
            </SheetHeader>
            <Form onSubmit={handleSubmit} className={styles.sheetForm}>
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
                        as='textarea'
                        rows={3}
                    />
                </Form.Group>
                <Form.Group>
                    <RatingInput rating={rating} setRating={handleRatingChange} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </SheetContent>
    )
}

export default ReviewEditForm