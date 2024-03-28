import React, { useState } from 'react'
import CoursesDisplay from './CoursesDisplay';
import CourseFilter from './CourseFilter';
import CourseSorting from './CourseSorting';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import styles from '../../styles/CoursesPage.module.css';
import { 
    Sheet,
    SheetContent,
} from "../../@/components/ui/sheet";
import { useCurrentUser } from '../../context/CurrentUserContext';


const CoursesPage = () => {

    const currentUser = useCurrentUser();
    console.log(currentUser?.username)
    const [sortKey, setSortKey] = useState('default');
    const [filters, setFilters] = useState({});
    const [showSheet, setShowSheet] = useState({
        showFilterSheet: false,
        showSortSheet: false
    });

    const handleSheetDisplay = (sheetType, bool) => {
        setShowSheet((prevSheet) => ({
            ...prevSheet,
            [sheetType]: bool,
        }));
    };
    
    const handleFiltersApplied = (newFilters) => {
        setFilters(newFilters);
    };

    const handleSorting = (newSortKey) => {
        setSortKey(newSortKey);
    };

    return (
        <div className={styles.pageContainer}>
            <h1 className={styles.pageTitle}>Our courses</h1>
            <div className={styles.contentContainer}>
                <Row>
                    <Col sm={4} lg={3} className='d-none d-sm-block'>
                        <CourseFilter onFiltersApplied={handleFiltersApplied} onHide={() => {}} />
                    </Col>
                    <Col sm={8} lg={9} className='d-flex flex-column align-items-center'>
                        <div className='d-none d-sm-block w-100'>
                            <CourseSorting onSortingApplied={handleSorting} onHide={() => {}} />
                        </div>


                        <div className={`${styles.tabContainer} d-flex d-sm-none`}>
                            <div 
                                className={`ml-4 ${styles.actionDiv}`}
                                onClick={() => handleSheetDisplay('showFilterSheet', true)}
                            > 
                                <span className='mr-2'><i class="fa-solid fa-filter"></i></span>Filter
                            </div>
                            <div 
                                className={`mr-4 ${styles.actionDiv}`}
                                onClick={() => handleSheetDisplay('showSortSheet', true)}
                            >
                                <span className='mr-2'>
                                    <i class="fa-solid fa-arrow-down"></i> <i class="fa-solid fa-arrow-up"></i>
                                </span>
                                Sort by
                            </div>

                            <Sheet open={showSheet.showFilterSheet} onOpenChange={setShowSheet}>
                                <CourseFilter 
                                    onFiltersApplied={handleFiltersApplied}
                                    onHide={() => handleSheetDisplay('showFilterSheet', false)}
                                    mobile
                                />
                            </Sheet>
                            <Sheet open={showSheet.showSortSheet} onOpenChange={setShowSheet}>
                                <CourseSorting
                                    onSortingApplied={handleSorting}
                                    onHide={() => handleSheetDisplay('showSortSheet', false)}
                                    mobile
                                />                                    
                            </Sheet>
                        </div>
                        
                        <CoursesDisplay filters={filters} sortKey={sortKey} />
                    </Col>
                </Row>                
            </div>
        </div>
    )
}

export default CoursesPage