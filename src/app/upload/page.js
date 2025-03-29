"use client";

import Image from "next/image";
import styles from "../page.module.css";
import Link from "next/link";
import { CldUploadWidget } from "next-cloudinary";
import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("nothing");
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Upload 2-5 Images</h1>
        <CldUploadWidget
          uploadPreset="user-image-upload"
          onSuccess={(result) => {
            console.log("the image upload worked yay");
            console.log("secure url: ", result.info.secure_url);
            setUrl(result.info.secure_url);
          }}
        >
          {({ open }) => {
            return <button onClick={() => open()}>Upload an Image</button>;
          }}
        </CldUploadWidget>
        <h1>{url}</h1>
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
