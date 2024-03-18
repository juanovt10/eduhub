import React from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '../@/components/ui/dropdown-menu';
import styles from '../styles/Dropdown.module.css';
import { Button } from '../@/components/ui/button';

const Dropdown = ({ handleSelect, actionTypes, entity }) => {
    return (
        <div>
            <DropdownMenu >
                <DropdownMenuTrigger asChild className={styles.dropdown}>
                    <Button variant="outline" className={`px-3 ${styles.dropdownSymbol}`}><i class="fa-solid fa-ellipsis"></i></Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className={`w-56 ${styles.dropdownMenu}`}>
                    <DropdownMenuItem className={styles.dropdownItem} onSelect={() => handleSelect(actionTypes[0], true)}><i class="fa-solid fa-pen"></i><span className='ml-1'>Edit {entity}</span></DropdownMenuItem>
                    <DropdownMenuItem className={styles.dropdownItem} onSelect={() => handleSelect(actionTypes[1], true)}><i class="fa-solid fa-trash"></i><span className='ml-1'>Delete {entity}</span></DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

export default Dropdown