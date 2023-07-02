import styles from "../styles/aboutus.module.css";
import Image from "next/image";
import mechanic from "../public/images/dkimage.jpg";

export default function ContactForm() {
  return (
    <div className={styles.About}>
      <div className={styles.container}>
        {/* First column */}
        <div className={styles.column1}>
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
              At DK Services, we believe in the power of being there when you
              need us most. Our passion for mechanics was born out of a love for
              problem-solving. Our experience, hard work, and commitment have
              made us experts in our field, but it's our dedication to you, our
              client, that truly drives us.
            </p>
          </div>
        </div>

        {/* Second column */}
        <div className={styles.column2}>
          {/* Image */}
          <div className={styles.image}>
            <Image
              src={mechanic}
              alt="dk-services mechanic"
              quality={100}
              placeholder="blur"
            //   sizes="100vw"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
