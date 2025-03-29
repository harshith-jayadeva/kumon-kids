import Image from "next/image";
import styles from "../page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1 id={styles.matches}>Matches</h1>
        
        <div className={styles.button}>
          <div className={styles.mContainer}>
            <div className={styles.mItem}>
              <img src="/match1.jpg" alt="Image" className={styles.matchImage} />
              <h2>Name 1</h2>
              <h4>Similar interests</h4>
              <p>interest 1, interest 2, interest 3</p>
              <br></br>
              <h4>Bio</h4>
              <p>Hi! This is a description.</p>
            </div>
            <div className={styles.mItem}>
            <img src="/match2.jpg" alt="Image" className={styles.matchImage} />
              <h2>Name 2</h2>
              <h4>Similar interests</h4>
              <p>interest 1, interest 2, interest 3</p>
              <br></br>
              <h4>Bio</h4>
              <p>Hi! This is a description.</p>
            </div>
            <div className={styles.mItem}>
            <img src="/match3.jpg" alt="Image" className={styles.matchImage} />
              <h2>Name 3</h2>
              <h4>Similar interests</h4>
              <p>interest 1, interest 2, interest 3</p>
              <br></br>
              <h4>Bio</h4>
              <p>Hi! This is a description.</p>
            </div>
          </div>
        </div>

        <div className={styles.button}>
          <Link href="./" className={styles.primary}>
            Start Over
          </Link>
        </div>
      </main>
    </div>
  );
}
