import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../lib/supabaseClient";
import bcrypt from "bcrypt";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ message: "Method not allowed" });

  try {
    const { user_no, register_no, name, email, password, phone } = req.body;

    // 비밀번호 해시
    const hashedPassword = await bcrypt.hash(password, 10);

    const { data, error } = await supabase
      .from("users")
      .insert([{ user_no, register_no, name, email, password: hashedPassword, phone }])
      .select()
      .single();

    if (error) throw error;

    res.status(201).json({ message: "User created", user: data });
  } catch (error: any) {
    res.status(400).json({ message: "Signup failed", error: error.message });
  }
}
