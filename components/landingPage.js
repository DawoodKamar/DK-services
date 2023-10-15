import Layout from "./layout";
import styles from "../styles/landingPage.module.css";
import Image from "next/image";
import ContactForm from "./ContactForm";
import { useState } from "react";

export default function LandingPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const items = [
    {
      description:
        "Adaptive & Fast Workflow Tailored for Truck and Trailer Mechanics. Streamline your service operations with our intuitive work order form.",
      image: "/images/form.png",
    },
    {
      description:
        " Easily Access Work Orders & Job History. Search and edit jobs on-the-go for efficient operations.",
      image: "/images/submissions.png",
    },
    {
      description:
        "Instant PDF Downloads: Speed up invoicing with easily accessible work order PDFs.",
      image: "/images/pdfexample.png",
    },
  ];
  const updateIndex = (newIndex) => {
    if (newIndex < 0) {
      newIndex = 0;
    } else if (newIndex >= items.length) {
      newIndex = items.length - 1;
    }

    setActiveIndex(newIndex);
  };
  const [startX, setStartX] = useState(0);
  const [endX, setEndX] = useState(0);

  const handleTouchStart = (e) => {
    const touchObj = e.changedTouches[0];
    setStartX(touchObj.clientX);
  };

  const handleTouchEnd = (e) => {
    const touchObj = e.changedTouches[0];
    setEndX(touchObj.clientX);
    handleSwipe();
  };

  const handleSwipe = () => {
    if (endX - startX > 50) {
      updateIndex(activeIndex - 1);
    } else if (startX - endX > 50) {
      updateIndex(activeIndex + 1);
    }
  };
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
            src="/images/DuraPlate_HD.png"
            alt="dryvan"
            width={640}
            height={390}
            className={styles.img1}
          />
          <Image
            src="/images/Dry-Van.png"
            alt="Reefer"
            width={1200}
            height={803}
            className={styles.img2}
          />
        </div>
      </section>
      {/* ----------------------------------------------------------------------- */}

      <section className={styles.diagonal}>
        <div className={styles.carousel}>
          <div
            className={styles.inner}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {items.map((item, index) => {
              return (
                <div key={index} className={styles.carouselItem}>
                  <Image
                    className={styles.carouselimg}
                    src={item.image}
                    alt="site preview"
                    width={350}
                    height={500}
                  />
                  <div className={styles.carouselItemsText}>
                    {item.description}
                  </div>
                </div>
              );
            })}
          </div>
          <div className={styles.carouselbuttons}>
            <button
              className={styles.buttonarrow}
              onClick={() => updateIndex(activeIndex - 1)}
            >
              <span className="material-symbols-outlined">arrow_back_ios</span>
            </button>
            <div className={styles.indicators}>
              {items.map((item, index) => {
                return (
                  <button key={index} onClick={() => updateIndex(index)}>
                    <span
                      className={`material-symbols-outlined ${
                        index === activeIndex
                          ? styles.indicatorsymbolactive
                          : styles.indicatorsymbol
                      }`}
                    >
                      radio_button_checked
                    </span>
                  </button>
                );
              })}
            </div>
            <button
              className={styles.buttonarrow}
              onClick={() => updateIndex(activeIndex + 1)}
            >
              <span className="material-symbols-outlined">
                arrow_forward_ios
              </span>
            </button>
          </div>
        </div>
      </section>
      <ContactForm />
    </Layout>
  );
}
