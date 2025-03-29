import Image from "next/image";
import styles from "../page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Upload 2-5 Images</h1>
        <p>upload...</p>
        <div className={styles.ctas}>
          <Link href="/matches" className={styles.primary}>
            <Image
              className={styles.globe}
              src="/globe.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Get your matches!
          </Link>
        </div>
      </main>
    </div>
  );
}
