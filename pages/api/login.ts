import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../lib/supabaseClient";
import bcrypt from "bcrypt";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ message: "Method not allowed" });

  try {
    const { email, password } = req.body;

    const { data: user, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

    if (error || !user) return res.status(401).json({ message: "Invalid email or password" });

    // 비밀번호 확인
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: "Invalid email or password" });

    // 로그인 성공 → 세션 또는 토큰 생성 (여기서는 간단히 사용자 반환)
    res.status(200).json({ message: "Login successful", user });
  } catch (error: any) {
    res.status(500).json({ message: "Login failed", error: error.message });
  }
}
