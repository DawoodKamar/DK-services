import Link from 'next/link';
import styles from '../styles/footer.module.css';

export default function Footer() {



    return(
        <div className={styles.footerbg}>
            <div className={styles.wrapper}>
                <div className={styles.top}>
                    <Link href="/" className={styles.logo}> DK Services</Link>
                </div>
                <div className={styles.line}></div>
                <nav className={styles.navbar} >
                    <ul>
                        <li>
                            <Link href="/">
                            Home
                            </Link>
                        </li>
                        <div className={styles.lines}></div>
                        <li>
                            <Link href="/About">
                            About Us
                            </Link>
                        </li>
                        <div className={styles.lines}></div>
                        <li>
                            <Link href="/Contact">
                            Contact
                            </Link>
                        </li>
                        <div className={styles.lines}></div>
                        <li>
                            <Link href="/WorkOrder">
                            Mechanic Login
                            </Link>
                        </li>
                    </ul>

                </nav>
            </div>

        </div>
    );

}