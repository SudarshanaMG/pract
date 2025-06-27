import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreatePost(onSuccess) {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (newPost) => {
            const res = await fetch(`https://jsonplaceholder.typicode.com/posts`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newPost),
            });
            return res.json();
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["posts"] });
            if(onSuccess) onSuccess(data);
        }       
    });
}