"use client";

import Image from "next/image";
import styles from "../page.module.css";
import Link from "next/link";
import { CldUploadWidget } from "next-cloudinary";
import { useState } from "react";

import { db } from "../../../firebaseConfig";
import { doc, setDoc } from "firebase/firestore";

const uploadData = async (collectionName, id, data) => {
  try {
    // await setDoc(doc(db, "users", "john-pork"), testUser);
    await setDoc(doc(db, collectionName, id), data);
  } catch (error) {
    console.error("Error writing document: ", error);
  }
};

export default function Home() {
  const [urlList, setUrlList] = useState([]);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h2>Upload 2-5 Images</h2>
        <CldUploadWidget
          uploadPreset="user-image-upload"
          onSuccess={(result) => {
            console.log("Image upload successful");
            console.log("Secure URL:", result.info.secure_url);
            setUrlList((prevUrls) => [...prevUrls, result.info.secure_url]);
          }}
        >
          {({ open }) => (
            <button onClick={() => open()}>Upload an Image</button>
          )}
        </CldUploadWidget>

        <div
          className={styles.button}
          onClick={() => {
            const data = {
              name: "John Pork",
              bio: "hi my name is john pork",
              image_urls: urlList,
            };
            uploadData("users", "exampleuser1", data);
          }}
        >
          <Link href="/matches" className={styles.primary}>
            Get your matches!
          </Link>
        </div>
      </main>
    </div>
  );
}
