import React from 'react'

const RatingInput = ({ rating, setRating }) => {

    const handleRating = (rate) => {
        setRating(rate);
    }

    return (
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
    )
}

export default RatingInput