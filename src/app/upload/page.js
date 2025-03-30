"use client";

import styles from "../page.module.css";
import Link from "next/link";
import { CldUploadWidget } from "next-cloudinary";
import { useRef, useState, useEffect } from "react";
import { useUser } from "../userContext.js";

import { db } from "../../../firebaseConfig";
import { addDoc, collection } from "firebase/firestore";

const ExpandableBioText = ({ bioRef }) => {
  return (
    <textarea
      className={styles.bio}
      ref={bioRef}
      placeholder="Write your bio here..."
      style={{
        width:"97%",
        gap: '10px',
        height: '240px',
        resize: "none",
      }}
    />
  );
};

const ExpandableNameText = ({ firstNameRef }) => {
  return (
    <textarea
      className={styles.names}
      ref={firstNameRef}
      placeholder="Write your first name here..."
      style={{
        padding: '10px',
        width:"95%",
        flex: '1',
        height: '40px',
        resize: "none",
      }}
    />
  );
};

const ExpandableLastNameText = ({ lastNameRef}) => {
  return (
    <textarea
      className={styles.names}
      ref={lastNameRef}
      placeholder="Write your last name here..."
      style={{
        padding: '10px',
        width: '95%',
        flex: '1',
        height: '40px',
        resize: "none",
      }}
    />
  );
};


// const uploadData = async (collectionName, id, data) => {
//   try {
//     // await setDoc(doc(db, "users", "john-pork"), testUser);
//     await setDoc(doc(db, collectionName, id), data);
//   } catch (error) {
//     console.error("Error writing document: ", error);
//   }
// };

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
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const bioRef = useRef(null);

  const submit = () => {
    const firstName = firstNameRef.current ? firstNameRef.current.value:"";
    const lastName = lastNameRef.current ? lastNameRef.current.value:"";
    const bio = bioRef.current ? bioRef.current.value:"";
    const fullName = `${firstName} ${lastName}`.trim();
  

    const data = {
      firstName: firstName, 
      lastName: lastName,
      bio: bio,
      image_urls: urlList,
    };

    // console.log(data);

    const userId = "user-" + Date.now();
    //uploadData("users", userId, data);
    return data;
  };

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
        <div className={styles.inputArea}>
          <div className={styles.nameArea}>
            <div className={styles.firstName}>
              <h3>First Name</h3>
              <ExpandableNameText firstNameRef={firstNameRef}/>
            </div>

            <div className={styles.lastName}>
              <h3>Last Name</h3>
              <ExpandableLastNameText lastNameRef={lastNameRef}/>
            </div>

          </div>
          
          <h3>List your hometown, interests, and hobbies!</h3>
          <ExpandableBioText bioRef={bioRef}/>
        </div>
      
        <div className={styles.button}
          onClick={() => {
            const data = submit();
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
