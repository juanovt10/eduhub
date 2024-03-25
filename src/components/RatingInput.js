import React from 'react'

const RatingInput = ({ rating, setRating }) => {

    const handleRating = (rate) => {
        setRating(rate);
    }

    const ratingNames = {
        5: 'Excellent',
        4: "Good",
        3: 'Average',
        2: 'Poor',
        1: 'Terrible',
        0: null,
    };

    return (
        <div className='d-flex'>
            <div>
                {[1, 2, 3, 4, 5].map((star) => (
                    <i
                    key={star}
                    className={star <= rating ? "fa-solid fa-star" : "fa-regular fa-star"} 
                    onClick={() => handleRating(star)}
                    style={{cursor: 'pointer, marginRight: 5'}}
                    ></i>
                    ))}
            </div>
            {rating ? (
                <div className='ml-2'>
                    <strong>{ratingNames[rating]}</strong>
                </div>
            ) : (
                ""
            )}
        </div>
    )
}

export default RatingInput