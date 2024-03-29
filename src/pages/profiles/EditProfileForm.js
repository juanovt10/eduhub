import React, { useEffect, useRef, useState } from 'react';
import { axiosReq } from '../../api/axiosDefaults';
import { useCurrentUser } from '../../context/CurrentUserContext';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Asset from '../../components/Asset';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import {
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "../../@/components/ui/sheet";
import styles from '../../styles/ReviewEdit.module.css'

const EditProfileForm = ({ mode, fetchProfileData, onHide }) => {

    const [errors, setErrors] = useState({});
    const [profileData, setProfileData] = useState({});
    const [hasLoaded, setHasLoaded] = useState(false);
    const [submitLoader, setSubmitLoader] = useState(false);

    const { name, bio, image, dob } = profileData;

    const imageInput = useRef(null);
    const history = useHistory();
    const currentUser = useCurrentUser();

    const userId = currentUser?.profile_id
    const fetchUserData = async () => {
        try {
            const response = await axiosReq.get(`/profiles/${userId}/`);
            setProfileData(response.data);
            console.log(response.data);
        } catch (err) {
            console.log(err);
        } finally {
            setHasLoaded(true);
        };
    };
    
    useEffect(() => {
        if (userId) {
            fetchUserData();
        };
    }, [userId]);

    const handleChange = (e) => {
        setProfileData({
            ...profileData,
            [e.target.name]: e.target.value,
        });
    };

    const handleChangeImage = (e) => {
        if (e.target.files.length) {
            URL.revokeObjectURL(image);
            setProfileData({
                ...profileData,
                image: URL.createObjectURL(e.target.files[0])
            });
        };
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        formData.append('name', name);
        formData.append('bio', bio);
        formData.append('image', imageInput.current.files[0]);
        formData.append('dob', dob);

        try {
            const {data} = await axiosReq.put(
                `/profiles/${userId}/`,
                formData
            );

            if (mode === 'create') {
                onHide();
                history.push(`/profiles/${userId}/`);
                fetchProfileData();
            } else {
                fetchProfileData();
                onHide();
            };
        } catch (err) {
            console.log(err)
        };
    };

    return (
        <>
            <SheetContent className={`${styles.sheetContainer} ${styles.editCourseSheetContainer}`} side={'right'}>
                <SheetHeader>
                    {mode === 'create' ? (
                        <SheetTitle className={styles.sheetTitle}>Thank you for joining Eduhub!</SheetTitle>
                    ) : (
                        <SheetTitle className={styles.sheetTitle}>Edit Profile</SheetTitle>
                    )}
                </SheetHeader>
                {hasLoaded ? (
                    <Form className={styles.sheetEditCourseForm} onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                name='name'
                                value={name}
                                onChange={handleChange}
                                type='text'
                                placeholder='enter your preferred name'
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Bio</Form.Label>
                            <Form.Control
                                name='bio'
                                value={bio}
                                onChange={handleChange}
                                as='textarea'
                                placeholder='enter your profile description'
                            />
                        </Form.Group>
                        <Form.Group>
                            {image ? (
                                <>
                                    <figure>
                                        <Image src={image} className={styles.image} rounded />
                                    </figure>
                                    <div>
                                        <Form.Label>Change image</Form.Label>
                                    </div>
                                </>
                            ) : (
                                <Form.Label>Image</Form.Label>
                            )}
                            <Form.File
                                id='image-upload'
                                accpet='image/*'
                                onChange={handleChangeImage}
                                ref={imageInput}
                            />
                        </Form.Group>
                        <Button className={`mr-2 mb-2 ${styles.buttonPrimary}`} type='submit'>
                            {!submitLoader ? (
                                'Edit profile'
                            ) : (
                                <Asset spinner size='sm' />
                            )}
                        </Button>
                        <Button className={styles.buttonSecondary} onClick={onHide}>
                            Discard changes
                        </Button>
                    </Form>

                ) : (
                    <Row>
                        <Col className='mt-5'>
                            <Asset spinner />
                        </Col>
                    </Row>
                )}
            </SheetContent>
        </>
    )
}

export default EditProfileForm