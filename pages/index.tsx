import Link from 'next/link';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import PostList from '../components/PostList';

export default function Home() {
  const [recentSellPosts, setRecentSellPosts] = useState<any[]>([]);
  const [recentBuyPosts, setRecentBuyPosts] = useState<any[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      // 최근 판매 게시글 5개
      const { data: sellData, error: sellError } = await supabase
        .from('posts')
        .select('*')
        .eq('status', 'active')
        .eq('transaction_type', 'sale')
        .order('created_at', { ascending: false })
        .limit(5);

      if (!sellError && sellData) setRecentSellPosts(sellData);

      // 최근 구매 게시글 5개
      const { data: buyData, error: buyError } = await supabase
        .from('posts')
        .select('*')
        .eq('status', 'active')
        .eq('transaction_type', 'purchase')
        .order('created_at', { ascending: false })
        .limit(5);

      if (!buyError && buyData) setRecentBuyPosts(buyData);
    };

    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 gap-10">
      <h1 className="text-4xl font-bold mb-6">🚀 Game Marketplace</h1>

      {/* 상단 버튼 */}
      <div className="flex gap-4 mb-10">
        <Link href="/sale" className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600">
          판매 게시글
        </Link>
        <Link href="/purchase" className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600">
          구매 게시글
        </Link>
        <Link href="/login" className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600">
          로그인
        </Link>
        <Link href="/signup" className="bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-600">
          회원가입
        </Link>
      </div>

      {/* 최근 판매 게시글 */}
      <div className="w-full max-w-3xl">
        <h2 className="text-2xl font-semibold mb-4">최근 판매 게시글</h2>
        <PostList posts={recentSellPosts} />
        <Link href="/sellpost" className="text-blue-500 mt-2 inline-block">
          더보기 →
        </Link>
      </div>

      {/* 최근 구매 게시글 */}
      <div className="w-full max-w-3xl">
        <h2 className="text-2xl font-semibold mb-4">최근 구매 게시글</h2>
        <PostList posts={recentBuyPosts} />
        <Link href="/buypost" className="text-green-500 mt-2 inline-block">
          더보기 →
        </Link>
      </div>
    </div>
  );
}
