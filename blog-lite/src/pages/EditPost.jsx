import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { usePost } from "../hooks/usePost";
import { useEditPost } from "../hooks/useEditPost";

export default function EditPost() {
    const { id } = useParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { data: post, isLoading, isError } = usePost(id);

    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");

    useEffect(() => {
        if(post){
            setTitle(post.title);
            setBody(post.body);
        }
    }, [post]);

    const mutation = useEditPost(id, (data) => navigate(`/posts/${id}`));

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!title.trim() || !body.trim()) alert("Both feilds are required.");
        mutation.mutate({ id, title, body });
    };

    if(isLoading) <p className="text-gray-600">Loading post...</p>
    if(isError) <p className="text-red-600">Failed to load post.</p>

    return (
        <section className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg border border-gray-100">
  <div className="mb-8">
    <h2 className="text-3xl font-bold text-gray-900 mb-2">Edit Post</h2>
    <p className="text-gray-600">Make changes to your post below</p>
  </div>

  <form onSubmit={handleSubmit} className="space-y-6">
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-gray-700">
        Title
      </label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
        placeholder="Enter your post title..."
        required
      />
    </div>

    <div className="space-y-2">
      <label className="block text-sm font-semibold text-gray-700">
        Content
      </label>
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400 resize-none"
        placeholder="Write your post content here..."
        rows="8"
        required
      ></textarea>
    </div>

    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
      <div className="flex items-center space-x-2">
        {mutation.isError && (
          <div className="flex items-center space-x-2 text-red-600">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <p className="text-sm font-medium">Failed to save changes</p>
          </div>
        )}
      </div>
      
      <button
        type="submit"
        className={`
          px-8 py-3 rounded-lg font-semibold text-white transition-all duration-200 
          ${mutation.isPending 
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 hover:shadow-lg hover:scale-105 active:scale-95'
          }
        `}
        disabled={mutation.isPending}
      >
        {mutation.isPending ? (
          <div className="flex items-center space-x-2">
            <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Saving...</span>
          </div>
        ) : (
          "Save Changes"
        )}
      </button>
    </div>
  </form>
</section>
    );
}
