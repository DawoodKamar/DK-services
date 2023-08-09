import Link from "next/link";
import styles from "../styles/footer.module.css";
import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";

export default function Footer() {
  return (
    <div className={styles.footerbg}>
      <div className={styles.wrapper}>
        <div className={styles.top}>
          <Link href="/" className={styles.logo}>
            {" "}
            DK Services
          </Link>
        </div>
        <div className={styles.line}></div>
        <nav className={styles.navbar}>
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            <div className={styles.lines}></div>
            <li>
              <Link href="/About">About Us</Link>
            </li>
            <div className={styles.lines}></div>
            <li>
              <Link href="/Contact">Contact</Link>
            </li>
            <div className={styles.lines}></div>
            <SignedIn>
              <li>
                <Link href="/WorkOrderList">Work Orders</Link>
              </li>
            </SignedIn>
            <SignedOut>
              <li>
                <SignInButton mode="modal" redirectUrl="/WorkOrderList">
                  <Link href="/">Mechanic Login</Link>
                </SignInButton>
              </li>
            </SignedOut>
          </ul>
        </nav>
      </div>
    </div>
  );
}
