import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import { axiosRes } from '../../api/axiosDefaults'
import {
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "../../@/components/ui/sheet";
import styles from '../../styles/ReviewEdit.module.css'

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
        <SheetContent className={styles.sheetContainer} side={'right'}>
            <SheetHeader>
                <SheetTitle className={styles.sheetTitle}>Delete review</SheetTitle>
            </SheetHeader>
            <SheetDescription>
                Are you sure you want to delete your review?
            </SheetDescription>
            <Button variant='primary' onClick={onHide}>No!!!</Button>
            <Button variant='danger' onClick={handleDelete}>Yes, Delete review</Button>
        </SheetContent>
    )
}

export default ReviewDelete