"use server";

import db from "../lib/sqlite/db";

export async function CreateSignUpForm(prevFormState: any, formData: FormData) {
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");

  const insert = db.prepare(
    "INSERT INTO user(name,email,password) VALUES(?,?,?)"
  );
  console.log("name", name);
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

  return { success: true, error: "" };
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
