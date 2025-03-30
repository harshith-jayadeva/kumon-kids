"use client";

import { useState, useEffect } from "react";
import { getUserImageFromName, getUserBioFromName } from "../parseFirebaseData";
import styles from "../page.module.css"; // Import the CSS module

export default function MatchCard({ userName, compatibility, bio, tags }) {
  const [imageUrl, setImageUrl] = useState(null);
  const [userBio, setUserBio] = useState(null);
  useEffect(() => {
    const loadImage = async () => {
      const url = await getUserImageFromName(userName);
      console.log("url ", url);
      setImageUrl(Array.isArray(url) && url.length > 0 ? url[0] : null);
    };

    const loadBio = async () => {
      const bio2 = await getUserBioFromName(userName);
      console.log("bio ", bio2);
      setUserBio(bio2);
    };

    loadImage();
    loadBio();
  }, [userName]);

  return (
    <div
      className={styles.mItem}
      style={{
        width: "150px", // fixed width
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "15px",
        minHeight: "370px",
        height: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "80px",
          overflow: "hidden",
          marginBottom: "10px",
        }}
      >
        <img
          src={
            imageUrl ??
            "https://res.cloudinary.com/drjpkng1g/image/upload/v1743339648/x2kcxaaqicgllvjxjcf4.jpg"
          }
          alt={userName}
          style={{
            width: "80px",
            height: "80px",
            objectFit: "cover",
            borderRadius: "16px",
          }}
        />
      </div>
      <div
        style={{
          width: "100%",
          flex: "1",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h2 style={{ fontSize: "1rem", margin: "8px 0" }}>{userName}</h2>
        <p style={{ fontSize: "0.8rem", margin: "4px 0", flex: "1" }}>
          {userBio}
        </p>
        <div style={{ marginTop: "auto" }}>
          <p style={{ fontSize: "0.8rem", margin: "4px 0" }}>
            <strong>Compatibility:</strong> {compatibility}%
          </p>
          <p style={{ fontSize: "0.8rem", margin: "4px 0" }}>
            <strong>Tags:</strong> {tags.join(", ")}
          </p>
        </div>
      </div>
    </div>
  );
}
