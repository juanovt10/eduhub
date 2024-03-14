import React, { useState } from 'react'
import Avatar from '../../components/Avatar';
import { useCurrentUser } from '../../context/CurrentUserContext';
import Rating from '../../components/Rating';
import { Row, Col } from 'react-bootstrap';
import styles from '../../styles/Review.module.css';
import {Dropdown, DropdownButton} from 'react-bootstrap';
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '../../@/components/ui/dropdown-menu';
import {Button} from '../../@/components/ui/button';

const Review = ({fetchReviews, setCourse, setReviews, ...props}) => {



    console.log(props)
    const {
        id,
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


    // this is for the modals
    // probably to change if using leafs
    const [showModal, setShowModal] = useState({
        showEditModal: false,
        showDeleteModal: false,
    })

    const handleModalDisplay = (modalType, bool) => {
        setShowModal((prevModals) => ({
            ...prevModals,
            [modalType]: bool,
        }));
    }

    const ratingNames = {
        5: 'Excelent',
        4: 'Good',
        3: 'Average',
        2: 'Poor',
        1: 'Terrible',
    }

    return (
        <div className={styles.reviewContainer}>
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
                        <div>
                            <DropdownMenu >
                                <DropdownMenuTrigger asChild className={styles.dropdown}>
                                    <Button variant="outline" className={`px-3 ${styles.dropdownSymbol}`}><i class="fa-solid fa-ellipsis"></i></Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className={`w-56 ${styles.dropdownMenu}`}>
                                    <DropdownMenuItem className={styles.dropdownItem}><i class="fa-solid fa-pen"></i><span className='ml-1'>Edit</span></DropdownMenuItem>
                                    <DropdownMenuItem className={styles.dropdownItem}><i class="fa-solid fa-trash"></i><span className='ml-1'>Edit</span></DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    )}
                </Col>
            </Row>
            <Row className='ml-0 p-0'>
                <Col>
                    <Rating rating={rating}/>
                    {/* to be checked */}
                    <p>{ratingNames[rating]}</p>
                </Col>
            </Row>
            <Row className='ml-0 p-0'>
                <h6>{title}</h6>
                <p>{content}</p>
            </Row>
        </div>
    )
}

export default Review