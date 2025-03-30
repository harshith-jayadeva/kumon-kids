import Image from "next/image";
import styles from "../page.module.css";
import Link from "next/link";
import { promises as fs } from "fs";
import path from "path";
import MatchCard from "./MatchCard"; // Import the client component

export default async function Page() {
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
          <div className={styles.mWrapper}>
            <div className={styles.mContainer}>
              {matches.map((match, index) => (
                <MatchCard
                  key={index}
                  userName={match.name}
                  compatibility={match.compatibility}
                  bio={match.bio}
                  tags={match.tags}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}