import "server-only";
import { JWTPayload, SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export async function encrypt(payload: JWTPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

export async function decode(session: string) {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    null;
  }
}

export async function createSession(id: string, time?: Date) {
  const date = time || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const session = await encrypt({ id, date });

  (await cookies()).set("session", session, {
    httpOnly: true,
    secure: true,
    expires: date,
    sameSite: "lax",
    path: "/",
  });
}

export async function updateSession() {
  const cookie = await cookies();
  const session = cookie.get("session")?.value;
  const payload = await decode(session || "");

  if (!session || !payload) {
    return null;
  }

  const updatedDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  cookie.set("session", session, {
    httpOnly: true,
    secure: true,
    expires: updatedDate,
    sameSite: "lax",
    path: "/",
  });
}

export async function logout() {
  (await cookies()).delete("session");
}
