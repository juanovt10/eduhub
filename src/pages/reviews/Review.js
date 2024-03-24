import React, { useEffect, useState } from 'react'
import Avatar from '../../components/Avatar';
import { useCurrentUser } from '../../context/CurrentUserContext';
import Rating from '../../components/Rating';
import { Row, Col } from 'react-bootstrap';
import styles from '../../styles/Review.module.css';
import { Sheet } from "../../@/components/ui/sheet";
import ReviewEditForm from './ReviewEditForm';
import ReviewDelete from './ReviewDelete';
import Dropdown from '../../components/Dropdown';
import { axiosReq } from '../../api/axiosDefaults';
import { useCourseTitles } from '../../context/CourseTitleContext';
import Asset from '../../components/Asset';

const Review = ({fetchReviews, setCourse, setReviews, profile, ...props}) => {

    const {
        id,
        course,
        title,
        owner,
        rating,
        profile_image,
        content,
        updated_at,
        created_at,
    } = props

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner;
    const { getCourseTitle } = useCourseTitles();
    const [showSheet, setShowSheet] = useState({
        showEditSheet: false,
        showDeleteSheet: false
    })
    const [courseTitle, setCourseTitle] = useState('');
    const [titleHasLoaded, setTitleHasLoaded] = useState(false)

    const handleSheetDisplay = (sheetType, bool) => {
        setShowSheet((prevSheet) => ({
            ...prevSheet,
            [sheetType]: bool,
        }))
    }

    const ratingNames = {
        5: 'Excelent',
        4: 'Good',
        3: 'Average',
        2: 'Poor',
        1: 'Terrible',
    }

    useEffect(() => {
        if (profile) {
            const fetchTitle = async () => {
                const title = await getCourseTitle(course, axiosReq);
                setCourseTitle(title)
                setTitleHasLoaded(true);
            }

            fetchTitle();
        } else {
            setTitleHasLoaded(true);
        }
    }, [course, profile, getCourseTitle])

    return (
        <div className={styles.reviewContainer}>
            {titleHasLoaded ? (
                <>
                    <Row className='mb-3'>
                        <Col className='d-flex align-items-center justify-content-between'>
                            <div className='d-flex align-items-center justify-content-start'>
                                <Avatar
                                    src={profile_image}
                                    height={40}
                                />
                                <div>
                                    <h5 className='m-0'>{owner}</h5>
                                    <p className='m-0'>{!updated_at ? created_at : updated_at}</p>
                                </div>
                            </div>
                            {is_owner && (
                                <>
                                    <Dropdown 
                                        handleSelect={handleSheetDisplay}
                                        actionTypes={['showEditSheet', 'showDeleteSheet']}
                                        entity='review'
                                    />
                                    <Sheet open={showSheet.showEditSheet} onOpenChange={setShowSheet}>
                                        <ReviewEditForm
                                            onHide={() => handleSheetDisplay('showEditSheet', false)}
                                            fetchReviews={fetchReviews}
                                            {...props}
                                        />
                                    </Sheet>
                                    <Sheet open={showSheet.showDeleteSheet} onOpenChange={setShowSheet}> 
                                        <ReviewDelete
                                            fetchReviews={fetchReviews}
                                            setCourse={setCourse}
                                            setReviews={setReviews}
                                            id={id}
                                        />
                                    </Sheet>
                                </>
                            )}
                        </Col>
                    </Row>
                    <Row className='ml-0 p-0'>
                        <Col>
                            <Rating rating={rating}/>
                            <p>{ratingNames[rating]}</p>
                        </Col>
                    </Row>
                    {profile && (
                        <Row className='ml-0 p-0'>
                            <p>Course: <strong>{courseTitle}</strong></p>
                        </Row>
                    )}
                    <Row className='ml-0 p-0'>
                        <p>{content}</p>
                    </Row>
                </>
            ) : (
                <Asset spinner size='sm' />
            )}
        </div>
    )
}

export default Review