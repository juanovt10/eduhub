import React from 'react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "../../@/components/ui/accordion";
import styles from "../../styles/Home.module.css";

const HomeFAQs = () => {



    return (
        <div>
            <h2 className='text-center'>FAQs</h2>
            <Accordion type="single" collapsible className='mb-3'>
                <AccordionItem value='item-1'>
                    <AccordionTrigger className={styles.FAQ}>How can I become an instructor?</AccordionTrigger>
                    <AccordionContent>
                        <p>
                            To become an instructor, sign up for a user account and apply
                            for instructor status in your profile settings. 
                            We'll ask for some additional information to ensure you meet our instructor criteria,
                            and you'll hear back from us within 3-5 business days.
                        </p>
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value='item-2'>
                    <AccordionTrigger className={styles.FAQ}>When will the LMS be available?</AccordionTrigger>
                    <AccordionContent>
                        <p>
                            We're working hard to launch our Learning Management System (LMS)
                            and expect it to be available by the end of the year. Stay tuned for updates
                            and announcements in our newsletters and on our homepage.
                        </p>
                    </AccordionContent>
                </AccordionItem >

                <AccordionItem value='item-3'>
                    <AccordionTrigger className={styles.FAQ}>Why can't I see other people's information?</AccordionTrigger>
                    <AccordionContent>
                        <p>
                            To protect privacy and security, user profiles are only visible to the account
                            holder and site administrators. Instructors’ public profiles are visible to users
                            for course-related inquiries.
                        </p>
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value='item-4'>
                    <AccordionTrigger className={styles.FAQ}>How do I enroll in a course?</AccordionTrigger>
                    <AccordionContent>
                        <p>
                            Enrolling in a course is simple. Once you've found a course you're interested in,
                            click on the 'Enroll' button on the course page. If you're not already logged in,
                            you'll be prompted to do so.
                        </p>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    )
}

export default HomeFAQs