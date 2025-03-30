'use client';

import { useState, useEffect } from 'react';

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

    return (
        <div>
            <h1>Meet a Friend Compatibility Results:</h1>
            {loading && <p>Loading...</p>}
            <p>{groqResponse}</p>
        </div>
    );
}

// 'use client';

// import { useState, useEffect } from 'react';

// export default function Home() {
//     const [groqResponse, setGroqResponse] = useState(null); // Initialize as null
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         async function fetchData() {
//             try {
//                 const response = await fetch('/api/groq', {
//                     method: 'POST',
//                     headers: { 'Content-Type': 'application/json' },
//                 });
//                 const data = await response.json();
//                 setGroqResponse(data.aiResponse); // Store the API response
//             } catch (error) {
//                 console.error("API Error:", error);
//                 setGroqResponse("Error fetching data.");
//             } finally {
//                 setLoading(false);
//             }
//         }
//         fetchData();
//     }, []);

//     // Function to move the data (example)
//     const moveData = async (data) => {
//         try {
//             const response = await fetch('/api/move-file', { // Replace with your move API route
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ data: data }),
//             });

//             if (!response.ok) {
//                 throw new Error('Failed to move data.');
//             }
//         } catch (error) {
//             console.error('Error moving data:', error);
//             alert('Error moving data.');
//         }
//     };

//     return (
//         <div>
//             <h1>Meet a Friend Compatibility Results:</h1>
//             {loading && <p>Loading...</p>}
//             {groqResponse && <p>{groqResponse}</p>}
//             {groqResponse && <button onClick={() => moveData(groqResponse)}>Move Data</button>}
//         </div>
//     );
// }



// 'use client';

// import { useState, useEffect } from 'react';

// export default function Home() {
//     const [groqResponse, setGroqResponse] = useState('');
//     const [loading, setLoading] = useState(true);
//     const [textFileContent, setTextFileContent] = useState(''); // Store text file content

//     useEffect(() => {
//         async function fetchData() {
//             try {
//                 const response = await fetch('/api/groq', {
//                     method: 'POST',
//                     headers: { 'Content-Type': 'application/json' },
//                 });
//                 const data = await response.json();
//                 setGroqResponse(data.aiResponse);
//                 updateTextFile(data.aiResponse);
//             } catch (error) {
//                 console.error("API Error:", error);
//                 setGroqResponse("Error fetching data.");
//             } finally {
//                 setLoading(false);
//             }
//         }
//         fetchData();
//     }, []);

//     const updateTextFile = (newData) => {
//         if (!newData || newData === "Error fetching data.") {
//             return;
//         }

//         // Format new data as JavaScript
//         const newJsContent = `const aiOutput = ${JSON.stringify(newData, null, 2)};\n\n`;

//         // Append new content to the existing text file content
//         setTextFileContent(prevContent => prevContent + newJsContent);
//     };

//     return (
//         <div>
//             <h1>Meet a Friend Compatibility Results:</h1>
//             {loading ? <p>Loading...</p> : <p>{groqResponse}</p>}

//             {/* Display in-memory text file contents */}
//             <h2>Text File Content:</h2>
//             <textarea
//                 value={textFileContent}
//                 readOnly
//                 style={{ width: '100%', height: '300px', background: "#f4f4f4", padding: "10px", borderRadius: "5px" }}
//             />
//         </div>
//     );
// }

// 'use client';

// import { useState, useEffect } from 'react';

// export default function Home() {
//     const [groqResponse, setGroqResponse] = useState('');
//     const [loading, setLoading] = useState(true);
//     const [blobUrl, setBlobUrl] = useState(null);

//     useEffect(() => {
//         async function fetchData() {
//             try {
//                 const response = await fetch('/api/groq', {
//                     method: 'POST',
//                     headers: { 'Content-Type': 'application/json' },
//                 });
//                 const data = await response.json();
//                 setGroqResponse(data.aiResponse);
//                 updateJavaScriptFile(data.aiResponse);
//             } catch (error) {
//                 console.error("API Error:", error);
//                 setGroqResponse("Error fetching data.");
//             } finally {
//                 setLoading(false);
//             }
//         }
//         fetchData();
//     }, []);

//     const updateJavaScriptFile = (result) => {
//         try {
//             if (!result || result === "Error fetching data.") {
//                 return;
//             }

//             // Remove old Blob URL to free memory
//             if (blobUrl) {
//                 URL.revokeObjectURL(blobUrl);
//             }

//             // Create a new JavaScript file content
//             const jsCode = `const aiOutput = ${JSON.stringify(result, null, 2)};`;
//             const blob = new Blob([jsCode], { type: 'text/javascript' });
//             const url = URL.createObjectURL(blob);
//             setBlobUrl(url);
//         } catch (error) {
//             console.error('Error updating JavaScript file:', error);
//         }
//     };

//     return (
//         <div>
//             <h1>Meet a Friend Compatibility Results:</h1>
//             {loading ? <p>Loading...</p> : <p>{groqResponse}</p>}
//             {!loading && blobUrl && (
//                 <a href={blobUrl} download="ai-output.js">
//                     <button>Download Updated AI Output</button>
//                 </a>
//             )}
//         </div>
//     );
// }



// 'use client';

// import { useState, useEffect } from 'react';

// export default function Home() {
//     const [groqResponse, setGroqResponse] = useState('');
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         async function fetchData() {
//             try {
//                 const response = await fetch('/api/groq', {
//                     method: 'POST',
//                     headers: { 'Content-Type': 'application/json' },
//                 });
//                 const data = await response.json();
//                 setGroqResponse(data.aiResponse);
//                 generateJavaScriptFile(data.aiResponse);
//             } catch (error) {
//                 console.error("API Error:", error);
//                 setGroqResponse("Error fetching data.");
//             } finally {
//                 setLoading(false);
//             }
//         }
//         fetchData();
//     }, []);

//     const generateJavaScriptFile = (result) => {
//         try {
//             const jsCode = `const aiOutput = ${JSON.stringify(result, null, 2)};`;
//             const blob = new Blob([jsCode], { type: 'text/javascript' });
//             const url = URL.createObjectURL(blob);
//             const a = document.createElement('a');
//             a.href = url;
//             a.download = 'ai-output.js';
//             document.body.appendChild(a);
//             a.click();
//             document.body.removeChild(a);
//             URL.revokeObjectURL(url);
//         } catch (error) {
//             console.error('Error generating JavaScript file:', error);
//             alert('Error generating JavaScript file.');
//         }
//     };

//     return (
//         <div>
//             <h1>Meet a Friend Compatibility Results:</h1>
//             {loading && <p>Loading...</p>}
//             <p>{groqResponse}</p>
//         </div>
//     );
// }













// import Groq from "groq-sdk";
// import { NextResponse } from 'next/server';

// const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// const peopleBios = {
//     "Alice": "Alice is a computer science major who loves coding hackathons, AI research, and building apps.",
//     "Bob": "Bob is a music student who enjoys playing guitar, producing beats, and organizing college concerts.",
//     "Charlie": "Charlie is a data science enthusiast fascinated by machine learning, big data, and predictive analytics.",
//     "Diana": "Diana is a graphic design major who loves digital art, animation, and UX/UI design.",
//     "Ethan": "Ethan is a kinesiology student passionate about sports, fitness training, and nutrition science.",
//     "Fiona": "Fiona is a history major who enjoys researching ancient civilizations, writing papers, and debating historical theories.",
//     "George": "George is a game development student who spends time coding indie games, experimenting with VR, and streaming gameplay.",
//     "Hannah": "Hannah is a journalism major who writes for the college newspaper and dreams of becoming an international reporter.",
//     "Ian": "Ian is a cybersecurity major who participates in ethical hacking competitions and cybersecurity awareness programs.",
//     "Julia": "Julia is a culinary arts student who experiments with new recipes, runs a food blog, and loves hosting dinner parties."
// };

// export async function POST(request) {
//   try {
//       const lastPersonKey = Object.keys(peopleBios).pop();
//       const lastPersonBio = peopleBios[lastPersonKey];

//       let comparisonMessages = "";
//       for (const key in peopleBios) {
//           if (key !== lastPersonKey) {
//               comparisonMessages += `Compare ${lastPersonKey} ("${lastPersonBio}") with ${key} ("${peopleBios[key]}"). Output in the format: ${key}, compatibility percentage, similarity tags (e.g., #sporty #computerscience).\n`;
//           }
//       }

//       const stream = await groq.chat.completions.create({
//           messages: [{
//               role: "system",
//               content: `You will compare the last person in the list with all the other people in the list. Here is the people bios information: ${JSON.stringify(peopleBios)}. For each comparison, output in the format: name, compatibility percentage, similarity tags.`
//           },
//           {
//               role: "user",
//               content: comparisonMessages
//           }],
//           model: "llama-3.3-70b-versatile",
//           temperature: 1,
//           max_completion_tokens: 1024,
//           top_p: 1,
//           stream: true,
//           stop: null,
//       });

//       const chunks = [];
//       for await (const chunk of stream) {
//           chunks.push(chunk.choices[0]?.delta?.content || chunk.choices[0]?.message?.content || '');
//       }

//       const result = chunks.join('');

//       return NextResponse.json({ aiResponse: result });
//   } catch (error) {
//       console.error("Groq API error:", error);
//       return NextResponse.json({ error: "Groq API error" }, { status: 500 });
//   }
// }

// 'use client';

// import { useState, useEffect } from 'react';

// export default function Home() {
//     const [groqResponse, setGroqResponse] = useState('');
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         async function fetchData() {
//             try {
//                 const response = await fetch('/api/groq', {
//                     method: 'POST',
//                     headers: { 'Content-Type': 'application/json' },
//                 });
//                 const data = await response.json();
//                 setGroqResponse(data.aiResponse);
//                 generateJavaScriptFile(data.aiResponse);
//             } catch (error) {
//                 console.error("API Error:", error);
//                 setGroqResponse("Error fetching data.");
//             } finally {
//                 setLoading(false);
//             }
//         }
//         fetchData();
//     }, []);

//     const generateJavaScriptFile = (result) => {
//         try {
//             const jsCode = `const aiOutput = ${JSON.stringify(result, null, 2)};`;
//             const blob = new Blob([jsCode], { type: 'text/javascript' });
//             const url = URL.createObjectURL(blob);
//             const a = document.createElement('a');
//             a.href = url;
//             a.download = 'ai-output.js';
//             document.body.appendChild(a);
//             a.click();
//             document.body.removeChild(a);
//             URL.revokeObjectURL(url);
//         } catch (error) {
//             console.error('Error generating JavaScript file:', error);
//             alert('Error generating JavaScript file.');
//         }
//     };

//     return (
//         <div>
//             <h1>Meet a Friend Compatibility Results:</h1>
//             {loading && <p>Loading...</p>}
//             <p>{groqResponse}</p>
//         </div>
//     );
// }

// 'use client';


// import Groq from "groq-sdk";
// import { NextResponse } from 'next/server';
// //const groq = new Groq({ apiKey: process.env.GROQ_API_KEY }); // Initialize Groq with API key




// export async function POST(request) {
//   try {
//     const { messages } = await request.json(); 
//     console.log("Received Messages:", messages);
//     const stream = await groq.chat.completions.create({
//       messages: messages,
//       model: "llama-3.3-70b-versatile",
//       temperature: 1,
//       max_completion_tokens: 1024,
//       top_p: 1,
//       stream: true,
//       stop: null,
//     });

//     const chunks = [];
//     for await (const chunk of stream) {
//       chunks.push(chunk.choices[0]?.delta?.content || chunk.choices[0]?.message?.content || '');
//     }
//     const result = chunks.join('');
//         console.log("API Result (before return):", result); // Log the result
//         console.log("API return object:", {result:result});
//         return NextResponse.json({ aiResponse: result });
//     // return NextResponse.json({ result: chunks.join('') });
//   } catch (error) {
//     console.error("Groq API error:", error);
//     return NextResponse.json({ error: "Groq API error" }, { status: 500 });
//   }
// }

// import { useState } from 'react';

// export default function Home() {
//   const [groqResponse, setGroqResponse] = useState('');
//   const [userInput, setUserInput] = useState('');
//   const [conversation, setConversation] = useState([
//       {
//         "role": "user",
//         "content": "set up a compabtility with description from a database of peopleBios that I supplied and one of my own description"
//       },
//       {
//         "role": "assistant",
//         "content": "To set up a compatibility comparison with descriptions from a database and the suer input, we'll need to follow a few steps"
//       },
//         // Please note that this is a simplified example and actual compatibility comparisons can be more complex and involve multiple factors.\n\n**Database of People Descriptions:**\nFor this example, let's assume we have a database with the following descriptions of people:\n\n1. **Person A**: Age 25, likes hiking, reading, and playing guitar. Values honesty, kindness, and sense of humor.\n2. **Person B**: Age 30, enjoys traveling, trying new foods, and playing sports. Prioritizes loyalty, intelligence, and ambition.\n3. **Person C**: Age 28, loves photography, writing, and volunteering. Looks for empathy, creativity, and a strong work ethic in a partner.\n\n**Your Description:**\nPlease provide a brief description of yourself, including:\n\n1. Your age\n2. Your interests (e.g., hobbies, passions)\n3. Your values (e.g., what you consider important in a relationship)\n\nYou can be as detailed or brief as you like, but the more information you provide, the more accurate the comparison will be.\n\nOnce I have your description, I can help compare it with the descriptions from the database to identify potential compatibility matches."
//       //},
//       // {
//       //   "role": "user",
//       //   "content": "Use actual names "
//       // },
//       {
//         "role": "assistant",
//         "content": "To set up a compatibility comparison with descriptions from a database of people and one of your own descriptions, we'll need to follow a few steps. Please note that this is a simplified example and actual compatibility comparisons can be more complex and involve multiple factors.\n\n**Database of People Descriptions:**\nFor this example, let's assume we have a database with the following descriptions of people:\n\n1. **Emily Wilson**: Age 25, likes hiking, reading, and playing guitar. Values honesty, kindness, and sense of humor. She's a free-spirited person who loves trying new things and exploring new places.\n2. **Liam Chen**: Age 30, enjoys traveling, trying new foods, and playing sports. Prioritizes loyalty, intelligence, and ambition. He's a driven individual who strives for success in his career and personal life.\n3. **Ava Morales**: Age 28, loves photography, writing, and volunteering. Looks for empathy, creativity, and a strong work ethic in a partner. She's a compassionate person who values meaningful relationships and personal growth.\n\n**Your Description:**\nPlease provide a brief description of yourself, including:\n\n1. Your name\n2. Your age\n3. Your interests (e.g., hobbies, passions)\n4. Your values (e.g., what you consider important in a relationship)\n\nYou can be as detailed or brief as you like, but the more information you provide, the more accurate the comparison will be.\n\nFor example, you could say something like:\n\n\"Hi, my name is **Oliver Lee**, I'm 27 years old. I enjoy playing basketball, cooking, and learning new languages. I value honesty, trust, and a sense of adventure in a relationship.\"\n\nOnce I have your description, I can help compare it with the descriptions from the database to identify potential compatibility matches."
//       },
//       {
//         "role": "user",
//         "content": "These are examples that the peopleBios may have. It will not be exactly like this though. Hi! I'm Olivia and I'm from Chelan, Washington. I am 100% committed to Mines and plan to study Geophysical Engineering. I love anything outdoors, but especially running, skiing, hiking, and camping. Reading and listening/playing music are a couple of my other hobbies. I'm looking for a roommate and people to hang out with, so feel free to reach out!\n\nInstagram: @livnelson06\nSnapchat: onelson2006"
//       },
//       {
//         "role": "assistant",
//         "content": "Nice to meet you, Olivia. It sounds like you're an outdoor enthusiast with a passion for adventure and a strong commitment to your studies. You seem like a fun and energetic person who values connection and community.\n\nNow, let's see how your description matches up with the descriptions from our database:\n\n**Comparison with Emily Wilson:**\nEmily and you share a love for outdoor activities like hiking and camping. You both also value honesty and kindness, although you didn't explicitly mention these traits in your description, they are often implicit in people who enjoy outdoor activities and are looking for meaningful connections. Emily's free-spirited nature might complement your adventurous personality, and you might enjoy exploring new places together. However, Emily's age (25) and your age ( assumed to be around 18-20 based on your Snapchat handle) might create a slight gap in your life experiences. Compatibility score: 7/10\n\n**Comparison with Liam Chen:**\nLiam's driven personality and priority on loyalty, intelligence, and ambition might not immediately resonate with your more relaxed and outdoor-focused vibe. However, Liam's enjoyment of sports and trying new foods could create some common ground, especially if you're interested in trying new outdoor activities or exploring different types of cuisine. Liam's age (30) and your age might create a significant gap in your life experiences, which could affect your compatibility. Compatibility score: 4/10\n\n**Comparison with Ava Morales:**\nAva's creative and compassionate personality might resonate with your love for music, reading, and outdoor activities. Ava's values of empathy, creativity, and a strong work ethic could align with your commitment to your studies and your desire for meaningful connections. Ava's age (28) is closer to Emily's, and you might find common ground in your shared love for creative pursuits and outdoor activities. Compatibility score: 8/10\n\nBased on these comparisons, it seems like you might have the most in common with Ava Morales, followed by Emily Wilson. However, compatibility is complex and depends on many factors, so it's essential to get to know each person individually to determine the best match.\n\nHow do you feel about these comparisons, Olivia? Would you like to explore any of these connections further, or would you like to provide more information about yourself to help refine the matches?"
//       },
//       {
//         "role": "user",
//         "content": "Could you just do percentages of compatibility with tags not long paragraphs\n"
//       },
//       {
//         "role": "assistant",
//         "content": "Here are the compatibility percentages with tags for each person:\n\n* **Emily Wilson**: 72% (Outdoor Enthusiast, Music Lover, Adventurous)\n* **Liam Chen**: 42% (Outdoor Activities, Foodie, Driven)\n* **Ava Morales**: 85% (Creative, Outdoor Lover, Compassionate)\n\nLet me know if you'd like me to add or change anything!"
//       },
//       {
//         "role": "user",
//         "content": "do hasttags\n"
//       },
//       {
//         "role": "assistant",
//         "content": "Here are the compatibility percentages with hashtags for each person:\n\n* **Emily Wilson**: 72% #OutdoorEnthusiast #MusicLover #Adventurous\n* **Liam Chen**: 42% #SportsFan #Foodie #Driven\n* **Ava Morales**: 85% #CreativeVibes #OutdoorLover #CompassionateSoul"
//       },
//       {
//         "role": "user",
//         "content": "i want you to ask me with a prompt too about my info and compare with the database you came up with"
//       },
//       {
//         "role": "assistant",
//         "content": "Please provide the following information about yourself:\n\n**Name**: \n**Age**: \n**Interests (hobbies, passions)**: \n**Values (what you consider important in a relationship)**: \n**Location (city, state)**: \n\nI'll compare your info with our database and provide compatibility percentages with hashtags for each person.\n\n(Note: You can fill in the information in a format like this: \"Olivia, 20, outdoor activities, honesty and kindness, Chelan, Washington\")\n\nType away!"
//       },
//       {
//         "role": "user",
//         "content": "hi! I'm ari, I love to shope, paint, and read. I'm from colorado!"
//       },
//       {
//         "role": "assistant",
//         "content": "Nice to meet you, Ari.\n\nI've compared your info with our database, and here are the compatibility percentages with hashtags for each person:\n\n* **Emily Wilson**: 60% #ArtisticVibes #Bookworm #OutdoorLover\n* **Liam Chen**: 30% #Ambitious #Driven #CityLife\n* **Ava Morales**: 80% #CreativeSoul #BookLover #NatureEnthusiast\n\nIt looks like you have a strong connection with Ava Morales, sharing interests in artistic pursuits and reading! Would you like to learn more about Ava or explore other connections?"
//       },
//       {
//         "role": "user",
//         "content": "where do i put this code?"
//       },
//       {
//         "role": "assistant",
//         "content": "You don't need to put any code anywhere. I'm a text-based AI assistant, and our conversation is happening in this chat window. I'm generating the responses based on our conversation, and you can simply type your answers and questions in this window.\n\nIf you want to provide more information about yourself or ask a new question, you can just type it in, and I'll respond accordingly. No coding or technical setup is required!"
//       },
//       {
//         "role": "user",
//         "content": "have your own hardcoded database with all the people that i can compare with with my own info"
//       },
//       {
//         "role": "assistant",
//         "content": "I have a hardcoded database with 10 people. You can provide your own information, and I'll compare it with the database to find compatible matches.\n\nHere's the database:\n\n1. **Emily Wilson**: 25, loves hiking, reading, and playing guitar. Values honesty, kindness, and sense of humor. From California.\n2. **Liam Chen**: 30, enjoys traveling, trying new foods, and playing sports. Prioritizes loyalty, intelligence, and ambition. From New York.\n3. **Ava Morales**: 28, loves photography, writing, and volunteering. Looks for empathy, creativity, and a strong work ethic in a partner. From Texas.\n4. **Julian Lee**: 22, passionate about coding, gaming, and music. Values humor, intelligence, and kindness. From Washington.\n5. **Sophia Patel**: 26, enjoys dancing, cooking, and reading. Prioritizes family, loyalty, and honesty. From Florida.\n6. **Ethan Kim**: 29, loves playing basketball, watching movies, and trying new restaurants. Values competitiveness, humor, and ambition. From Illinois.\n7. **Mia Garcia**: 24, passionate about art, fashion, and traveling. Looks for creativity, confidence, and kindness in a partner. From Arizona.\n8. **Noah Brooks**: 27, enjoys hiking, playing guitar, and writing. Values honesty, empathy, and sense of humor. From Oregon.\n9. **Charlotte Davis**: 23, loves reading, volunteering, and trying new foods. Prioritizes kindness, intelligence, and compassion. From Georgia.\n10. **Jackson Hall**: 31, passionate about sports, music, and traveling. Values loyalty, ambition, and sense of humor. From Michigan.\n\nPlease provide your own information:\n\n**Name**: \n**Age**: \n**Interests (hobbies, passions)**: \n**Values (what you consider important in a relationship)**: \n**Location (city, state)**: \n\nI'll compare your info with the database and provide compatibility percentages with hashtags for each person."
//       },
//       {
//         "role": "user",
//         "content": "hi! I'm ari, i like ot paint,draw, and read. im from colorado"
//       },
//       {
//         "role": "assistant",
//         "content": "Nice to meet you, Ari.\n\nI've compared your info with our database, and here are the compatibility percentages with hashtags for each person:\n\n1. **Emily Wilson**: 68% #ArtisticVibes #Bookworm #OutdoorLover\n2. **Liam Chen**: 32% #Ambitious #Driven #CityLife\n3. **Ava Morales**: 85% #CreativeSoul #BookLover #NatureEnthusiast\n4. **Julian Lee**: 40% #TechSavvy #Gaming #MusicLover\n5. **Sophia Patel**: 50% #FamilyOriented #Loyal #Honest\n6. **Ethan Kim**: 38% #Competitive #Humor #Ambitious\n7. **Mia Garcia**: 82% #Artistic #Fashionista #Traveler\n8. **Noah Brooks**: 75% #NatureLover #Musician #Writer\n9. **Charlotte Davis**: 60% #Bookworm #Volunteer #Compassionate\n10. **Jackson Hall**: 45% #SportsFan #MusicLover #Traveler\n\nIt looks like you have a strong connection with Ava Morales and Mia Garcia, sharing interests in art, reading, and creativity! Would you like to learn more about them or explore other connections?"
//       },
//       {
//         "role": "user",
//         "content": "format the output to look more organized"
//       },
//       {
//         "role": "assistant",
//         "content": "Here is the output formatted to look more organized:\n\n**Compatibility Results**\n\nYou've been matched with 10 individuals. Here are the results:\n\n1. **Emily Wilson**: 68% #ArtisticVibes #Bookworm #OutdoorLover\n2. **Liam Chen**: 32% #Ambitious #Driven #CityLife\n3. **Ava Morales**: 85% #CreativeSoul #BookLover #NatureEnthusiast\n4. **Julian Lee**: 40% #TechSavvy #Gaming #MusicLover\n5. **Sophia Patel**: 50% #FamilyOriented #Loyal #Honest\n6. **Ethan Kim**: 38% #Competitive #Humor #Ambitious\n7. **Mia Garcia**: 82% #Artistic #Fashionista #Traveler\n8. **Noah Brooks**: 75% #NatureLover #Musician #Writer\n9. **Charlotte Davis**: 60% #Bookworm #Volunteer #Compassionate\n10. **Jackson Hall**: 45% #SportsFan #MusicLover #Traveler\n\n**Top Matches**\n\n* **Ava Morales**: 85% #CreativeSoul #BookLover #NatureEnthusiast\n* **Mia Garcia**: 82% #Artistic #Fashionista #Traveler\n* **Noah Brooks**: 75% #NatureLover #Musician #Writer\n\nThese individuals have the highest compatibility scores with you based on your interests and values. Would you like to learn more about them?"
//       },
//       {
//         "role": "user",
//         "content": "give me code to get all the ai output into a file for javascript to parse"
//       },
//       {
//         "role": "assistant",
//         "content": "Here's an example of how you can use Node.js to capture the AI output and write it to a JSON file that can be easily parsed by JavaScript:\n```javascript\nconst fs = require('fs');\n\n// AI output\nconst output = {\n  \"compatibilityResults\": [\n    { \"name\": \"Emily Wilson\", \"score\": 68, \"tags\": \"#ArtisticVibes #Bookworm #OutdoorLover\" },\n    { \"name\": \"Liam Chen\", \"score\": 32, \"tags\": \"#Ambitious #Driven #CityLife\" },\n    { \"name\": \"Ava Morales\", \"score\": 85, \"tags\": \"#CreativeSoul #BookLover #NatureEnthusiast\" },\n    { \"name\": \"Julian Lee\", \"score\": 40, \"tags\": \"#TechSavvy #Gaming #MusicLover\" },\n    { \"name\": \"Sophia Patel\", \"score\": 50, \"tags\": \"#FamilyOriented #Loyal #Honest\" },\n    { \"name\": \"Ethan Kim\", \"score\": 38, \"tags\": \"#Competitive #Humor #Ambitious\" },\n    { \"name\": \"Mia Garcia\", \"score\": 82, \"tags\": \"#Artistic #Fashionista #Traveler\" },\n    { \"name\": \"Noah Brooks\", \"score\": 75, \"tags\": \"#NatureLover #Musician #Writer\" },\n    { \"name\": \"Charlotte Davis\", \"score\": 60, \"tags\": \"#Bookworm #Volunteer #Compassionate\" },\n    { \"name\": \"Jackson Hall\", \"score\": 45, \"tags\": \"#SportsFan #MusicLover #Traveler\" }\n  ],\n  \"topMatches\": [\n    { \"name\": \"Ava Morales\", \"score\": 85, \"tags\": \"#CreativeSoul #BookLover #NatureEnthusiast\" },\n    { \"name\": \"Mia Garcia\", \"score\": 82, \"tags\": \"#Artistic #Fashionista #Traveler\" },\n    { \"name\": \"Noah Brooks\", \"score\": 75, \"tags\": \"#NatureLover #Musician #Writer\" }\n  ]\n};\n\n// Write output to JSON file\nfs.writeFileSync('ai-output.json', JSON.stringify(output, null, 2));\n```\nThis code creates a JSON object `output` that contains the compatibility results and top matches. It then uses the `fs` module to write the JSON object to a file named `ai-output.json`.\n\nYou can also use the following code to capture the AI output and write it to a JSON file:\n```javascript\nconst fs = require('fs');\n\n// AI output\nconst output = {\n  \"compatibilityResults\": [],\n  \"topMatches\": []\n};\n\n// Function to capture AI output\nfunction captureOutput(name, score, tags) {\n  output.compatibilityResults.push({ \"name\": name, \"score\": score, \"tags\": tags });\n}\n\n// Function to capture top matches\nfunction captureTopMatches(name, score, tags) {\n  output.topMatches.push({ \"name\": name, \"score\": score, \"tags\": tags });\n}\n\n// Capture AI output (replace with actual AI output)\ncaptureOutput(\"Emily Wilson\", 68, \"#ArtisticVibes #Bookworm #OutdoorLover\");\ncaptureOutput(\"Liam Chen\", 32, \"#Ambitious #Driven #CityLife\");\ncaptureOutput(\"Ava Morales\", 85, \"#CreativeSoul #BookLover #NatureEnthusiast\");\n// ...\n\n// Capture top matches (replace with actual top matches)\ncaptureTopMatches(\"Ava Morales\", 85, \"#CreativeSoul #BookLover #NatureEnthusiast\");\ncaptureTopMatches(\"Mia Garcia\", 82, \"#Artistic #Fashionista #Traveler\");\ncaptureTopMatches(\"Noah Brooks\", 75, \"#NatureLover #Musician #Writer\");\n\n// Write output to JSON file\nfs.writeFileSync('ai-output.json', JSON.stringify(output, null, 2));\n```\nThis code defines two functions `captureOutput` and `captureTopMatches` to capture the AI output and top matches, respectively. It then uses these functions to capture the output and write it to a JSON file.\n\nYou can parse the JSON file in JavaScript using the following code:\n```javascript\nconst fs = require('fs');\n\n// Read JSON file\nconst output = JSON.parse(fs.readFileSync('ai-output.json', 'utf8'));\n\n// Access compatibility results and top matches\nconsole.log(output.compatibilityResults);\nconsole.log(output.topMatches);\n```"
//       },
//       {
//         "role": "user",
//         "content": "no i want in a javascript file actually"
//       },
//       {
//         "role": "assistant",
//         "content": "Here's an example of how you can capture the AI output and write it to a JavaScript file that can be easily parsed:\n```javascript\n// Generate AI output\nconst aiOutput = {\n  \"compatibilityResults\": [\n    { \"name\": \"Emily Wilson\", \"score\": 68, \"tags\": \"#ArtisticVibes #Bookworm #OutdoorLover\" },\n    { \"name\": \"Liam Chen\", \"score\": 32, \"tags\": \"#Ambitious #Driven #CityLife\" },\n    { \"name\": \"Ava Morales\", \"score\": 85, \"tags\": \"#CreativeSoul #BookLover #NatureEnthusiast\" },\n    { \"name\": \"Julian Lee\", \"score\": 40, \"tags\": \"#TechSavvy #Gaming #MusicLover\" },\n    { \"name\": \"Sophia Patel\", \"score\": 50, \"tags\": \"#FamilyOriented #Loyal #Honest\" },\n    { \"name\": \"Ethan Kim\", \"score\": 38, \"tags\": \"#Competitive #Humor #Ambitious\" },\n    { \"name\": \"Mia Garcia\", \"score\": 82, \"tags\": \"#Artistic #Fashionista #Traveler\" },\n    { \"name\": \"Noah Brooks\", \"score\": 75, \"tags\": \"#NatureLover #Musician #Writer\" },\n    { \"name\": \"Charlotte Davis\", \"score\": 60, \"tags\": \"#Bookworm #Volunteer #Compassionate\" },\n    { \"name\": \"Jackson Hall\", \"score\": 45, \"tags\": \"#SportsFan #MusicLover #Traveler\" }\n  ],\n  \"topMatches\": [\n    { \"name\": \"Ava Morales\", \"score\": 85, \"tags\": \"#CreativeSoul #BookLover #NatureEnthusiast\" },\n    { \"name\": \"Mia Garcia\", \"score\": 82, \"tags\": \"#Artistic #Fashionista #Traveler\" },\n    { \"name\": \"Noah Brooks\", \"score\": 75, \"tags\": \"#NatureLover #Musician #Writer\" }\n  ]\n};\n\n// Write AI output to a JavaScript file\nconst jsCode = \"const aiOutput = \" + JSON.stringify(aiOutput) + \";\";\nconst fs = require('fs');\nfs.writeFileSync('ai-output.js', jsCode);\n```\nThis code generates the AI output and writes it to a JavaScript file named `ai-output.js`. The JavaScript file will contain the following code:\n```javascript\nconst aiOutput = {\n  \"compatibilityResults\": [\n    { \"name\": \"Emily Wilson\", \"score\": 68, \"tags\": \"#ArtisticVibes #Bookworm #OutdoorLover\" },\n    { \"name\": \"Liam Chen\", \"score\": 32, \"tags\": \"#Ambitious #Driven #CityLife\" },\n    { \"name\": \"Ava Morales\", \"score\": 85, \"tags\": \"#CreativeSoul #BookLover #NatureEnthusiast\" },\n    { \"name\": \"Julian Lee\", \"score\": 40, \"tags\": \"#TechSavvy #Gaming #MusicLover\" },\n    { \"name\": \"Sophia Patel\", \"score\": 50, \"tags\": \"#FamilyOriented #Loyal #Honest\" },\n    { \"name\": \"Ethan Kim\", \"score\": 38, \"tags\": \"#Competitive #Humor #Ambitious\" },\n    { \"name\": \"Mia Garcia\", \"score\": 82, \"tags\": \"#Artistic #Fashionista #Traveler\" },\n    { \"name\": \"Noah Brooks\", \"score\": 75, \"tags\": \"#NatureLover #Musician #Writer\" },\n    { \"name\": \"Charlotte Davis\", \"score\": 60, \"tags\": \"#Bookworm #Volunteer #Compassionate\" },\n    { \"name\": \"Jackson Hall\", \"score\": 45, \"tags\": \"#SportsFan #MusicLover #Traveler\" }\n  ],\n  \"topMatches\": [\n    { \"name\": \"Ava Morales\", \"score\": 85, \"tags\": \"#CreativeSoul #BookLover #NatureEnthusiast\" },\n    { \"name\": \"Mia Garcia\", \"score\": 82, \"tags\": \"#Artistic #Fashionista #Traveler\" },\n    { \"name\": \"Noah Brooks\", \"score\": 75, \"tags\": \"#NatureLover #Musician #Writer\" }\n  ]\n};\n```\nYou can then include this JavaScript file in your HTML file and access the `aiOutput` object to parse the AI output."
//       }
//     ],
// );


//   const [loading, setLoading] = useState(false);

//   const handleInputChange = (event) => {
//     setUserInput(event.target.value);
//   };

//   const handleSubmit = async () => {
//     setLoading(true);
//     const updatedConversation = [...conversation, { role: "user", content: userInput }];
//     setConversation(updatedConversation);

//     try {
//       const response = await fetch('/api/groq', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ messages: updatedConversation }),
//       });
//       const data = await response.json();
//       console.log("API Response:", data);
//       console.log("data.aiResponse:", data.aiResponse); // Updated line
//       setGroqResponse(JSON.stringify(data.aiResponse)); // Updated line
//       generateJavaScriptFile(data.aiResponse);
//     } catch (error) {
//       console.error("API Error:", error);
//       setGroqResponse("Error fetching data.");
//     }
//     setLoading(false);
//   };

//   const generateJavaScriptFile = (result) => {
//     try {
//       const jsCode = `const aiOutput = ${JSON.stringify(result, null, 2)};`;
//       const blob = new Blob([jsCode], { type: 'text/javascript' });
//       const url = URL.createObjectURL(blob);
//       const a = document.createElement('a');
//       a.href = url;
//       a.download = 'ai-output.js';
//       document.body.appendChild(a);
//       a.click();
//       document.body.removeChild(a);
//       URL.revokeObjectURL(url);
//     } catch (error) {
//       console.error('Error generating JavaScript file:', error);
//       alert('Error generating JavaScript file.');
//     }
//   };

//   return (
//     <div>
//      <h1>Meet a Friend Compatibility Results:</h1>
//        <textarea value={userInput} onChange={handleInputChange} placeholder="Enter your info..." />
//       <button onClick={handleSubmit} disabled={loading}>Submit</button>
//       {loading && <p>Loading...</p>}
//      <p>{groqResponse}</p>
//    </div>
//   );
// }

//   const handleSubmit = async () => {
//     setLoading(true);
//     const updatedConversation = [...conversation, { role: "user", content: userInput }];
//     setConversation(updatedConversation);

//     try {
//       const response = await fetch('/api/groq', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ messages: updatedConversation }),
//       });
//       const data = await response.json();
//       setGroqResponse(data.result);
//       generateJavaScriptFile(data.result);
//     } catch (error) {
//       console.error("API Error:", error);
//       setGroqResponse("Error fetching data.");
//     }
//     setLoading(false);
//   };

//   const generateJavaScriptFile = (result) => {
//     try {
//       const parsedResult = JSON.parse(JSON.stringify(result));
//       const jsCode = `const aiOutput = ${JSON.stringify(parsedResult, null, 2)};`;
//       const blob = new Blob([jsCode], { type: 'text/javascript' });
//       const url = URL.createObjectURL(blob);
//       const a = document.createElement('a');
//       a.href = url;
//       a.download = 'ai-output.js';
//       document.body.appendChild(a);
//       a.click();
//       document.body.removeChild(a);
//       URL.revokeObjectURL(url);
//     } catch (error) {
//       console.error('Error generating JavaScript file:', error);
//       alert('Error generating JavaScript file.');
//     }
//   };

//   return (
//     <div>
//       <h1>Meet a Friend Compatibility Results:</h1>
//       <textarea value={userInput} onChange={handleInputChange} placeholder="Enter your info..." />
//       <button onClick={handleSubmit} disabled={loading}>Submit</button>
//       {loading && <p>Loading...</p>}
//       <p>{groqResponse}</p>
//     </div>
//   );
// }

//   return (
//     <div>
//       <h1>Meet a Friend Compatibility Results:</h1>
//       <textarea value={userInput} onChange={handleInputChange} placeholder="Enter your info..." />
//       <button onClick={handleSubmit} disabled={loading}>Submit</button>
//       {loading && <p>Loading...</p>}
//       <p>{groqResponse}</p>
//     </div>
//   );
// }