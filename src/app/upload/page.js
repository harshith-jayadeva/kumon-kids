"use client";

import styles from "../page.module.css";
import Link from "next/link";
import { CldUploadWidget } from "next-cloudinary";
import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("nothing");
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1 id={styles.matches}>Enter Your Information</h1>
        <h2>Upload 1-5 Images of Yourself</h2>
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
        {url != "nothing" && (<img className={styles.uploaded}
            aria-hidden
            src={url}
            alt="uploaded image"
            style={{maxWidth: '100%', maxHeight: '300px'}}
          />
        )}
        <div className={styles.button}>
          <Link href="/matches" className={styles.primary}>
            Get your matches!
          </Link>
        </div>
      </main>
    </div>
  );
}
