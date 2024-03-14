import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styles from '../../styles/Home.module.css';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "../../@/components/ui/accordion";

const HeroSectionOpt2 = () => {
    return (
        <div className={`px-5 pt-5 ${styles.hero}`}>
            <Row>
                <Col>
                    <h1>Empower your team, Elevate Your Success</h1>
                    <p className='text-left text-violet-300'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Semper viverra nam libero justo laoreet sit amet. Purus sit amet luctus venenatis lectus magna fringilla</p>
                    <Accordion type="multiple" collapsible>
                        <AccordionItem value="item-1">
                            <AccordionTrigger>Is it accessible?</AccordionTrigger>
                            <AccordionContent>
                                Yes. It adheres to the WAI-ARIA design pattern.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </Col>
                <Col>

                </Col>
            </Row>
            <Row>
                <Col>
                </Col>
            </Row>
        </div>
    )
}

export default HeroSectionOpt2