import Groq from "groq-sdk";
import { NextResponse } from 'next/server';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const peopleBios = {
    "Alice": "Alice is a computer science major who loves coding hackathons, AI research, and building apps.",
    "Bob": "Bob is a music student who enjoys playing guitar, producing beats, and organizing college concerts.",
    "Charlie": "Charlie is a data science enthusiast fascinated by machine learning, big data, and predictive analytics.",
    "Diana": "Diana is a graphic design major who loves digital art, animation, and UX/UI design.",
    "Ethan": "Ethan is a kinesiology student passionate about sports, fitness training, and nutrition science.",
    "Fiona": "Fiona is a history major who enjoys researching ancient civilizations, writing papers, and debating historical theories.",
    "George": "George is a game development student who spends time coding indie games, experimenting with VR, and streaming gameplay.",
    "Hannah": "Hannah is a journalism major who writes for the college newspaper and dreams of becoming an international reporter.",
    "Ian": "Ian is a cybersecurity major who participates in ethical hacking competitions and cybersecurity awareness programs.",
    "Julia": "Julia is a culinary arts student who experiments with new recipes, runs a food blog, and loves hosting dinner parties."
};

export async function POST(request) {
    try {
        const lastPersonKey = Object.keys(peopleBios).pop();
        const lastPersonBio = peopleBios[lastPersonKey];

        let comparisonMessages = "";
        for (const key in peopleBios) {
            if (key !== lastPersonKey) {
                comparisonMessages += `Compare ${lastPersonKey} ("${lastPersonBio}") with ${key} ("${peopleBios[key]}"). Output EXACTLY like this example, NO other text:\nComparison with ${key}: * Compatibility Percentage: 50% * Relevant Tags: #example #tags\n\n`;
            }
        }

        const stream = await groq.chat.completions.create({
            messages: [{
                role: "system",
                content: `You will compare the last person in the list with all the other people in the list. Here is the people bios information: ${JSON.stringify(peopleBios)}. For each comparison, output EXACTLY like this example, NO other text:\nComparison with [Other Person's Name]: * Compatibility Percentage: 50% * Relevant Tags: #example #tags\n\n`
            },
            {
                role: "user",
                content: comparisonMessages
            }],
            model: "llama-3.3-70b-versatile",
            temperature: 0.5, // Lower temperature
            max_completion_tokens: 1024,
            top_p: 1,
            stream: true,
            stop: null,
        });

        const chunks = [];
        for await (const chunk of stream) {
            chunks.push(chunk.choices[0]?.delta?.content || chunk.choices[0]?.message?.content || '');
        }

        const result = chunks.join('');

        return NextResponse.json({ aiResponse: result });
    } catch (error) {
        console.error("Groq API error:", error);
        return NextResponse.json({ error: "Groq API error" }, { status: 500 });
    }
}

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
//     try {
//         const lastPersonKey = Object.keys(peopleBios).pop();
//         const lastPersonBio = peopleBios[lastPersonKey];

//         let comparisonMessages = "";
//         for (const key in peopleBios) {
//             if (key !== lastPersonKey) {
//                 comparisonMessages += `Comparison with ${key}: * Compatibility Percentage: [Percentage]% * Relevant Tags: [Tags as a list]\n\n`; // Add two newlines
//             }
//         }

//         const stream = await groq.chat.completions.create({
//             messages: [{
//                 role: "system",
//                 content: `You will compare the last person in the list with all the other people in the list. Here is the people bios information: ${JSON.stringify(peopleBios)}. For each comparison, output EXACTLY in the following format, NO other text:\nComparison with [Other Person's Name]: * Compatibility Percentage: [Percentage]% * Relevant Tags: [Tags as a list]\n\n`
//             },
//             {
//                 role: "user",
//                 content: comparisonMessages
//             }],
//             model: "llama-3.3-70b-versatile",
//             temperature: 1,
//             max_completion_tokens: 1024,
//             top_p: 1,
//             stream: true,
//             stop: null,
//         });

//         const chunks = [];
//         for await (const chunk of stream) {
//             chunks.push(chunk.choices[0]?.delta?.content || chunk.choices[0]?.message?.content || '');
//         }

//         const result = chunks.join('');

//         return NextResponse.json({ aiResponse: result });
//     } catch (error) {
//         console.error("Groq API error:", error);
//         return NextResponse.json({ error: "Groq API error" }, { status: 500 });
//     }
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
//     try {
//         const lastPersonKey = Object.keys(peopleBios).pop();
//         const lastPersonBio = peopleBios[lastPersonKey];

//         let comparisonMessages = "";
//         for (const key in peopleBios) {
//             if (key !== lastPersonKey) {
//                 comparisonMessages += `Compare ${lastPersonKey} ("${lastPersonBio}") with ${key} ("${peopleBios[key]}"). Output EXACTLY in the following format, NO other text:\nComparison with ${key}:\n* Compatibility Percentage: [Percentage]%\n* Relevant Tags: [Tags as a list]\n`;
//             }
//         }

//         const stream = await groq.chat.completions.create({
//             messages: [{
//                 role: "system",
//                 content: `You will compare the last person in the list with all the other people in the list. Here is the people bios information: ${JSON.stringify(peopleBios)}. For each comparison, output EXACTLY in the following format, NO other text:\nComparison with [Other Person's Name]:\n* Compatibility Percentage: [Percentage]%\n* Relevant Tags: [Tags as a list]`
//             },
//             {
//                 role: "user",
//                 content: comparisonMessages
//             }],
//             model: "llama-3.3-70b-versatile",
//             temperature: 1,
//             max_completion_tokens: 1024,
//             top_p: 1,
//             stream: true,
//             stop: null,
//         });

//         const chunks = [];
//         for await (const chunk of stream) {
//             chunks.push(chunk.choices[0]?.delta?.content || chunk.choices[0]?.message?.content || '');
//         }

//         const result = chunks.join('');

//         return NextResponse.json({ aiResponse: result });
//     } catch (error) {
//         console.error("Groq API error:", error);
//         return NextResponse.json({ error: "Groq API error" }, { status: 500 });
//     }
// }


// // import Groq from "groq-sdk";
// // import { NextResponse } from 'next/server';

// // const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// // const peopleBios = {
// //     "Alice": "Alice is a computer science major who loves coding hackathons, AI research, and building apps.",
// //     "Bob": "Bob is a music student who enjoys playing guitar, producing beats, and organizing college concerts.",
// //     "Charlie": "Charlie is a data science enthusiast fascinated by machine learning, big data, and predictive analytics.",
// //     "Diana": "Diana is a graphic design major who loves digital art, animation, and UX/UI design.",
// //     "Ethan": "Ethan is a kinesiology student passionate about sports, fitness training, and nutrition science.",
// //     "Fiona": "Fiona is a history major who enjoys researching ancient civilizations, writing papers, and debating historical theories.",
// //     "George": "George is a game development student who spends time coding indie games, experimenting with VR, and streaming gameplay.",
// //     "Hannah": "Hannah is a journalism major who writes for the college newspaper and dreams of becoming an international reporter.",
// //     "Ian": "Ian is a cybersecurity major who participates in ethical hacking competitions and cybersecurity awareness programs.",
// //     "Julia": "Julia is a culinary arts student who experiments with new recipes, runs a food blog, and loves hosting dinner parties."
// // };

// // export async function POST(request) {
// //     try {
// //         const lastPersonKey = Object.keys(peopleBios).pop();
// //         const lastPersonBio = peopleBios[lastPersonKey];

// //         let comparisonMessages = "";
// //         for (const key in peopleBios) {
// //             if (key !== lastPersonKey) {
// //                 comparisonMessages += `Compare ${lastPersonKey} ("${lastPersonBio}") with ${key} ("${peopleBios[key]}"). Output in the following format ONLY, NO additional text or paragraphs:\nComparison with ${key}:\n* Compatibility Percentage: [Percentage]%\n* Relevant Tags: [Tags as a list]\n`;
// //             }
// //         }

// //         const stream = await groq.chat.completions.create({
// //             messages: [{
// //                 role: "system",
// //                 content: `You will compare the last person in the list with all the other people in the list. Here is the people bios information: ${JSON.stringify(peopleBios)}. For each comparison, output in the following format ONLY, NO additional text or paragraphs:\nComparison with [Other Person's Name]:\n* Compatibility Percentage: [Percentage]%\n* Relevant Tags: [Tags as a list]`
// //             },
// //             {
// //                 role: "user",
// //                 content: comparisonMessages
// //             }],
// //             model: "llama-3.3-70b-versatile",
// //             temperature: 1,
// //             max_completion_tokens: 1024,
// //             top_p: 1,
// //             stream: true,
// //             stop: null,
// //         });

// //         const chunks = [];
// //         for await (const chunk of stream) {
// //             chunks.push(chunk.choices[0]?.delta?.content || chunk.choices[0]?.message?.content || '');
// //         }

// //         const result = chunks.join('');

// //         return NextResponse.json({ aiResponse: result });
// //     } catch (error) {
// //         console.error("Groq API error:", error);
// //         return NextResponse.json({ error: "Groq API error" }, { status: 500 });
// //     }
// // }

// // import Groq from "groq-sdk";
// // import { NextResponse } from 'next/server';

// // const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// // const peopleBios = {
// //     "Alice": "Alice is a computer science major who loves coding hackathons, AI research, and building apps.",
// //     "Bob": "Bob is a music student who enjoys playing guitar, producing beats, and organizing college concerts.",
// //     "Charlie": "Charlie is a data science enthusiast fascinated by machine learning, big data, and predictive analytics.",
// //     "Diana": "Diana is a graphic design major who loves digital art, animation, and UX/UI design.",
// //     "Ethan": "Ethan is a kinesiology student passionate about sports, fitness training, and nutrition science.",
// //     "Fiona": "Fiona is a history major who enjoys researching ancient civilizations, writing papers, and debating historical theories.",
// //     "George": "George is a game development student who spends time coding indie games, experimenting with VR, and streaming gameplay.",
// //     "Hannah": "Hannah is a journalism major who writes for the college newspaper and dreams of becoming an international reporter.",
// //     "Ian": "Ian is a cybersecurity major who participates in ethical hacking competitions and cybersecurity awareness programs.",
// //     "Julia": "Julia is a culinary arts student who experiments with new recipes, runs a food blog, and loves hosting dinner parties."
// // };

// // export async function POST(request) {
// //     try {
// //         const lastPersonKey = Object.keys(peopleBios).pop();
// //         const lastPersonBio = peopleBios[lastPersonKey];

// //         let comparisonMessages = "";
// //         for (const key in peopleBios) {
// //             if (key !== lastPersonKey) {
// //                 comparisonMessages += `Compare ${lastPersonKey} ("${lastPersonBio}") with ${key} ("${peopleBios[key]}"). Provide a compatibility percentage and a list of relevant tags for each comparison.\n`;
// //             }
// //         }

// //         const stream = await groq.chat.completions.create({
// //             messages: [{
// //                 role: "system",
// //                 content: `You will compare the last person in the list with all the other people in the list. Here is the people bios information: ${JSON.stringify(peopleBios)}. For each comparison, output a compatibility percentage and a list of relevant tags.`
// //             },
// //             {
// //                 role: "user",
// //                 content: comparisonMessages
// //             }],
// //             model: "llama-3.3-70b-versatile",
// //             temperature: 1,
// //             max_completion_tokens: 1024,
// //             top_p: 1,
// //             stream: true,
// //             stop: null,
// //         });

// //         const chunks = [];
// //         for await (const chunk of stream) {
// //             chunks.push(chunk.choices[0]?.delta?.content || chunk.choices[0]?.message?.content || '');
// //         }

// //         const result = chunks.join('');

// //         return NextResponse.json({ aiResponse: result });
// //     } catch (error) {
// //         console.error("Groq API error:", error);
// //         return NextResponse.json({ error: "Groq API error" }, { status: 500 });
// //     }
// // }


// // import Groq from "groq-sdk";
// // import { NextResponse } from 'next/server';

// // const groq = new Groq({ apiKey:'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', dangerouslyAllowBrowser: true })

// // export async function POST(request) {
// //   try {
// //     const { messages } = await request.json();

// //     const stream = await groq.chat.completions.create({
// //       messages: messages,
// //       model: "llama-3.3-70b-versatile",
// //       temperature: 1,
// //       max_completion_tokens: 1024,
// //       top_p: 1,
// //       stream: true,
// //       stop: null,
// //     });

// //     const chunks = [];
// //     for await (const chunk of stream) {
// //       chunks.push(chunk.choices[0]?.delta?.content || chunk.choices[0]?.message?.content || '');
// //     }

// //     return NextResponse.json({ result: chunks.join('') });
// //   } catch (error) {
// //     console.error("Groq API error:", error);
// //     return NextResponse.json({ error: "Groq API error" }, { status: 500 });
// //   }
// // }

// // // src/app/api/groq/route.js
// // import Groq from "groq-sdk";
// // import { NextResponse } from 'next/server';
// // const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
// // //console.log("GROQ_API_KEY:", process.env.GROQ_API_KEY);

// // const peopleBios = {
// //   "Alice": "Alice is a computer science major who loves coding hackathons, AI research, and building apps.",
// //   "Bob": "Bob is a music student who enjoys playing guitar, producing beats, and organizing college concerts.",
// //   "Charlie": "Charlie is a data science enthusiast fascinated by machine learning, big data, and predictive analytics.",
// //   "Diana": "Diana is a graphic design major who loves digital art, animation, and UX/UI design.",
// //   "Ethan": "Ethan is a kinesiology student passionate about sports, fitness training, and nutrition science.",
// //   "Fiona": "Fiona is a history major who enjoys researching ancient civilizations, writing papers, and debating historical theories.",
// //   "George": "George is a game development student who spends time coding indie games, experimenting with VR, and streaming gameplay.",
// //   "Hannah": "Hannah is a journalism major who writes for the college newspaper and dreams of becoming an international reporter.",
// //   "Ian": "Ian is a cybersecurity major who participates in ethical hacking competitions and cybersecurity awareness programs.",
// //   "Julia": "Julia is a culinary arts student who experiments with new recipes, runs a food blog, and loves hosting dinner parties."
// // };

// // export async function POST(request) {
// //   try {
// //       const lastPersonKey = Object.keys(peopleBios).pop();
// //       const lastPersonBio = peopleBios[lastPersonKey];

// //       let comparisonMessages = "";
// //       for (const key in peopleBios) {
// //           if (key !== lastPersonKey) {
// //               comparisonMessages += `Compare ${lastPersonKey} ("${lastPersonBio}") with ${key} ("${peopleBios[key]}").\n`;
// //           }
// //       }

// //       const stream = await groq.chat.completions.create({
// //           messages: [{
// //               role: "system",
// //               content: `You will compare the last person in the list with all the other people in the list. Here is the people bios information: ${JSON.stringify(peopleBios)}`
// //           },
// //           {
// //               role: "user",
// //               content: comparisonMessages
// //           }],
// //           model: "llama-3.3-70b-versatile",
// //           temperature: 1,
// //           max_completion_tokens: 1024,
// //           top_p: 1,
// //           stream: true,
// //           stop: null,
// //       });

// //       const chunks = [];
// //       for await (const chunk of stream) {
// //           chunks.push(chunk.choices[0]?.delta?.content || chunk.choices[0]?.message?.content || '');
// //       }

// //       const result = chunks.join('');

// //       return NextResponse.json({ aiResponse: result });
// //   } catch (error) {
// //       console.error("Groq API error:", error);
// //       return NextResponse.json({ error: "Groq API error" }, { status: 500 });
// //   }
// // }

// // console.log(typeof peopleBios);
// // console.log(peopleBios);

// // export async function POST(request) {
// //   try {
// //     const { messages } = await request.json();
// //     const lastPersonKey = Object.keys(peopleBios).pop();
// //     const lastPersonBio = peopleBios[lastPersonKey];
// //     const stream = await groq.chat.completions.create({
// //         messages: [{
// //             role: "system",
// //             content: `Here is the People Bios information that you will use to compare user information: ${JSON.stringify(peopleBios)}`
// //         },
// //         ...messages],
// //         model: "llama-3.3-70b-versatile",
// //         temperature: 1,
// //         max_completion_tokens: 1024,
// //         top_p: 1,
// //         stream: true,
// //         stop: null,
// //     });
// //     //   messages: messages,
// //     //   model: "llama-3.3-70b-versatile",
// //     //   temperature: 1,
// //     //   max_completion_tokens: 1024,
// //     //   top_p: 1,
// //     //   stream: true,
// //     //   stop: null,
// //     // });

// //     const chunks = [];
// //     for await (const chunk of stream) {
// //       chunks.push(chunk.choices[0]?.delta?.content || chunk.choices[0]?.message?.content || '');
// //     }

// //     const result = chunks.join('');

// //     // Structure the result as a JSON object
// //     return NextResponse.json({ aiResponse: result }); // <--- Change here
// //   } catch (error) {
// //     console.error("Groq API error:", error);
// //     return NextResponse.json({ error: "Groq API error" }, { status: 500 });
// //   }
// // }