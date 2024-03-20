import React from 'react';
import styles from '../../styles/CourseFilter.module.css';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "../../@/components/ui/accordion";
import style from "../../styles/Home.module.css";

const HomeFAQs = () => {
    return (
        <div>
            <h2>FAQs</h2>
            <Accordion type="multiple" collapsible className='mb-3'>

                <AccordionItem value='item-1'>
                    <AccordionTrigger className={styles.FAQ}>Categories</AccordionTrigger>
                    <AccordionContent>

                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value='item-2'>
                    <AccordionTrigger>Resources</AccordionTrigger>
                    <AccordionContent>

                    </AccordionContent>
                </AccordionItem >

                <AccordionItem value='item-3'>
                    <AccordionTrigger>Ratings</AccordionTrigger>
                    <AccordionContent>

                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    )
}

export default HomeFAQs