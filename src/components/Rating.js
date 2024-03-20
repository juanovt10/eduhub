import React, { useEffect } from 'react';

const Rating = (props) => {
    const rating = Math.max(0, Math.min(props.rating, 5))

    const fullStar = Math.floor(rating);
    const halfStar = rating % 1 >= 0.25;
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
        </div>
    )
}

export default Rating