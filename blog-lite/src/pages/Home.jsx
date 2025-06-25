import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

export default function Home() {
    const {
        data: posts,
        isLoading,
        isError,
        } = useQuery({
            queryKey: ['posts'], 
            queryFn: () => 
            fetch('https://jsonplaceholder.typicode.com/posts').then((res) => res.json())
        });
    
  if (isLoading) return <p className="text-gray-600">Loading posts…</p>;
  if (isError) return <p className="text-red-500">Failed to load posts.</p>;

  return (
    <ul className="space-y-3">
      {posts.slice(0, 20).map((post) => (
        <li key={post.id}>
          <Link
            to={`/posts/${post.id}`}
            className="block p-4 border border-gray-300 rounded hover:bg-gray-200 transition"
          >
            {post.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}