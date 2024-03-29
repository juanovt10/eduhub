import React, { useState } from 'react';
import { axiosReq } from '../../api/axiosDefaults';
import Asset from '../../components/Asset';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import {
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "../../@/components/ui/sheet";
import styles from '../../styles/ReviewEdit.module.css'

const InstructorApplication = ({ applicationSubmitted, onApplicationSubmit, onHide }) => {

    const [applicationData, setApplicationData] = useState({content: ""});
    const [startedLoading, setStartedLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const handleChange = (event) => {
        setApplicationData({
            ...applicationData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setStartedLoading(true);

        try {
            const { content } = applicationData;
            await axiosReq.post('/instructor_apply/', { application_text: content });
            setStartedLoading(false);
        } catch (err) {
            if (err.response?.status !== 401) {
                setErrors(err.response?.data);
            };
            setStartedLoading(false);
        } finally {            
            onApplicationSubmit();
            onHide();
        };
    };

    return (
        <SheetContent className={styles.sheetContainer} side={'left'}>
            {applicationSubmitted ? (
                <>
                    <SheetHeader>
                        <SheetTitle className={styles.sheetTitle}>
                            You alread applied for instructor status
                        </SheetTitle>
                    </SheetHeader>
                    <SheetDescription>
                        Please wait until we process you application. We will inform you about the outcome as soon as possible.
                    </SheetDescription>
                </>
            ) : (
                <>
                    <SheetHeader>
                        <SheetTitle className={styles.sheetTitle}>
                            Apply for instructor status
                        </SheetTitle>
                    </SheetHeader>
                    <SheetDescription>
                        Please send us a paragraph outlining your experience in a specific topic that you want to teach.
                    </SheetDescription>
                    <Form onSubmit={handleSubmit} className={styles.sheetForm}>
                        <Form.Group>
                            <Form.Control 
                                name='content'
                                value={applicationData.content}
                                onChange={handleChange}
                                as='textarea'
                                rows={5}
                            />
                        </Form.Group>
                        {errors.content?.map((message, idx) => (
                        <Alert variant="warning" key={idx}>
                            {message}
                        </Alert>
                        ))}
                        <Button className={`w-100 ${styles.buttonPrimary}`} type="submit">
                            {!startedLoading ? (
                            'Send application'
                            ) : (
                                <Asset spinner size='sm' />
                            )}
                        </Button>
                    </Form>
                </>
            )}
        </SheetContent>
    )
}

export default InstructorApplication