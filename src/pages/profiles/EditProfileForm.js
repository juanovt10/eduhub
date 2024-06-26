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
import Alert from 'react-bootstrap/Alert';
import {
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "../../@/components/ui/sheet";
import styles from '../../styles/ProfileEdit.module.css'

const EditProfileForm = ({ mode, fetchProfileData, onHide }) => {

    const [errors, setErrors] = useState({});
    const [profileData, setProfileData] = useState({});
    const [hasLoaded, setHasLoaded] = useState(false);
    const [submitLoader, setSubmitLoader] = useState(false);

    const { name, bio, image } = profileData;

    const imageInput = useRef(null);
    const history = useHistory();
    const currentUser = useCurrentUser();

    const userId = currentUser?.profile_id
    const fetchUserData = async () => {
        try {
            const response = await axiosReq.get(`/profiles/${userId}/`);
            setProfileData(response.data);
        } catch (err) {
            if (err.response?.status !== 401) {
                setErrors(err.response?.data);
            };
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
                image: URL.createObjectURL(e.target.files[0]),
            });
        };
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitLoader(true);
        const formData = new FormData();

        formData.append('name', name);
        formData.append('bio', bio);

        if (imageInput?.current?.files[0]) {
            formData.append('image', imageInput.current.files[0]);
        }

        try {
            await axiosReq.put(`/profiles/${userId}/`, formData);

            if (mode === 'create') {
                onHide();
                history.push(`/profiles/${userId}/`);
            } else {
                fetchProfileData();
                onHide();
            };
        } catch (err) {
            if (err.response?.status !== 401) {
                setErrors(err.response?.data);
            };
        } finally {
            setSubmitLoader(false);
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
                        {errors.name?.map((message, idx) => (
                        <Alert variant="warning" key={idx}>
                            {message}
                        </Alert>
                        ))}
                        <Form.Group>
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                name='bio'
                                value={bio}
                                onChange={handleChange}
                                as='textarea'
                                placeholder='enter your profile description'
                            />
                        </Form.Group>
                        {errors.bio?.map((message, idx) => (
                        <Alert variant="warning" key={idx}>
                            {message}
                        </Alert>
                        ))}
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
                                accept='image/*'
                                onChange={handleChangeImage}
                                ref={imageInput}
                            />
                        </Form.Group>
                        {errors.image?.map((message, idx) => (
                        <Alert variant="warning" key={idx}>
                            {message}
                        </Alert>
                        ))}
                        <div className='d-flex justify-content-center'>
                            <Button className={`mr-2 ${styles.buttonSecondary}`} onClick={onHide}>
                                Discard changes
                            </Button>

                            {mode === 'create' ? (
                                <Button className={`${styles.buttonPrimary}`} type='submit'>
                                    {!submitLoader ? (
                                        'Create profile'  
                                    ) : (
                                        <Asset spinner size='sm' />
                                    )}
                                </Button>
                            ) : (
                                <Button className={`${styles.buttonPrimary}`} type='submit'>
                                    {!submitLoader ? (
                                        'Edit profile'  
                                    ) : (
                                        <Asset spinner size='sm' />
                                    )}
                                </Button>
                            )}    
                        </div>
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