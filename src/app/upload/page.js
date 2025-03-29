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
        <h2>Upload 2-5 Images</h2>
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
        <h3 id={styles.matches}>{url}</h3>
        <div className={styles.button}>
          <Link href="/matches" className={styles.primary}>
            Get your matches!
          </Link>
        </div>
      </main>
    </div>
  );
}
