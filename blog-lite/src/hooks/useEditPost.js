import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useEditPost(id, onSuccess) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (updatedPost) => {
            const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedPost),
            });
            return res.json();
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["post", id]});
            if(onSuccess) onSuccess(data);
        }
    });
}