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
                content: `You will compare the last person in the list with all the other people in the list. Here is the people bios information: ${JSON.stringify(peopleBios)}. For each comparison, output EXACTLY like this example, NO other text:\nComparison with [Other Person's Name]: * Compatibility Percentage: 50% * Relevant Tags: #example #tags\n`
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

        const comparisons = result.split('\n');
        const compatibilityScores = [];
        comparisons.forEach(comp => {
            const percentageMatch = comp.match(/Compatibility Percentage: (\d+)%/);
            const tagsMatch = comp.match(/Relevant Tags: (.+)/);
            const userMatch = comp.match(/Comparison with (.+?):/);

            if (percentageMatch && tagsMatch && userMatch) {
                compatibilityScores.push({
                    user: userMatch[1],
                    percentage: parseInt(percentageMatch[1]),
                    tags: tagsMatch[1]
                });
            }
        });

        compatibilityScores.sort((a, b) => b.percentage - a.percentage);

        let sortedOutput = "";
        for (let i = 0; i < 9; i++) {
            sortedOutput += `Comparison with ${compatibilityScores[i].user}: * Compatibility Percentage: ${compatibilityScores[i].percentage}% * Relevant Tags: ${compatibilityScores[i].tags}\n\n`;
        }
        // compatibilityScores.forEach(score => {
        //     sortedOutput += `Comparison with ${score.user}: * Compatibility Percentage: ${score.percentage}% * Relevant Tags: ${score.tags}\n\n`;
        // });

        return NextResponse.json({ aiResponse: sortedOutput });
    } catch (error) {
        console.error("Groq API error:", error);
        return NextResponse.json({ error: "Groq API error" }, { status: 500 });
    }
}