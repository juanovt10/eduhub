import React from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';
import styles from '../../styles/RatingsOverview.module.css';

const ReviewsOverview = ({reviews, ...props}) => {

    const { ratings_count } = props;

    const reviewsPerRating = (rating) => {
        return reviews.filter(review => review.rating === rating).length;
    };

    const value = {
        5: 'Excelent',
        4: 'Good',
        3: 'Average',
        2: 'Poor',
        1: 'Terrible',
    };

    return (
        <div>
            {Array.from({ length: 5}, (_, i) => 5 - i).map(rating => {
                const count = reviewsPerRating(rating);
                const percentage = ratings_count > 0 ? (count / ratings_count) * 100 : 0;
                return (
                    <div key={rating} className='d-flex align-items-center'>
                        <div className={styles.labelContainer}>{value[rating]}</div>
                        <div className={`mx-2 my-1 ${styles.progressBarContainer}`}>
                            <ProgressBar now={percentage} variant='info' className={styles.progressBarCustom} />
                        </div>
                        <span>({count})</span>
                    </div>
                )
            })}
        </div>
    )
}



export default ReviewsOverview