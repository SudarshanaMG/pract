
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreatePost } from "../hooks/useCreatePost";

export default function NewPost() {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const navigate = useNavigate();

 const mutation = useCreatePost((data) => navigate(`/posts/${data.id}`));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) return alert("Both fields required");
    mutation.mutate({ title, body });
  };
  
    return (
        <section className="space-y-6">
      <h2 className="text-2xl font-bold">New Post</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Body</label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="w-full px-4 py-2 border rounded min-h-[100px]"
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? "Posting..." : "Post It"}
        </button>
      </form>

      {mutation.isError && <p className="text-red-500">Failed to post. Try again.</p>}
    </section>
    );
}