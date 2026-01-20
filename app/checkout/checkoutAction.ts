"use server";
import { db } from "@/app/lib/db/database";
import { checkoutSessions } from "@/supabase/migrations/schema";
import { getUserIdFromCookie } from "@/app/lib/getUserId";
import { redirect } from "next/navigation";

export async function submitCheckout(formData: FormData) {
  const userId = await getUserIdFromCookie();
  if (!userId) throw new Error("Not logged in");

  const fullName = formData.get("fullName") as string;
  const address = formData.get("address") as string;
  const postcode = formData.get("postcode") as string;
  const phone = formData.get("phone") as string;

  if (!fullName || !address || !postcode || !phone) {
    throw new Error("All fields are required");
  }

  await db.insert(checkoutSessions).values({
    userId,
    fullName,
    address,
    postcode,
    phone,
  });

  redirect("/checkout/payment");
}
