import React from 'react';

const Rating = (props) => {
    const {
        rating = 0,
        ratings_count = 0,
    } = props

    const fullStar = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStar - (halfStar ? 1 : 0);

    return (
        <div>
            {[...Array(fullStar)].fill().map((_, index) => (
                <i class="fa-solid fa-star"></i>
            ))}
            {halfStar && <i class="fa-solid fa-star-half-stroke"></i>}
            {[...Array(emptyStars)].fill().map((_, index) => (
                <i class="fa-regular fa-star"></i>
            ))}
            <span className="ml-1">({ratings_count})</span>
        </div>
    )
}

export default Rating