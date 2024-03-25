import React, { useState } from 'react'
import { axiosRes } from '../../api/axiosDefaults'
import { useHistory } from 'react-router-dom/cjs/react-router-dom'
import Button from 'react-bootstrap/Button'
import {
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "../../@/components/ui/sheet";
import styles from '../../styles/ReviewEdit.module.css'
import Asset from '../../components/Asset';

const CourseDelete = ({id}) => {

    const [startLoading, setStartLoading] = useState(false);
    const history = useHistory();
    

    const handleDelete = async () => {
        setStartLoading(true);
        try {
            await axiosRes.delete(`/courses/${id}/`);
            history.push('/courses/');
        } catch (err) {
            console.log(err);
        };
    };

    return (
        <SheetContent className={styles.sheetContainer} side={'left'}>
            <SheetHeader>
                <SheetTitle className={styles.sheetTitle}>Delete course?</SheetTitle>
            </SheetHeader>
            <SheetDescription>
                Are you sure you want to delete your course?
            </SheetDescription>
            <Button variant='danger' onClick={handleDelete}>
                {!startLoading ? (
                    'Yes, delete course'
                ) : (
                    <Asset spinner size='sm'/>
                )}
            </Button>
        </SheetContent>
    )
}

export default CourseDelete