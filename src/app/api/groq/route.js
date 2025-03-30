// "use client";
import Groq from "groq-sdk";
import { NextResponse } from 'next/server';
import { convertFirebaseDataToUserDictionary } from "@/app/parseFirebaseData.js";
// import { useUser } from "@/app/userContext.js";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(request) {
    console.log("Called Post");
    const { userId } = await request.json();
    // console.log(userId);
    const firebaseOutput = await convertFirebaseDataToUserDictionary(userId);
    const peopleBios = firebaseOutput[0];
    // console.log(peopleBios);
    const userIndex = firebaseOutput[1];
    try {
        const ck = Object.keys(peopleBios);
        const currentPersonKey = ck[userIndex];

        console.log(currentPersonKey);
        const currentPersonBio = peopleBios[currentPersonKey];
        console.log(currentPersonBio);

        let comparisonMessages = "";
        for (const key in peopleBios) {
            if (key !== currentPersonKey || key !== undefined) {
                comparisonMessages += `Compare ${currentPersonKey} ("${currentPersonBio}") with ${key} ("${peopleBios[key]}"). Output EXACTLY like this example, NO other text:\nComparison with ${key}: * Compatibility Percentage: 50% * Relevant Tags: #example #tags\n\n`;
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