
import Link from 'next/link';

type Post = {
  id: string | number;
  title?: string;
  // status 등 다른 필드가 있어도 괜찮습니다.
};

export default function PostList({ posts }: { posts?: unknown }) {
  // 1) posts가 배열인지 확인하고 정제
  const safePosts: Post[] = Array.isArray(posts)
    ? (posts.filter(Boolean) as Post[])
    : [];

  // 2) 비어 있으면 안전한 메시지
  if (safePosts.length === 0) {
    return <div>게시물이 아직 없습니다.</div>;
  }

  return (
    <ul>
      {safePosts.map((post) => {
        const id = post?.id;
        const title = post?.title ?? '제목 없음';
        // id가 없으면 key/링크가 깨질 수 있으니 폴백 처리
        const href = id ? `/posts/${id}` : '#';

        return (
          <li key={String(id ?? Math.random())}>
            {id ? (
              <Link href={href}>{title}</Link>
            ) : (
              <span>{title}</span>
            )}
          </li>
        );
      })}
    </ul>
  );
}
