import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function NewPost() {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const navigate = useNavigate();
    const queryClient = useQueryClient();

 const mutation = useMutation({
    mutationFn: async (newPost) => {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPost),
      });
      return res.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      navigate(`/posts/${data.id}`);
    },
  });

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