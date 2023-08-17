import Layout from "./Layout";
import styles from "../styles/landingPage.module.css";
import Image from "next/image";
import dry from "../images/Dry-Van.png";
import reefer from "../images/DuraPlate_HD.png";
import working from "../images/working.jpg";
import ContactForm from "./ContactForm";

export default function LandingPage() {
  return (
    <Layout>
      <section className={`${styles.hero} ${styles.wrap}`}>
        <div className={styles.heroSection}>
          <div className={styles.herohead}>
            <h1>Where Truck and Trailer Mechanics Meet Modern Management</h1>
          </div>
          <div className={styles.hook}>
            <p>
              Crafted by a mechanic, for mechanics. Dive into a system that
              understands your needs, prioritizes your tasks, and accelerates
              your service delivery.
            </p>
          </div>
          {/* <button className={styles.cta}>Call Now</button> */}
        </div>
        <div className={styles.images}>
          <Image
            src={reefer}
            alt="dryvan"
            placeholder="blur"
            width={640}
            height={390}
            className={styles.img1}
          />
          <Image
            src={dry}
            alt="Reefer"
            placeholder="blur"
            width={1200}
            height={803}
            className={styles.img2}
          />
        </div>
      </section>
      {/* ----------------------------------------------------------------------- */}

      <section className={`${styles.break} ${styles.diagonal}`}>
        <div className={styles.wrap}>
          <div className={styles.working}>
            <Image
              src={working}
              alt="Reefer"
              width={1118}
              height={871}
              className={styles.img3}
            />
          </div>
          <div>
            <div className={styles.tag1}>
              <h2 className={styles.tag}>Experience</h2>
              <p>
                Crafted from years in the truck and trailer service trenches.
              </p>
            </div>
            {/* <div className={styles.line}></div> */}
            <div className={styles.tag2}>
              <h2 className={styles.tag}>Reliability</h2>
              <p>
                Designed by a fully licensed mechanic who knows the value of
                trust. <br></br>
                <br></br>Count on a platform as reliable as the hands that built
                it.
              </p>
            </div>
            {/* <div className={styles.line}></div> */}
            <div className={styles.tag3}>
              <h2 className={styles.tag}>Dedication</h2>
              <p>More than just an app, it's a mechanic's promise.</p>
            </div>
          </div>
        </div>
      </section>

      <ContactForm />
    </Layout>
  );
}
