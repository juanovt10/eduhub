import React, { useEffect, useState } from 'react';
import EditProfileForm from './EditProfileForm';
import { useCurrentUser } from '../../context/CurrentUserContext';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const CreateProfile = () => {
    const [showSheet, setShowSheet] = useState({
        showEditSheet: true,
    })

    const handleSheetDisplay = (sheetType, bool) => {
        setShowSheet((prevSheet) => ({
            ...prevSheet,
            [sheetType]: bool,
        }))
    }

    const currentUser = useCurrentUser();
    const history = useHistory();

    useEffect(() => {
        if (!currentUser) {
            history.push('/auth')
        }
    }, [currentUser, history])


    console.log(currentUser)

    return currentUser ? (
        <EditProfileForm 
            open={showSheet.showEditSheet}
            onOpenChange={setShowSheet}
            mode='create'
            onHide={() => handleSheetDisplay('showEditSheet', false)}
        />
    ) : null
}

export default CreateProfile