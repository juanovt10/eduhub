import React, { useEffect, useState } from 'react';
import { axiosReq } from '../../api/axiosDefaults';
import { useCurrentUser } from '../../context/CurrentUserContext';
import Avatar from '../../components/Avatar';
import ProfileDelete from './ProfileDelete';
import Dropdown from '../../components/Dropdown';
import EditProfileForm from './EditProfileForm';
import InstructorApplication from './InstructorApplication';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { Sheet } from "../../@/components/ui/sheet";
import styles from "../../styles/Profile.module.css";


const Profile = ({fetchProfileData, ...props}) => {
    const {
        id,
        owner,
        created_at,
        name,
        bio,
        image,
        is_instructor,
        enrollments_count,
        ratings_count,
        wish_list_count,
    } = props

    const [applicationSubmitted, setApplicationSubmitted] = useState(false);
    const [exisitingApplications, setExistingApplications] = useState([]);
    const [showSheet, setShowSheet] = useState({
        showEditSheet: false,
        showDeleteSheet: false,
        showApplicationSheet: false,
    });

    const handleSheetDisplay = (sheetType, bool) => {
        setShowSheet((prevSheet) => ({
            ...prevSheet,
            [sheetType]: bool,
        }));
    };

    useEffect(() => {
        const checkApplicationStatus = async () => {
            try {
                const applicationsResponse = await axiosReq.get('/instructor_apply/');
                setExistingApplications(applicationsResponse.data.results);
                const applied = applicationsResponse.data.results.some(app => app.owner === id);
                setApplicationSubmitted(applied);
            } catch (err) {

            };
        };

        checkApplicationStatus();
    }, []);

    const handleApplicationSubmit = () => {
        setApplicationSubmitted(true);
    }

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner;
    
    return (
        <>
            <Card className={styles.CompactCard}>
                <Row>
                    {is_instructor ? (
                        <Col className='d-flex align-items-center'>
                            <OverlayTrigger
                                placement='bottom'
                                overlay={<Tooltip>{'This user is an instructor'}</Tooltip>}
                            >
                                <span className={styles.isInstructor}><i class="fa-solid fa-graduation-cap"></i></span>
                            </OverlayTrigger>
                        </Col>  
                    ) : (
                        is_owner && (
                            <>
                                <Col className='text-left'>
                                    <Button
                                        className={styles.buttonSecondary}
                                        onClick={() => handleSheetDisplay('showApplicationSheet', true)}
                                    >
                                        <i class="fa-solid fa-graduation-cap"></i>
                                    </Button>
                                </Col>
                                <Sheet open={showSheet.showApplicationSheet} onOpenChange={setShowSheet}>
                                    <InstructorApplication 
                                        applicationSubmitted={applicationSubmitted}
                                        onApplicationSubmit={handleApplicationSubmit}
                                        onHide={() => handleSheetDisplay('showApplicationSheet', false)}
                                    />
                                </Sheet>
                            
                            </>
                        )
                    )}
                    {is_owner && (
                        <Col className='text-right'>
                            <Dropdown
                                handleSelect={handleSheetDisplay}
                                actionTypes={['showEditSheet', 'showDeleteSheet']}
                                entity='profile'
                            />

                            <Sheet open={showSheet.showEditSheet} onOpenChange={setShowSheet}>
                                <EditProfileForm 
                                    open={showSheet.showEditSheet}
                                    onOpenChange={setShowSheet}
                                    mode='edit'
                                    fetchProfileData={fetchProfileData}
                                    onHide={() => handleSheetDisplay('showEditSheet', false)}
                                />
                            </Sheet>
                            <Sheet open={showSheet.showDeleteSheet} onOpenChange={setShowSheet}>
                                <ProfileDelete id={id} />
                            </Sheet>
                        </Col>
                    )}
                </Row>
                <Row className='my-3'>
                    <Avatar
                        src={image}
                        height={70}
                        text={`@${owner}`}
                    />
                </Row>
                <Row>
                    <Col className='text-center'>
                        <h4>{name}</h4>
                    </Col>
                </Row>

                <div className={`my-3 ${styles.dataContainer}`}>
                    <div>
                        <strong>{enrollments_count}</strong>
                        <strong>Enrollments</strong>
                    </div>

                    <div>
                        <strong>{ratings_count}</strong>
                        <strong>Reviews</strong>
                    </div>
                    <div>
                        <strong>{wish_list_count}</strong>
                        <strong>Wish List</strong>
                    </div>
                </div>

                <Row>
                    <Col>
                        <p className='text-justify'>{bio}</p>
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Col>
                        Joined Eduhub on: {created_at}
                    </Col>
                </Row>
            </Card>
        </>
    )
}

export default Profile