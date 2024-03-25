import React, { useState } from 'react'
import { axiosRes } from '../../api/axiosDefaults'
import RatingInput from '../../components/RatingInput'
import Asset from '../../components/Asset';
import Form from 'react-bootstrap/Form'; 
import Button from 'react-bootstrap/Button'; 
import {
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "../../@/components/ui/sheet";
import styles from '../../styles/ReviewEdit.module.css';


const ReviewEditForm = ({onHide, fetchReviews, ...props}) => {

    const [reviewData, setReviewData] = useState({...props});
    const [startedLoading, setStartedLoading] = useState(false);

    const {id, title, rating, content} = reviewData;

    const handleChange = (e) => {
        setReviewData({
            ...reviewData,
            [e.target.name]: e.target.value,
        });
    };

    const handleRatingChange = (newRating) =>{
        setReviewData({ ...reviewData, rating: newRating});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStartedLoading(true);

        try {
            await axiosRes.put(`/ratings/${id}/`, {
                title,
                content,
                rating,
            });
            fetchReviews();
        } catch (err) {
            console.log(err);
        } finally {            
            onHide();
        };
    };

    return (
        <SheetContent className={styles.sheetContainer} side={'right'}>
            <SheetHeader>
                <SheetTitle className={styles.sheetTitle}>Edit review</SheetTitle>
            </SheetHeader>
            <Form onSubmit={handleSubmit} className={styles.sheetForm}>
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
                <Button className={`w-100 ${styles.buttonPrimary}`} type="submit">
                    {!startedLoading ? (
                        'Edit review'
                    ) : (
                        <Asset spinner size='sm' />
                    )}
                </Button>
            </Form>
        </SheetContent>
    )
}

export default ReviewEditForm