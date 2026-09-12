"use server";

import { revalidatePath } from "next/cache";
import { createClient, getCurrentUser } from "@/lib/supabase/server";

export interface ProfileFormState {
  error: string | null;
  success: boolean;
}

export async function updateProfile(
  _prevState: ProfileFormState,
  formData: FormData
): Promise<ProfileFormState> {
  const fullName = String(formData.get("fullName") ?? "").trim();
  if (!fullName) {
    return { error: "Enter your name.", success: false };
  }

  const user = await getCurrentUser();
  if (!user) {
    return { error: "Your session expired — sign in again.", success: false };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("profiles").update({ full_name: fullName }).eq("id", user.id);
  if (error) {
    return { error: error.message, success: false };
  }

  revalidatePath("/account");
  return { error: null, success: true };
}
