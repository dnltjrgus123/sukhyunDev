import { useEffect, useState } from "react";
import PostList from "../components/PostList";
import { supabase } from "../lib/supabaseClient";

export default function BuyPost() {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("status", "active")
        .eq("transaction_type", "purchase")
        .order("created_at", { ascending: false });

      if (!error) setPosts(data);
    };
    fetchPosts();
  }, []);

  return (
    <div>
      <h1>구매 게시글 목록</h1>
      <PostList posts={posts} />
    </div>
  );
}
