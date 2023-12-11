import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";

// FOR ADMIN HASHED PASSWORD GENERATION

export async function GET(req: Request, { params }: { params: Params }) {
  try {
    const { text } = params;
    const hashedPwd = await hash(text, 10);
    return NextResponse.json(hashedPwd, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
