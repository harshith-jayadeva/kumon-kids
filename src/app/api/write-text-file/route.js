import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request) {
    console.log("Post called in write");
    try {
        const { data } = await request.json();
        const filePath = path.join(process.cwd(), 'src/app/ai-output.txt');

        fs.writeFileSync(filePath, data);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error writing file:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}