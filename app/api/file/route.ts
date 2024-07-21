import { NextResponse } from "next/server";
// import { revalidatePath } from "next/cache";
import fs from "fs/promises";
import { LLMResult } from "@/lib/llmResult";
import FileProcess from "@/lib/fileProcess";

export async function GET() {
  return NextResponse.json({ test: "Hello world" });
}

export async function POST(
  req: Request,
) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);
    const timestamp = new Date().getTime();
    await fs.writeFile(`./uploads/${timestamp}.pdf`, buffer);

    // revalidatePath("/")

    const result: LLMResult = await FileProcess(`./uploads/${timestamp}.pdf`);
    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error });
  }
}
