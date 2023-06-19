import Layout from "./layout";
import styles from '../styles/landingPage.module.css';
import Image from "next/image";
import dry from "../public/images/Dry-Van.png"
import reefer from "../public/images/DuraPlate_HD.png"
import flat from "../public/images/Transcraft-Hybrid-Flatbed-.png"


export default function LandingPage(){
    return(
    <Layout>
  
      <div className={styles.container}>
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

      </div>

      <div className={styles.container2}>testing 123</div>
      
    </Layout>
  );
}