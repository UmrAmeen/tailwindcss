import { cookies } from "next/headers";

export async function getUserIdFromCookie(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get("userid")?.value ?? null;
}
