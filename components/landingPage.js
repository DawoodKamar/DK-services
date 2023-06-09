import Layout from "./layout";
import styles from '../styles/landingPage.module.css';
import Image from "next/image";
import dry from "../public/images/Dry-Van.png"
import reefer from "../public/images/DuraPlate_HD.png"
import working from "../public/images/working.jpg"
import ContactForm from "./ContactForm";


export default function LandingPage(){
    return(
    <Layout>


      <section className={`${styles.hero} ${styles.wrap}`}>
        <div className={styles.heroSection}>
          <div className={styles.herohead}><h1>Your fleet is looking good. Lets get it back on the road.</h1></div>
          <div className={styles.hook}><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet atque minima error optio debitis ab</p></div>
          <button className={styles.cta}>Call Now</button>
        </div>
        <div className={styles.images}>
             <Image
              src={reefer}
              alt="dryvan"
              placeholder="blur"
              width={1200} 
              height={803}
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
          {/* <div className={styles.img2}>

          </div> 
          
          <div className={styles.img3}>
            <Image
              src={dry}
              alt="dryvan"
              placeholder="blur" 
              fill
            
            /> 
          </div> */}
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
                      <h2 className={styles.tag}>Experience</h2><p>Many years in the truck and trailer service industry</p>
                  </div>
                  {/* <div className={styles.line}></div> */}
                  <div className={styles.tag2}>
                      <h2 className={styles.tag}>Reliability</h2><p>Fully licenced, insured, and highly reliable mechanics you can count on</p>
                  </div>
                  {/* <div className={styles.line}></div> */}
                  <div className={styles.tag3}>
                      <h2 className={styles.tag}>Dedication</h2><p>Committed to getting your fleet back on the road safely and swiftly</p>
                  </div>
              </div>
          </div>


      </section>

      <ContactForm/>
      
    </Layout>
  );
}