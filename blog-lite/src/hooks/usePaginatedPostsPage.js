import { useQuery } from "@tanstack/react-query";

const PAGE_SIZE = 10;
export function usePaginatedPostsPage(page) {
    return useQuery({
        queryKey: ["posts", page],
        queryFn: async () => {
            const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${PAGE_SIZE}&_page=${page}`);
            const total = 100;
            const data = await res.json();
            return { data, totalPages: Math.ceil(total / PAGE_SIZE)};
        },
        keepPreviousData: true,
    });
}