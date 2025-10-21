import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../lib/supabaseClient";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // 🔹 GET: 게시글 전체 조회
  if (req.method === "GET") {
    try {
      const { type } = req.query; // type=sell 또는 type=buy

      let query = supabase
        .from("posts")
        .select("*")
        .eq("status", "active")
        .order("created_at", { ascending: false });

      if (type === "sell") {
        query = query.eq("transaction_type", "sale");
      } else if (type === "buy") {
        query = query.eq("transaction_type", "purchase");
      }

      const { data, error } = await query;
      if (error) throw error;
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({ message: "Failed to fetch posts", error });
    }
  }

  // 🔹 POST: 게시글 생성
  if (req.method === "POST") {
    try {
      const { title, content, author_id, medium_category_id } = req.body;

      const { data, error } = await supabase
        .from("posts")
        .insert([{ title, content, author_id, medium_category_id }])
        .select()
        .single();

      if (error) throw error;
      return res.status(201).json(data);
    } catch (error) {
      return res.status(400).json({ message: "Error creating post", error });
    }
  }

  // 🔹 PUT: 게시글 수정
  if (req.method === "PUT") {
    try {
      const { id } = req.query; // /api/posts?id=게시글ID
      const { title, content, medium_category_id, status } = req.body;

      const { data, error } = await supabase
        .from("posts")
        .update({ title, content, medium_category_id, status })
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      if (!data) return res.status(404).json({ message: "Post not found" });

      return res.status(200).json(data);
    } catch (error) {
      return res.status(400).json({ message: "Error updating post", error });
    }
  }

  // 🔹 DELETE: 게시글 삭제 (Soft Delete)
  if (req.method === "DELETE") {
    try {
      const { id } = req.query;

      const { data, error } = await supabase
        .from("posts")
        .update({ status: "deleted" })
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      if (!data) return res.status(404).json({ message: "Post not found" });

      return res.status(200).json({ message: "Post deleted successfully", post: data });
    } catch (error) {
      return res.status(400).json({ message: "Error deleting post", error });
    }
  }

  // 허용되지 않은 메서드
  return res.status(405).json({ message: "Method Not Allowed" });
}
