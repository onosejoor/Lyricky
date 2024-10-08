import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export async function encrypt(payload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

export async function decode(session) {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    null
  }
}

export async function createSession(username, time) {
  const date = time || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const session = await encrypt({ username, date });

  cookies().set("session", session, {
    httpOnly: true,
    secure: true,
    expires: date,
    sameSite: "lax",
    path: "/",
  });
}

export async function updateSession() {
  const session = cookies().get('session')?.value;
  const payload = await decode(session);

  console.log(session, payload);
  

  if (!session || !payload) {
    return null
  }

  const updatedDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  cookies().set("session", session, {
    httpOnly: true,
    secure: true,
    expires: updatedDate,
    sameSite: "lax",
    path: "/",
  });
}
 export async function deleteSession () {
  cookies().delete('session')
  
 }