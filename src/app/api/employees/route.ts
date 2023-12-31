import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma/db";
import { middleware } from "@/app/lib/middleware";

export async function GET(req: NextRequest) {
  try {
    const auth = await middleware(req);
    const res = JSON.parse(auth);

    if (!res.ok) return NextResponse.json(res, { status: 401 });

    const employees = await prisma.employees.findMany({
      take: 10,
    });

    return NextResponse.json({ ok: true, employees }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ ok: false, error }, { status: 500 });
  }
}

/* 
MYSQL QUERY EQUIVALENT

SELECT * FROM EMPLOYEES

*/
