"use client";

import styles from "../page.module.css";
import Link from "next/link";
import { CldUploadWidget } from "next-cloudinary";
import { useState, useEffect } from "react";
import { useUser } from "../userContext.js";

import { db } from "../../../firebaseConfig";
import { addDoc, collection } from "firebase/firestore";

const uploadData = async (collectionName, data, setUserId) => {
  try {
    // await setDoc(doc(db, "users", "john-pork"), testUser);
    // await setDoc(doc(db, collectionName, id), data);
    const docRef = await addDoc(collection(db, collectionName), data);

    // add current user's ID to global context
    console.log("Document written with ID: ", docRef.id);
    setUserId(docRef.id);
  } catch (error) {
    console.error("Error writing document: ", error);
  }
};

export default function Home() {
  const { setUserId } = useUser();
  const [urlList, setUrlList] = useState([]);
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1 id={styles.matches}>Enter Your Information</h1>
        <h2>Upload a Profile Picture</h2>
        <CldUploadWidget
          uploadPreset="user-image-upload"
          onSuccess={(result) => {
            console.log("Image upload successful");
            console.log("Secure URL:", result.info.secure_url);
            setUrlList((prevUrls) => [...prevUrls, result.info.secure_url]);
          }}
        >
          {({ open }) => {
            return (
              <div className={styles.buttonPapa}>
                <button className={styles.uploadButton} onClick={() => open()}>
                  Upload an Image
                </button>
              </div>
            );
          }}
        </CldUploadWidget>
        {urlList[0] && (
          <img
            className={styles.uploaded}
            aria-hidden
            src={urlList[0]}
            alt="uploaded image"
            style={{ maxWidth: "1000px", maxHeight: "auto" }}
          />
        )}
        <div
          className={styles.button}
          onClick={() => {
            const data = {
              first_name: "frank",
              last_name: "azar",
              bio: "did you get in a truck wreck bc i can help u bro",
              image_urls: urlList,
            };
            uploadData("users", data, setUserId);
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
