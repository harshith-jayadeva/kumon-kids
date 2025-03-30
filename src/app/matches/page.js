import Image from "next/image";
import styles from "../page.module.css";
import Link from "next/link";

import { promises as fs } from "fs";
import path from "path";

export default async function LocalTextDisplay() {
  let matches = [];
  // Read the text file - adjust the path as needed
  const textFilePath = path.join(process.cwd(), "src/app/ai-output.txt");
  const fileContents = await fs.readFile(textFilePath, "utf8");

  // Function to modify the text
  const modifyText = (text) => {
    let temp = [];
    const sections = text.split("Comparison with ");
    for (let i = 0; i < sections.length; i++) {
      const section = sections[i].trim();
      const nameMatch = section.match(/^([^:]+):/);
      const name = nameMatch ? nameMatch[1].trim() : "Unknown";
      // console.log(name);
      const percentageMatch = section.match(
        /Compatibility Percentage:\s*(\d+)%/
      );
      const compatibility = percentageMatch
        ? parseInt(percentageMatch[1], 10)
        : 0;
      // console.log(compatibility);
      const tagsMatch = section.match(/Relevant Tags:\s*(.+?)(?:\n|$)/);
      const tagsString = tagsMatch ? tagsMatch[1].trim() : "";
      const tags = tagsString
        .split(/\s+/)
        .filter((tag) => tag.startsWith("#"))
        .map((tag) => tag.replace("#", ""));
      // console.log(tags);

      if (tags.length != 0 && compatibility > 0) {
        // console.log("Pushed " + name + matches.length);
        temp.push({ name, compatibility, tags });
      }
    }
    return temp;
  };
  matches = modifyText(fileContents);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1 id={styles.matches}>Matches</h1>

        <div className={styles.button}>
          <div className={styles.mContainer}>
            {matches.map((match) => (
              <div key={match.name} className={styles.mItem}>
                <img
                  src={`/images/${match.profilePic}`}
                  alt={match.name}
                  className="profile-pic"
                />
                <h2>{match.name}</h2>
                <p>{match.bio}</p>
                <p>
                  <strong>Compatibility:</strong> {match.compatibility}%
                </p>
                <p>
                  <strong>Tags:</strong> {match.tags.join(", ")}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.button}>
          <Link href="./" className={styles.primary}>
            Start Over
          </Link>
        </div>
      </main>
    </div>
  );
}

// export default function Home() {
//   return (
//     <div className={styles.page}>
//       <main className={styles.main}>
//         <h1 id={styles.matches}>Matches</h1>

//         <div className={styles.button}>
//           <div className={styles.mContainer}>
//             <div className={styles.mItem}>
//               <img src="/match1.jpg" alt="Image" className={styles.matchImage} />
//               <h2>Name 1</h2>
//               <h4>Similar interests</h4>
//               <p>interest 1, interest 2, interest 3</p>
//               <br></br>
//               <h4>Bio</h4>
//               <p>Hi! This is a description.</p>
//             </div>
//             <div className={styles.mItem}>
//             <img src="/match2.jpg" alt="Image" className={styles.matchImage} />
//               <h2>Name 2</h2>
//               <h4>Similar interests</h4>
//               <p>interest 1, interest 2, interest 3</p>
//               <br></br>
//               <h4>Bio</h4>
//               <p>Hi! This is a description.</p>
//             </div>
//             <div className={styles.mItem}>
//             <img src="/match3.jpg" alt="Image" className={styles.matchImage} />
//               <h2>Name 3</h2>
//               <h4>Similar interests</h4>
//               <p>interest 1, interest 2, interest 3</p>
//               <br></br>
//               <h4>Bio</h4>
//               <p>Hi! This is a description.</p>
//             </div>
//           </div>
//         </div>

//         <div className={styles.button}>
//           <Link href="./" className={styles.primary}>
//             Start Over
//           </Link>
//         </div>
//       </main>
//     </div>
//   );
// }
