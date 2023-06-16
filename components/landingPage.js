import Layout from "./layout";
import styles from '../styles/landingPage.module.css';

export default function LandingPage(){
    return(
    <Layout>
  
      <div className={styles.container}>
        <div className={styles.heroSection}>
          <div className={styles.herohead}><h1>Lorem ipsum dolor sit amet consnderit autem necessitatibus, eum consectetur?</h1></div>
          <div className={styles.hook}><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet atque minima error optio debitis ab, assumenda molestiae deserunt alias veniam aut suscipit iste repellat labore rem esse in dolorum impedit.</p></div>
        </div>
        <div className={styles.img1}>test</div>  
        <div className={styles.img2}>test</div>  
        <div className={styles.img3}>test</div>



      </div>
      
    </Layout>
  );
}