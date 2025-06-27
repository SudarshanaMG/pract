import { useQuery } from "@tanstack/react-query";
import { useParams, Link, useNavigate } from "react-router-dom";
import { usePost } from "../hooks/usePost";
import { useComment } from "../hooks/useComment";
import { useDeletePost } from "../hooks/useDeletePost";


export default function Post() {
    const { id } = useParams();
    const navigate = useNavigate();
    const {
        data:post,
        isLoading,
        isError,
    } = usePost(id);

        const {
        data:comments,
        isLoading: commentsLoading,
        isError: commentsError,
    } = useComment(id);

    const deleteMutation = useDeletePost(id, () => navigate("/"));

  if (isLoading) return <p className="text-gray-600">Loading post…</p>;
  if (isError) return <p className="text-red-500">Could not load post.</p>;
  if (!post?.id) return <p className="text-yellow-600">Post not found.</p>;

  return (
    // <article className="space-y-4">
    //   <h2 className="text-2xl font-bold text-gray-800">{post.title}</h2>
    //   <p className="text-gray-700 leading-relaxed">{post.body}</p>
    //   <button type="button" class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Delete</button><br /><br />
    //   <Link to="/" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">← Back to Home</Link>
    // </article>
    
      <>
    <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{post.title}</h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{post.body}</p>
        <div className="flex justify-between">
          <Link to={`/posts/${post.id}/edit`}
          className="text-white bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-yellow-300 dark:focus:ring-yellow-800 shadow-lg shadow-yellow-500/50 dark:shadow-lg dark:shadow-yellow-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >Edit</Link>
          <button type="button" 
          onClick={() => {if(confirm('Are you sure you want to delete this post?')){
            deleteMutation.mutate();
          }
          }}
          className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Delete</button>
          <Link to="/" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">← Back to Home</Link>
        </div>
    </div>

          <section className="mt-10">
        <h3 className="text-xl font-semibold mb-4">💬 Comments</h3>

        {commentsLoading && <p className="text-gray-500">Loading comments…</p>}
        {commentsError && <p className="text-red-500">Failed to load comments.</p>}

        <ul className="space-y-4">
          {comments?.map((comment) => (
            <li key={comment.id} className="border border-gray-200 dark:border-gray-700 p-4 rounded">
              <h4 className="font-bold text-gray-800 dark:text-white">{comment.name}</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">{comment.email}</p>
              <p className="mt-2 text-gray-700 dark:text-gray-200">{comment.body}</p>
            </li>
          ))}
        </ul>
      </section>
</>

  );
}