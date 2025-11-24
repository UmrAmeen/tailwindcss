"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { user, images } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import db from "./lib/db/db";

export async function CreateSignUpForm(_: any, formData: FormData) {
  const name = formData.get("name")?.toString();
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const confirmPassword = formData.get("confirmPassword")?.toString();

  if (!name || !email || !password) {
    return { success: false, error: "All fields are required." };
  }

  if (password !== confirmPassword) {
    return { success: false, error: "Passwords do not match." };
  }

  try {
    await db.insert(user).values({ name, email, password });

    return { success: true, error: "" };
  } catch (error) {
    console.error(error);
    return { success: false, error: "User already exists or DB error." };
  }
}

export async function CreateLoginForm(formData: FormData) {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();

  if (!email || !password) {
    return { success: false, error: "Email and password are required." };
  }

  const foundUser = await db
    .select()
    .from(user)
    .where(eq(user.email, email))
    .get();

  if (!foundUser || foundUser.password !== password) {
    return { success: false, error: "Invalid email or password." };
  }

  const cookieStore = await cookies();
  cookieStore.set("userid", foundUser.name ?? "", {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24,
  });

  redirect("/dashboard");
}

export async function CreateLogout() {
  const cookieStore = await cookies();
  cookieStore.delete("userid");

  redirect("/dashboard/loginForm");
}

export async function insertImage(image: File): Promise<number> {
  const buffer = Buffer.from(await image.arrayBuffer());
  const type = image.type;

  const result = await db
    .insert(images)
    .values({
      image: buffer,
      imageType: type,
    })
    .returning({ id: images.id })
    .get();

  return result.id;
}
