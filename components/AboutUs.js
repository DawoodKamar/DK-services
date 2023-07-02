import styles from "../styles/aboutus.module.css";
import Image from "next/image";
import mechanic from "../public/images/dkimage.jpg";

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
                At DK Services, we believe in the power of being there when you
                need us most. Our passion for mechanics was born out of a love
                for problem-solving. Our experience, hard work, and commitment
                have made us experts in our field, but it's our dedication to
                you, our client, that truly drives us.
              </p>
            </div>
          </div>

          {/* Row 2 */}
          <div className={styles.row2}>
            {/* Heading */}
            <div className={styles.heading}>
              <h2>Client-Focused Solutions</h2>
            </div>

            {/* Divider */}
            <div className={styles.divider}>
              <hr />
            </div>
            {/* Text */}
            <div className={styles.text}>
              <p>
                Every day, we help our clients keep their trailers in optimal
                condition. We understand that you rely on these vehicles for
                your livelihood, which is why we're committed to delivering
                prompt and efficient service. Every mechanic in our team is a
                seasoned professional who's been there and knows exactly what
                your truck or trailer needs to stay in peak condition.
              </p>
            </div>
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
            <h2>Comprehensive Services</h2>
          </div>

          {/* Divider */}
          <div className={styles.divider}>
            <hr />
          </div>
          {/* Text */}
          <div className={styles.text}>
            <p>
              We offer a wide range of services, from routine maintenance and
              inspections to complex repairs. Whether it's a simple light change
              or an axle overhaul, our team has the skills and equipment to
              handle it. We prioritize quality in everything we do because we
              know that your business deserves nothing less.
            </p>
          </div>
        </div>

        {/* Second column */}
        <div className={styles.column2}>
          {/* Heading */}
          <div className={styles.heading}>
            <h2>On-Site Assistance</h2>
          </div>

          {/* Divider */}
          <div className={styles.divider}>
            <hr />
          </div>
          {/* Text */}
          <div className={styles.text}>
            <p>
              Our mobile service means we come to you, wherever you are in the
              western greater Toronto area. Breakdowns don't always happen at
              convenient times or places, but with us on your side, you never
              have to worry. We're ready to roll out at a moment's notice,
              bringing our expertise and equipment directly to you.
            </p>
          </div>
        </div>
      </div>

      {/* -----------------------------------Section 3-------------------------------------------------- */}

      <div className={styles.container}>
        {/* First column */}
        <div className={styles.column1}>
          {/* Heading */}
          <div className={styles.heading}>
            <h2>Reliability and Transparency</h2>
          </div>

          {/* Divider */}
          <div className={styles.divider}>
            <hr />
          </div>
          {/* Text */}
          <div className={styles.text}>
            <p>
              We believe in doing business with integrity. That means clear
              pricing and honest communication about what your vehicle needs and
              how we can help. We'll never suggest unnecessary work, and we'll
              always keep you informed every step of the way.
            </p>
          </div>
        </div>

        {/* Second column */}
        <div className={styles.column2}>
          {/* Heading */}
          <div className={styles.heading}>
            <h2>Better Business, Better Lives</h2>
          </div>

          {/* Divider */}
          <div className={styles.divider}>
            <hr />
          </div>
          {/* Text */}
          <div className={styles.text}>
            <p>
              Ultimately, our goal is to make your life easier. By ensuring your
              trucks and trailers are always in top shape, we help you avoid
              unexpected breakdowns and costly downtime. When your vehicles are
              running smoothly, you can focus on what you do best: running your
              business. We take care of the mechanics so you can keep your
              business moving forward.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
