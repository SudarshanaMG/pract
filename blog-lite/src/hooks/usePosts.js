import { useQuery } from "@tanstack/react-query";

export function usePosts() {
    return useQuery({
        queryKey: ["posts"],
        queryFn: () => fetch(`https://jsonplaceholder.typicode.com/posts`).then((r) => r.json()),
    });
}