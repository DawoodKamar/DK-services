import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/header.module.css';

const DkLogo = () => (
  <Image
    src="/images/dkLogo.jpg" // Route of the image file
    height={100} // Desired size with correct aspect ratio
    width={544} // Desired size with correct aspect ratio
    alt="DK services LOGO"
  />
);

export default function Header () {
    return (

    <header className={styles.header}>
        <DkLogo/>
        <div>
          
            <nav>
                <h1>Home</h1>

                <h2 className="workOrderForm">
                    <Link href="/WorkOrder">NEW WORK ORDER</Link>
                </h2>
            </nav>
        </div>
        {/* Header content */}
     </header>

    );
}