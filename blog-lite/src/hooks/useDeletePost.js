import { useMutation, useQueryClient } from "@tanstack/react-query"

export function useDeletePost(id, onSuccess) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: () => {
            fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
                method: "DELETE",
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["posts"] });
            if(onSuccess) onSuccess();
        },
    });
}