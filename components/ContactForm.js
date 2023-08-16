import styles from "../styles/contact.module.css";

export default function ContactForm() {
  return (
    <div className={styles.formSection}>
      <div className={styles.contactFormContainer}>
        <form
          className={styles.contactForm}
          action="https://formspree.io/f/mzblewew"
          method="POST"
        >
          <input
            type="hidden"
            name="_subject"
            value="New contact form submission!"
          />

          <h2>Let's Talk.</h2>
          <div className={styles.formField}>
            <input type="text" name="name" placeholder="Your Name" />
          </div>
          <div className={styles.formField}>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              required
            />
          </div>
          <div className={styles.formField}>
            <textarea
              name="message"
              rows="4"
              placeholder="Message"
              required
            ></textarea>
          </div>
          <div className={styles.formField}>
            <button type="submit" className={styles.submitButton}>
              Send
            </button>
          </div>
        </form>
      </div>
      <div className={styles.info}>
        <h2>Contact Info</h2>
        <h3>Call us</h3>
        <p>(Coming Soon)</p>
        <h3>Email us</h3>
        <p>dkservices.email@gmail.com</p>
      </div>
    </div>
  );
}
