"use server";
import { redirect } from "next/navigation";
import db from "./lib/sqlite/db";

export async function CreateSignUpForm(prevFormState: any, formData: FormData) {
  const name = formData.get("name");
  const email = formData.get("email");
  const phoneNumber = formData.get("phoneNumber");

  const insert = db.prepare(
    "INSERT INTO signUp(name,email,phoneNumber) VALUES(?,?,?)"
  );
  console.log("name", name);
  const result = insert.run(name, email, phoneNumber);

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

export async function insertImage(image: File): Promise<number> {
  const imageBuffer = Buffer.from(await image.arrayBuffer());
  const imageType = image.type;

  const imageInsert = db.prepare(
    "INSERT INTO images (image, imageType) VALUES (?, ?)"
  );
  const result = imageInsert.run(imageBuffer, imageType);

  return result.lastInsertRowid;
}

export async function CreateLoginForm(prevFormState: any, formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");

  if (!email || !password) {
    return { success: false, error: "Email and password are required" };
  }

  const insert = db.prepare("INSERT INTO login(email,password) VALUES(?,?)");
  const result = insert.run(email, password);
  //  console.log("result",result)
  if (result.lastInsertRowid) {
    return { success: true, error: "!!" };
  }

  redirect("/dashboard")
  return { success: false, error: "Something went wrong!" };
}
