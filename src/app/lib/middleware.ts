import prisma from "../../../prisma/db";
import { compare } from "bcrypt";

export async function middleware(req: Request) {
  const headers = req.headers;
  const adminUsername = headers.get("admin-username");
  const adminPassword = headers.get("admin-password");

  if (adminUsername === null || adminPassword === null)
    return JSON.stringify({
      ok: false,
      message: "Unauthorized. No admin credentials provided on headers.",
    });

  const isAdmin = await prisma.admins.findUnique({
    where: {
      username: adminUsername as string,
    },
  });

  if (!isAdmin)
    return JSON.stringify({
      ok: false,
      message: "Unauthorized.",
    });

  const passwordMatched = await compare(
    adminPassword as string,
    isAdmin.password
  );

  if (!passwordMatched)
    return JSON.stringify({
      ok: false,
      message: "Unauthorized. Wrong admin password",
    });

  return JSON.stringify({ ok: true });
}
