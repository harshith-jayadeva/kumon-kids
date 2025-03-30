import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request) {
    try {
        const { data } = await request.json();
        const filePath = path.join(process.cwd(), 'ai-output.txt');

        fs.writeFileSync(filePath, data);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error writing file:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}