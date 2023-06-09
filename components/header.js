import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/header.module.css';
import React, { useState } from 'react';

const DkLogo = () => (
  <Image
    src="/images/dkLogo.jpg" // Route of the image file
    height={100} // Desired size with correct aspect ratio
    width={544} // Desired size with correct aspect ratio
    alt="DK services LOGO"
  />
);

export default function Header () {
    
    const [showMenu, setShowMenu] = useState(false);
//show menu is a variable (initially set to false) |setshowmenu is a function that will update the variable
   

const toggleMenu = () => {
        setShowMenu(!showMenu);
    };
    // function that toggles show menu between true and false


    return (

    <header className={styles.header}>
        <div className={styles.banner}>
            <h1 className={styles.logo}>DK Services</h1>
        </div>
        
  
        <nav className={styles.navbar}>
            <ul>
                <li>
                    <Link href="/">
                    Home
                    </Link>
                </li>
                <li>
                    <Link href="/about">
                    About Us
                    </Link>
                </li>
                <li>
                    <Link href="/contact">
                    Contact
                    </Link>
                </li>
                <li>
                    <Link href="/WorkOrder">
                    Mechanic Login
                    </Link>
                </li>
            </ul>

        </nav>
        <div className={`${styles.hamburgerMenu} ${showMenu ? styles.open : ''}`} 
        onClick={toggleMenu}>

            <div className={styles.line}></div>
            <div className={styles.line}></div>
            <div className={styles.line}></div>
        </div>
                
     </header>

    );
}//comment the hamburger line