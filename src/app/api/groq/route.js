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
            temperature: 0.5, 
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
