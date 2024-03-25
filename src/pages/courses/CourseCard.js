import React from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Rating from '../../components/Rating';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import styles from '../../styles/CourseCard.module.css';


const CourseCard = (props) => {
    const {
        id,
        title,
        description,
        image,
        category,
        price,
        video_hours,
        test_count,
        article_count,
        overall_rating,
        ratings_count,
        enrollments_count,
    } = props;

    const history = useHistory();

    const goToCourse = () => {
        history.push(`/courses/${id}`);
    };

    return (

        <Card className={styles.CompactCard}>
            <div className={styles.CardImageContainer}>
                <Card.Img className={styles.Image} variant="top" src={image} />
                <div className={styles.CategoryLabel}>{category}</div>
            </div>
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text className={styles.CompactDescription}>
                    {description.length > 50 ? `${description.substring(0, 50)}...` : description}
                </Card.Text>
                <div className={styles.CourseDetails}>
                    <span>${price}</span>
                    <span>{enrollments_count} Enrollments</span>
                </div>
                <div className='d-flex justify-content-center align-items-center my-3'>
                    <Rating rating={overall_rating} /> ({ratings_count})
                </div>
                <div className='d-flex justify-content-evenly'>
                    {video_hours > 0 &&
                        <OverlayTrigger
                            placement='top'
                            overlay={<Tooltip>{video_hours} {video_hours > 1 ? "video hours" : 'video hour'}</Tooltip>}
                        >
                            <i className="fa-solid fa-video" title="Video Hours"></i>
                        </OverlayTrigger>
                    }
                    {article_count > 0 && 
                        <OverlayTrigger
                            placement='top'
                            overlay={<Tooltip>{article_count} {article_count > 1 ? 'articles' : 'article'}</Tooltip>}
                        >
                            <i className="fa-brands fa-readme" title="Articles"></i>
                        </OverlayTrigger>
                    }
                    {test_count > 0 && 
                        <OverlayTrigger
                            placement='top'
                            overlay={<Tooltip>{test_count} {test_count > 1 ? 'tests' : 'test'}</Tooltip>}
                        >
                            <i className="fa-solid fa-pen-to-square" title="Tests"></i>
                        </OverlayTrigger>  
                    }
                </div>
            </Card.Body>
            <Card.Footer className="text-center">
                <Button onClick={goToCourse} className={styles.buttonPrimary}>Explore Course</Button>
            </Card.Footer>
        </Card>
    )
}

export default CourseCard