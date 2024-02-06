import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import imageSrc from '../../assets/images/pexels-tima-miroshnichenko-5428148.jpg';

const HeroSection = () => {
    const heroSectionData = [
        {
            image: imageSrc,
            caption: "Caption of the first slide",
            description: 'description of the first slide',
        },
        {
            image: imageSrc,
            caption: "Caption of the second slide",
            description: 'description of the second slide',
        },
        {
            image: imageSrc,
            caption: "Caption of the third slicde",
            description: 'description of the third slide',
        },
    ]

    const [index, setIndex] = useState(0);
    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };



    return (
        <Carousel activeIndex={index} onSelect={handleSelect}>
            {heroSectionData.map((slide, i) => {
                return (
                    <Carousel.Item key={i} interval={3000}>
                        <img 
                            className='d-block w-100 img-fluid'
                            src={slide.image}
                            alt="slider"
                        />
                        <Carousel.Caption>
                            <h3>{slide.caption}</h3>
                            <p>{slide.description}</p>
                        </Carousel.Caption>    
                    </Carousel.Item>
                )
            })}
        </Carousel>
    )
}

export default HeroSection