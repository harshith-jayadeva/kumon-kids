"use client";

import { useState, useEffect } from "react";
import { getUserImageFromName } from "../parseFirebaseData";
import styles from "../page.module.css"; // Import the CSS module

export default function MatchCard({ userName, compatibility, bio, tags }) {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const loadImage = async () => {
      const url = await getUserImageFromName(userName);
      console.log("url ", url);
      setImageUrl(url[0]);
    };

    loadImage();
  }, [userName]);

  return (
    <div className={styles.mItem}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100px", // Fixed height container
          overflow: "hidden",
        }}
      >
        <img
          src={
            imageUrl ??
            "https://res.cloudinary.com/drjpkng1g/image/upload/v1743339648/x2kcxaaqicgllvjxjcf4.jpg"
          }
          alt={userName}
          style={{
            width: "100px", // Fixed width
            height: "100px", // Fixed height
            objectFit: "cover", // This will maintain aspect ratio
            borderRadius: "16px", // Optional: adds rounded corners
          }}
        />
      </div>
      <h2>{userName}</h2>
      <p>{bio}</p>
      <p>
        <strong>Compatibility:</strong> {compatibility}%
      </p>
      <p>
        <strong>Tags:</strong> {tags.join(", ")}
      </p>
    </div>
  );
}
