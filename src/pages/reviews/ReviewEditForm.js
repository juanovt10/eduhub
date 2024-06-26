import React, { useState } from 'react'
import { axiosRes } from '../../api/axiosDefaults'
import RatingInput from '../../components/RatingInput'
import Asset from '../../components/Asset';
import Form from 'react-bootstrap/Form'; 
import Button from 'react-bootstrap/Button'; 
import Alert from 'react-bootstrap/Alert'; 
import {
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "../../@/components/ui/sheet";
import styles from '../../styles/ReviewEdit.module.css';


const ReviewEditForm = ({onHide, fetchReviews, ...props}) => {

    const [reviewData, setReviewData] = useState({...props});
    const [errors, setErrors] = useState({});
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
            setErrors(err.response?.data);
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
                {errors.content?.map((message, idx) => (
                    <Alert variant="warning" key={idx}>
                        {message}
                    </Alert>
                ))}
                <Form.Group>
                    <RatingInput rating={rating} setRating={handleRatingChange} />
                </Form.Group>
                {errors.rating?.map((message, idx) => (
                    <Alert variant="warning" key={idx}>
                        {message}
                    </Alert>
                ))}
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