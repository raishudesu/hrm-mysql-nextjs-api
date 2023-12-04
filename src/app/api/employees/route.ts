import { NextResponse } from "next/server";
import prisma from "../../../../prisma/db";

export async function GET(req: Request) {
  try {
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
