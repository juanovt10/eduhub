import React, { useEffect, useState } from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';
import styles from '../../styles/RatingsOverview.module.css';
import { axiosReq } from '../../api/axiosDefaults';

const ReviewsOverview = ({reviews, totalReviews, courseId}) => {
    const [ratingsOverview, setRatingsOverview] = useState([]);

    useEffect(() => {
        const fetchRatingsOverview = async () => {
            try {
                const response = await axiosReq.get(`/ratings/stats/${courseId}`)
                console.log(response.data)
                setRatingsOverview(response.data)
            } catch (error) {
                console.log(error)
            }
        }

        fetchRatingsOverview();
    }, [courseId])


    const value = {
        5: 'Excelent',
        4: 'Good',
        3: 'Average',
        2: 'Poor',
        1: 'Terrible',
    };

    return (
        <div>
            {Object.entries(value).reverse().map(([rating, label]) => {
                const ratingData = ratingsOverview.find((item) => item.rating.toString() === rating);
                const count = ratingData ? ratingData.count : 0;
                const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;

                return (
                    <div key={rating} className='d-flex align-items-center'>
                        <div className={styles.labelContainer}>{label}</div>
                        <div className={`mx-2 my-1 ${styles.progressBarContainer}`}>
                            <ProgressBar now={percentage} variant='info' className={styles.progressBarCustom} />
                        </div>
                        <span>({count})</span>
                    </div>
                );
            })}
        </div>
    )
}



export default ReviewsOverview