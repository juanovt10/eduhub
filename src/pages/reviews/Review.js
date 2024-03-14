import React, { useState } from 'react'
import Avatar from '../../components/Avatar';
import { useCurrentUser } from '../../context/CurrentUserContext';
import Rating from '../../components/Rating';
import { Row, Col } from 'react-bootstrap';
import styles from '../../styles/Review.module.css';
import {Dropdown, DropdownButton} from 'react-bootstrap';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '../../@/components/ui/dropdown-menu';
import {Button} from '../../@/components/ui/button';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetClose,
    SheetFooter,
    SheetTitle,
    SheetTrigger,
} from "../../@/components/ui/sheet";
import { Input } from '../../@/components/ui/input';
import { Label } from '../../@/components/ui/label';
import ReviewEditForm from './ReviewEditForm';

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

    const [isSheetOpen, setSheetOpen] = useState(false);

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
                        <>
                            <div>
                                <DropdownMenu >
                                    <DropdownMenuTrigger asChild className={styles.dropdown}>
                                        <Button variant="outline" className={`px-3 ${styles.dropdownSymbol}`}><i class="fa-solid fa-ellipsis"></i></Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className={`w-56 ${styles.dropdownMenu}`}>
                                        <DropdownMenuItem className={styles.dropdownItem} onSelect={() => setSheetOpen(true)}><i class="fa-solid fa-trash"></i><span className='ml-1'>Edit</span></DropdownMenuItem>
                                        <DropdownMenuItem className={styles.dropdownItem}><i class="fa-solid fa-trash"></i><span className='ml-1'>Delete</span></DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>



                            {/* <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
                                <SheetContent className={styles.sheetContainer} side={'right'}>
                                    <SheetHeader>
                                        <SheetTitle>Edit profile</SheetTitle>
                                        <SheetDescription>
                                            Make changes to your profile here. Click save when you're done.
                                        </SheetDescription>
                                    </SheetHeader>
                                    <div className="grid gap-4 py-4">
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="name" className="text-right">
                                                Name
                                            </Label>
                                            <Input id="name" value="Pedro Duarte" className="col-span-3" />
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="username" className="text-right">
                                                Username
                                            </Label>
                                            <Input id="username" value="@peduarte" className="col-span-3" />
                                        </div>
                                    </div>
                                    <SheetFooter>
                                        <SheetClose asChild>
                                            <Button type="submit">Save changes</Button>
                                        </SheetClose>
                                    </SheetFooter>
                                </SheetContent>
                            </Sheet> */}



                            <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
                                <ReviewEditForm fetchReviews={fetchReviews} {...props} />
                            </Sheet>



                        </>




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