"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";

import { images, user } from "@/supabase/migrations/schema";
import { supabase } from "../lib/supabaseClient";
import { db } from "../lib/db/database";


export async function CreateSignUpForm(prevFormState: any, formData: FormData) {
  const name = formData.get("name")?.toString().trim();
  const email = formData.get("email")?.toString().trim();

  const password = formData.get("password")?.toString();
  const confirmPassword = formData.get("confirmPassword")?.toString();

  if (!name || !email || !password) {
    return { success: false, error: "All fields are required." };
  }

  if (password !== confirmPassword) {
    return { success: false, error: "Passwords do not match." };
  }

  try {
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) {
      return { success: false, error: authError.message };
    }

    if (!authData.user) {
      return {
        success: true,
        error: "Signup successful! Please check your email to confirm.",
      };
    }

    try {
      await db.insert(user).values({
        auth_id: authData.user.id,
        name,
        email,
      });
    } catch (err) {
      console.error("DB insert error:", err);
      return { success: false, error: "Failed to save user in database." };
    }

    return { success: true, error: "" };
  } catch (err) {
    console.error("Signup error:", err);
    return {
      success: false,
      error: "User creation failed. Maybe already exists.",
    };
  }
}

export async function CreateLoginForm(formData: FormData) {
  const email = formData.get("email")?.toString().trim();
  const password = formData.get("password")?.toString().trim();

  if (!email || !password) {
    return { success: false, error: "Email and password are required." };
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error || !data.user) {
    return { success: false, error: "Invalid credentials." };
  }

  const result = await db
    .select()
    .from(user)
    .where(eq(user.auth_id, data.user.id))
    .execute();

  const foundUser = result[0];
  const cookieStore = await cookies();

  if (!foundUser.auth_id) {
    throw new Error("User auth_id is null, cannot set cookie");
  }

  cookieStore.set("userid", foundUser.auth_id, {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24,
  });

  redirect("/public/shopingCart");
}

export async function CreateLogout() {
  const cookieStore = await cookies();
  cookieStore.delete("userid");
  redirect("/public/login");
}

export async function insertImage(image: File): Promise<number> {
  const buffer = Buffer.from(await image.arrayBuffer());
  const type = image.type;

  const [insertedImage] = await db
    .insert(images)
    .values({
      image: buffer,
      imageType: type,
    })
    .returning({ id: images.id });

  return insertedImage.id;
}
