import Link from 'next/link';
import Head from 'next/head';
import Layout from '../components/layout';
import styles from '../styles/contact.module.css';



    


export default function ContactForm() {

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission
    }

    return (
        <div className={styles.formSection}>
            <div className={styles.contactFormContainer}>
                <form className={styles.contactForm} onSubmit={handleSubmit}>
                    <h2>Let's Talk.</h2>
                    <div className={styles.formField}>
                        <input type="text" name="name" placeholder="Your Name" />
                    </div>
                    <div className={styles.formField}>
                        <input type="email" name="email" placeholder="Email Address" required />
                    </div>
                    <div className={styles.formField}>
                        <textarea name="message" rows="4" placeholder="Message" required></textarea>
                    </div>
                    <div className={styles.formField}>
                        <button type="submit" className={styles.submitButton}>Send</button>
                    </div>
                </form>
            </div>
            <div className={styles.info}>
                <h2>Contact Info</h2>
                <h3>Call us</h3>
                <p>(647)123-4567</p>
                <h3>Email us</h3>
                <p>dawood123@gmail.com</p>


            </div>

        

        </div>



    );
  }