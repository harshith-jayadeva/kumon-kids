'use client';

import { useState, useEffect } from 'react';
import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  const [groqResponse, setGroqResponse] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/groq', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        });
        const data = await response.json();
        setGroqResponse(data.aiResponse);
        await writeTextFile(data.aiResponse);
      } catch (error) {
        console.error("API Error:", error);
        setGroqResponse("Error fetching data.");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const writeTextFile = async (result) => {
    try {
      const response = await fetch('/api/write-text-file', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: result }),
      });

      if (!response.ok) {
        throw new Error('Failed to write text file.');
      }
    } catch (error) {
      console.error('Error writing text file:', error);
      alert('Error writing text file.');
    }
  };

    // return (
    //     <div>
    //         <h1>Meet a Friend Compatibility Results:</h1>
    //         {loading && <p>Loading...</p>}
    //         <p>{groqResponse}</p>
    //     </div>
    // );
}
