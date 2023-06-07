import styles from './layout.module.css';
import Head from 'next/head';
import Header from './header';

export default function Layout({ children }) {
  return <div className={styles.container}>
  <Head>
    {/* Add meta tags, title, and other head elements here */}
    <title>DK Services</title>
    <link rel="icon" href="/favicon.ico" />
          
  </Head>

  <Header/>

  <main>{children}</main>

  <footer>
    <div className="footer"><h2>-----------------Footer----------------------------------</h2></div>
    {/* Add footer content here */}
  </footer>
</div>;
}