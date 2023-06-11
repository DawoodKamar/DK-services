import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/header.module.css';
import React, { useState } from 'react';

// const DkLogo = () => (
//   <Image
//     src="/images/dkLogo.jpg" // Route of the image file
//     height={100} // Desired size with correct aspect ratio
//     width={544} // Desired size with correct aspect ratio
//     alt="DK services LOGO"
//   />
// );

export default function Header () {
    
    const [showMenu, setShowMenu] = useState(false);
//showmenu is a variable (initially set to false) |setshowmenu is a function that will update the variable
   

const toggleMenu = () => {
        setShowMenu(!showMenu);
    };
    // function that toggles show menu between true and false


    return (

    <header className={styles.header}>
        <div className={styles.banner}>
            <h1 className={styles.logo}>DK Services</h1>
            <div className={`${styles.hamburgerMenu} ${showMenu ? styles.open : ''}`} 
            onClick={toggleMenu}> 
                {/* If showMenu is true,  styles.hamburgerMenu styles.open , otherwise styles.hamburgerMenu */}
            
                {/* `${}` template literal: allow you to embed expressions inside your strings, 
                anything inside `${}` will be evaluated as a JavaScript expression. */}

                {/* showMenu ? styles.open : '' is a ternary operator. This is a shortcut for an 
                if-else statement. It reads like this: "If showMenu is true, use styles.open, otherwise use an empty string. */}

                <div className={styles.line}></div>
                <div className={styles.line}></div>
                <div className={styles.line}></div>
            </div>
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

        <nav className={`${styles.smallnavbar} ${!showMenu ? styles.close : ''}`}>
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
        
                
     </header>

    );
}//comment the hamburger line