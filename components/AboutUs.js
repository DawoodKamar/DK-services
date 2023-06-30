import styles from '../styles/aboutus.module.css';


export default function ContactForm() {


    return (
        <div className={styles.About}>
            <div className={styles.container}>

                {/* First column */}
                <div className={styles.column}>
                    
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
                        <p>At DK Services, we believe in the power of being there when you need us most. Our passion for mechanics was born out of a love for problem-solving. Our experience, hard work, and commitment have made us experts in our field, but it's our dedication to you, our client, that truly drives us.</p>
                    </div>
                    
                </div>

                {/* Second column */}
                <div className={styles.column}>
                    
                </div>

            </div>
                            


        

        </div>



    );
  }