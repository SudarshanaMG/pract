import { useInfiniteQuery } from "@tanstack/react-query";

const PAGE_SIZE = 10;
export function usePaginatedPosts() {
    return useInfiniteQuery({
        queryKey: ["posts"],
        queryFn: async ({ pageParam = 1}) => {
            const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${PAGE_SIZE}&_page=${pageParam}`);
            const data = await res.json();
            return { data, nextPage: pageParam + 1, isLast: data.length < PAGE_SIZE };
        },
        getNextPageParam: (lastPage) => lastPage.isLast ? undefined : lastPage.nextPage,
    });
}