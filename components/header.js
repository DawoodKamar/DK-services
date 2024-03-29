//import Image from 'next/image';
import Link from "next/link";
import styles from "../styles/header.module.css";
import React, { useState, useEffect, useRef } from "react";
import { UserButton, SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";

// const DkLogo = () => (
//   <Image
//     src="/images/dkLogo.jpg" // Route of the image file
//     height={100} // Desired size with correct aspect ratio
//     width={544} // Desired size with correct aspect ratio
//     alt="DK services LOGO"
//   />
// );

export default function Header() {
  const [showMenu, setShowMenu] = useState(false);
  // showmenu is a variable (initially set to false) |setshowmenu is a function that will update the variable
  const menuRef = useRef(); //Hook to create a 'reference' to a DOM element, menuRef is assigned to the outermost div of the burger menu (ref={menuRef})
  const openMenuRef = useRef();

  // function that toggles show menu between true and false
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  // The useEffect Hook performs side effects in function components, data fetching, subscriptions, or manually changing the DOM
  // The function passed to useEffect will run after the render is committed to the screen.
  useEffect(() => {
    //to handle the logic for clicks that happen outside of the menu
    const handleOutsideClick = (event) => {
      if (
        showMenu &&
        !menuRef.current.contains(event.target) &&
        !openMenuRef.current.contains(event.target)
      ) {
        // if menu is open and click was outside menu, close it (the event.target is not contained within menuRef.current)
        setShowMenu(false);
      }
    };

    //The event listener will listen for a mousedown event, it will call the handleOutsideClick function.
    document.addEventListener("mousedown", handleOutsideClick);

    // Cleanup - remove the listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showMenu]);
  //   ^^   This tells React to only run the useEffect function when the showMenu variable changes.

  //scroll listener
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}>
      <div className={`${styles.banner} ${isScrolled ? styles.scrolled : ""}`}>
        <Link href="/" className={styles.logo}>
          {" "}
          DK SERVICES
        </Link>
        <div
          className={`${styles.hamburgerMenu} ${showMenu ? styles.open : ""}`}
          onClick={toggleMenu}
          ref={menuRef}
        >
          {/* If showMenu is true,  styles.hamburgerMenu styles.open , otherwise styles.hamburgerMenu */}

          {/* `${}` template literal: allow you to embed expressions inside your strings, 
                    anything inside `${}` will be evaluated as a JavaScript expression. */}

          {/* showMenu ? styles.open : '' is a ternary operator. This is a shortcut for an 
                    if-else statement. It reads like this: "If showMenu is true, use styles.open, otherwise use an empty string. */}

          <div className={styles.line}></div>
          <div className={styles.line}></div>
          <div className={styles.line}></div>
        </div>

        <nav className={styles.navbar}>
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/About">About Us</Link>
            </li>
            <li>
              <Link href="/Contact">Contact</Link>
            </li>
            <SignedIn>
              <li>
                <Link href="/WorkOrderList">Work Orders</Link>
              </li>
              <li>
                <UserButton afterSignOutUrl="/" />
              </li>
            </SignedIn>
            <SignedOut>
              <li>
                <SignInButton mode="modal" redirectUrl="/WorkOrderList">
                  <Link href="/">Mechanic Login</Link>
                </SignInButton>
              </li>
            </SignedOut>
            {/* <li>
              <Link href="/WorkOrderList">Mechanic Login</Link>
            </li>
            <li>
              <UserButton afterSignOutUrl="/" />
            </li> */}
          </ul>
        </nav>
      </div>

      <nav
        className={`${styles.smallnavbar} ${!showMenu ? styles.close : ""}`}
        ref={openMenuRef}
      >
        <ul>
          <SignedIn>
            <li>
              <UserButton afterSignOutUrl="/" />
            </li>
            <div className={styles.lines}></div>
          </SignedIn>
          <li>
            <Link href="/" onClick={toggleMenu}>
              Home
            </Link>
          </li>
          <div className={styles.lines}></div>
          <li>
            <Link href="/About" onClick={toggleMenu}>
              About Us
            </Link>
          </li>
          <div className={styles.lines}></div>
          <li>
            <Link href="/Contact" onClick={toggleMenu}>
              Contact
            </Link>
          </li>
          <div className={styles.lines}></div>
          <SignedOut>
            <li>
              <SignInButton mode="modal" redirectUrl="/WorkOrderList">
                <Link href="/">Mechanic Login</Link>
              </SignInButton>
            </li>
          </SignedOut>
          <SignedIn>
            <li>
              <Link href="/WorkOrderList">Work Orders</Link>
            </li>
          </SignedIn>
          <div className={styles.lines}></div>
        </ul>
      </nav>
    </header>
  );
} //hide menu on bigger screens
