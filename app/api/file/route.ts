import { NextResponse } from "next/server";
// import { revalidatePath } from "next/cache";
import fs from "fs/promises";
import { LLMResult } from "@/lib/llmResult";
import FileProcess from "@/lib/fileProcess";
import { createRouteHandlerClient} from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers";
import { pick } from "lodash";

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
    const cookieStore = cookies();
    const filePath = `./uploads/${timestamp}.pdf` 
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
    await fs.writeFile(filePath, buffer);

    const aiResult: LLMResult = await FileProcess(filePath);

    const { data: userData } = await supabase.auth.signInAnonymously();
    await supabase.auth.updateUser({ email: aiResult.email });
    await supabase.auth.updateUser({ password: 'password' })
    
    const resultToSave =  {
      ...pick(aiResult, ["summary", "title", "name", "email", "phone", "address", "ai_recommendation", "links", "hobbies"]),
      user_id: userData?.user?.id
    };
    const { data: resume, error } = await supabase.from('resume').insert(resultToSave).select('*');
    console.log(resultToSave, resume, error);

    return NextResponse.json(resume);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error });
  }
}
