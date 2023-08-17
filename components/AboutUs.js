import styles from "../styles/aboutus.module.css";
import Image from "next/image";

export default function ContactForm() {
  return (
    <div className={styles.About}>
      <div className={styles.container}>
        {/* First column */}
        <div className={styles.column1}>
          {/* Row 1 */}
          <div className={styles.row1}>
            {/* Heading */}
            <div className={styles.heading}>
              <h2>We Believe in Keeping Your Business Moving</h2>
            </div>

            {/* Divider */}
            <div className={styles.divider}>
              <hr />
            </div>
            {/* Text */}
            <div className={styles.text}>
              <p>
                At DK Services, we understand the pulse of the truck and trailer
                service industry. Born from the hands of an experienced
                mechanic, our platform is not just another management tool—it's
                a testament to the importance of uninterrupted workflow. We're
                dedicated to ensuring that businesses, like yours, never miss a
                beat and keep the wheels turning, day in and day out.
              </p>
            </div>
          </div>

          {/* Row 2 */}
          <div className={styles.row2}>
            {/* Heading */}
            <div className={styles.heading}>
              <h3>Client-Focused Solutions</h3>
            </div>

            {/* Divider */}
            <div className={styles.divider}>
              <hr />
            </div>
            {/* Text */}
            <div className={styles.text}>
              <p>
                Every feature in DK Services is designed with you in mind.
                Recognizing the unique challenges faced by mechanics and service
                providers, our founder channeled his own experiences into
                creating a platform that speaks your language. We prioritize
                your needs, ensuring that each solution is not only efficient
                but also intuitive, making your work simpler and more
                productive.
              </p>
            </div>
          </div>
        </div>

        {/* Second column */}
        <div className={styles.column2}>
          {/* Image */}
          <div className={styles.image}>
            <Image
              src="/images/dkimage.jpg"
              alt="dk-services mechanic"
              width={1677}
              height={2126}
              
            />
          </div>
        </div>
      </div>

      {/* -----------------------------------Section 2-------------------------------------------------- */}

      <div className={styles.container}>
        {/* First column */}
        <div className={styles.column1}>
          {/* Heading */}
          <div className={styles.heading}>
            <h3>Comprehensive Services</h3>
          </div>

          {/* Divider */}
          <div className={styles.divider}>
            <hr />
          </div>
          {/* Text */}
          <div className={styles.text}>
            <p>
              DK Services goes beyond basic work order management. Our platform
              offers a holistic approach, encompassing every aspect of the truck
              and trailer repair process. Dive into a system that's as
              comprehensive as the expertise of the mechanic who built it.
            </p>
          </div>
        </div>

        {/* Second column */}
        <div className={styles.column2}>
          {/* Heading */}
          <div className={styles.heading}>
            <h3>Reliability and Transparency</h3>
          </div>

          {/* Divider */}
          <div className={styles.divider}>
            <hr />
          </div>
          {/* Text */}
          <div className={styles.text}>
            <p>
              In the demanding realm of truck and trailer services, reliability
              isn't just a bonus—it's a necessity. At DK Services, we've built a
              platform you can lean on, day in and day out. We value
              transparency as much as you do, ensuring clear communication and
              straightforward processes at every turn. With us, you're not just
              getting a tool; you're partnering with a platform that stands by
              its word.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
