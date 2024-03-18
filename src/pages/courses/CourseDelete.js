import React from 'react'
import { axiosRes } from '../../api/axiosDefaults'
import { useHistory } from 'react-router-dom/cjs/react-router-dom'
import { Modal, Button } from 'react-bootstrap'
import {
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "../../@/components/ui/sheet";
import styles from '../../styles/ReviewEdit.module.css'

const CourseDelete = ({onHide, id}) => {

    const history = useHistory();

    const handleDelete = async () => {
        try {
            await axiosRes.delete(`/courses/${id}/`)
            history.push('/courses/')
        } catch (err) {
            console.log(err)
        }

    }

    return (
        <SheetContent className={styles.sheetContainer} side={'right'}>
            <SheetHeader>
                <SheetTitle className={styles.sheetTitle}>Delete course?</SheetTitle>
            </SheetHeader>
            <SheetDescription>
                Are you sure you want to delete your course?
            </SheetDescription>
            <Button variant='primary' onClick={onHide}>No!!!</Button>
            <Button variant='danger' onClick={handleDelete}>Yes, Delete course</Button>
        </SheetContent>
    )
}

export default CourseDelete