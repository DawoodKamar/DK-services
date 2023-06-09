import styles from '../styles/layout.module.css';
import Head from 'next/head';
import Header from './header';
import Footer from './Footer';

export default function Layout({ children }) {
  return (
  <div className={styles.container}>
    <Head>
      {/* Add meta tags, title, and other head elements here */}
      <title>DK Services</title>
      <link rel="icon" href="/favicon.ico" />
            
    </Head>
    
    <Header/>

 
      <div className={styles.content}>{children}</div>  

    
    <div className={styles.footer}><Footer/></div>
  </div>
  );
}