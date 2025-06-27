import { useQuery } from "@tanstack/react-query";

export function usePost(id) {
    return useQuery({
        queryKey: ["post", id],
        queryFn: () => fetch(`https://jsonplaceholder.typicode.com/posts/${id}`).then((r) => r.json()),
        enabled: !!id,
    });
}