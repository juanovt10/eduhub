import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { axiosRes } from '../../api/axiosDefaults'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import axios from 'axios'
import { useSetCurrentUser } from '../../context/CurrentUserContext'
import {
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "../../@/components/ui/sheet";
import styles from '../../styles/ReviewEdit.module.css'
import Asset from '../../components/Asset'

const ProfileDelete = ({id}) => {

    const [startedLoading, setStartedLoading] = useState(false);
    const history = useHistory();
    const setCurrentUser = useSetCurrentUser();

    console.log(id)

    const handleDelete = async () => {
        setStartedLoading(true);
        try {
            await Promise.all([
                axiosRes.delete(`/profiles/${id}/`),
                axios.post('/dj-rest-auth/logout/'),
            ])
            setCurrentUser(null);
            history.push('/')
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <SheetContent className={styles.sheetContainer} side={'right'}>
            <SheetHeader>
                <SheetTitle className={styles.sheetTitle}>Delete profile?</SheetTitle>
            </SheetHeader>
            <SheetDescription>
                Are you sure you want to delete your profile?
            </SheetDescription>
            <Button variant='danger' onClick={handleDelete}>
                {!startedLoading ? (
                    'Yes, delete profile'
                ) : (
                    <Asset spinner size='sm' />
                )}
            </Button>
        </SheetContent>
    )
}

export default ProfileDelete