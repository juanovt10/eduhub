import React, { useState } from 'react';
import { axiosRes } from '../../api/axiosDefaults';
import Asset from '../../components/Asset';
import Button from 'react-bootstrap/Button';
import {
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "../../@/components/ui/sheet";
import styles from '../../styles/ReviewEdit.module.css';

const ReviewDelete = ({fetchReviews, setCourse, setReviews, id}) => {

    const [startedLoading, setStartedLoading] = useState(false);

    const handleDelete = async () => {
        setStartedLoading(true);
        try {
            await axiosRes.delete(`/ratings/${id}/`);
            if (setCourse) {
                setCourse(prevCourse => ({
                    results: [{
                        ...prevCourse.results[0],
                        ratings_count: prevCourse.results[0].ratings_count -1
                    }]
                }));
            };

            if (setReviews) {
                setReviews(prevReviews => ({
                    ...prevReviews,
                    results: prevReviews.results.filter(review => review.id !== id),
                }));
            };

            fetchReviews();
        } catch (err) {
        };
    };

    return (
        <SheetContent className={styles.sheetContainer} side={'right'}>
            <SheetHeader>
                <SheetTitle className={styles.sheetTitle}>Delete review</SheetTitle>
            </SheetHeader>
            <SheetDescription>
                Are you sure you want to delete your review?
            </SheetDescription>
            <Button variant='danger' onClick={handleDelete}>
                {!startedLoading ? (
                    'Yes, Delete review'
                ) : (
                    <Asset spinner size='sm' />
                )}
            </Button>
        </SheetContent>
    )
}

export default ReviewDelete