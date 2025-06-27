import { useQuery } from "@tanstack/react-query";

export function useComment(id) {
    return useQuery({
        queryKey: ["comments", id],
        queryFn: () => fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`).then((r) => r.json()),
        enabled: !!id,
    });
}