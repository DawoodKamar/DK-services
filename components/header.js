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

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };


    return (

    <header className={styles.header}>
        <div className={styles.banner}>
            <DkLogo/>
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
        <div className={`${styles.hamburgerMenu} ${showMenu ? 'open' : ''}`} 
        onClick={toggleMenu}>

            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
        </div>
                
     </header>

    );
}//need to figure out hamburger menue and under stand why it is not working