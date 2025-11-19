"use server";

import { cookies, headers } from "next/headers";
import db from "./lib/db/db";
import { redirect } from "next/navigation";

export async function CreateSignUpForm(prevFormState: any, formData: FormData) {
  const name = formData.get("name")?.toString();
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const confirmPassword = formData.get("confirmPassword")?.toString();

  if (password !== confirmPassword) {
    return {
      success: false,
      error: "Invalid email or password",
    };
  }

  try {
    const insert = db.prepare(
      "INSERT INTO user(name,email,password) VALUES(?,?,?)"
    );
    const result = insert.run(name, email, password);

    if (result.lastInsertRowid) {
      return {
        success: true,
        error: "",
      };
    }
    return {
      success: false,
      error: "Something went wrong!",
    };
  } catch (err) {
    console.error(err);
    return {
      success: false,
      error: "Database error!",
    };
  }
}

export async function CreateLoginForm(prevFormState: any, formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");

  if (!email || !password) {
    return { success: false, error: "Email and password are required" };
  }

  const query = db.prepare("SELECT * FROM user WHERE email = ?");
  const user = query.get(email);

  if (!user || user.password !== password) {
    return { success: false, error: "Invalid email or password" };
  }

  console.log("creating auth cookie", user);
  const cookieStore = await cookies();
  cookieStore.set("userid", user.name);
  console.log("auth cookie");
  // return { success: true, error: "" };

  return redirect("/dashboard");
}

export async function CreateLogout() {
  const cookieStore = await cookies();
  cookieStore.delete("userid");

  // return { success: true, error: "" };
  redirect("/dashboard/loginForm");
}

export async function insertImage(image: File): Promise<number> {
  const imageBuffer = Buffer.from(await image.arrayBuffer());
  const imageType = image.type;

  const imageInsert = db.prepare(
    "INSERT INTO images (image, imageType) VALUES (?, ?)"
  );
  const result = imageInsert.run(imageBuffer, imageType);

  return result.lastInsertRowid;
}
