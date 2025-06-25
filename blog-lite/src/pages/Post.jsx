import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "react-router-dom";

export default function Post() {
    const { id } = useParams();
    const {
        data:post,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ['post', id], 
        queryFn: () => 
        fetch(`https://jsonplaceholder.typicode.com/posts/${id}`).then((res) => res.json())
    });

  if (isLoading) return <p className="text-gray-600">Loading post…</p>;
  if (isError) return <p className="text-red-500">Could not load post.</p>;
  if (!post?.id) return <p className="text-yellow-600">Post not found.</p>;

  return (
    <article className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-800">{post.title}</h2>
      <p className="text-gray-700 leading-relaxed">{post.body}</p>
      <Link to="/" className="text-blue-600 hover:underline">← Back to Home</Link>
    </article>
  );
}