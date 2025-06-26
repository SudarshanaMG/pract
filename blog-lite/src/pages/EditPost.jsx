import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditPost() {
    const { id } = useParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { data: post, isLoading, isError } = useQuery({
        queryKey: ["post", id],
        queryFn: () =>  fetch(`https://jsonplaceholder.typicode.com/posts/${id}`).then((res) => res.json()),
    });

    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");

    useEffect(() => {
        if(post){
            setTitle(post.title);
            setBody(post.body);
        }
    }, [post]);

    const mutation = useMutation({
        mutationFn: async (updatedPost) => {
            const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(updatedPost),
            });
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryFn: ["post",  id] });
            navigate(`/posts/${id}`);
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!title.trim() || !body.trim()) alert("Both feilds are required.");
        mutation.mutate({ id, title, body });
    };

    if(isLoading) <p className="text-gray-600">Loading post...</p>
    if(isError) <p className="text-red-600">Failed to load post.</p>

    return (
        <>
        <section className="space-y-6">
            <h2 className="text-2xl font-bold">Edit Post</h2>

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
              {mutation.isPending ? "Saving..." : "Save Changes"}
            </button>
        </form>
            {mutation.isError && <p className="text-red-500">Failed to save changes.</p>}
        </section>
        </>
    );
}