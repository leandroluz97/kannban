import React from 'react'
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from '@material-ui/icons/Close';
import styles from './styles.module.scss'
import { useUI } from '../../hooks/useUi';

const ExpandButton = () => {
    const { colapse, setColapse } = useUI();
    return (
        <button className={styles.expandButton} onClick={() => setColapse(!colapse)}>
            {colapse ? <CloseIcon fontSize='large' /> : <MenuIcon fontSize='large' />}
        </button>
    )
}

export default ExpandButton
