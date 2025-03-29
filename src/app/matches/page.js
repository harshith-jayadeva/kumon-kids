import Image from "next/image";
import styles from "../page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Matches</h1>

        <div className={styles.ctas}>
          <Link href="./" className={styles.primary}>
            <Image
              className={styles.globe}
              src="/globe.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Start Over
          </Link>
        </div>
      </main>
    </div>
  );
}
