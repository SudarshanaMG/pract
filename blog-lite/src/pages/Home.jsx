
import { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { usePosts } from "../hooks/usePosts";
import { usePaginatedPosts } from "../hooks/usePaginatedPosts";
import { usePaginatedPostsPage } from "../hooks/usePaginatedPostsPage";
import { motion, AnimatePresence } from "framer-motion"

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const initialPage = parseInt(searchParams.get("page")) || 1;
  const [page, setPage] = useState(initialPage);
  const loaderRef = useRef();

    // const {
    //     data,
    //     isLoading,
    //     isError,
    //     isFetching,
    //     } = usePaginatedPostsPage(page);
    
    const {
      data,
      isLoading,
      isError,
      fetchNextPage,
      hasNextPage,
      isFetchingNextPage,
    } = usePaginatedPosts();

    // useEffect(() => {
    //   setSearchParams({ page });
    // }, [page]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if(entries[0].isIntersecting && hasNextPage && !isFetchingNextPage){
          fetchNextPage();
        }
      },
      { threshold: 1.0 }
    );
    if(loaderRef.current) observer.observe(loaderRef.current);
    return () => loaderRef.current && observer.observe(loaderRef.current);
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);


  const posts = data?.pages.flatMap((page) => page.data) || [];

  const filteredPost = posts.filter((post) => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // const filteredPost = data?.data.filter((post) => 
  //   post.title.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  return (
    <>
    <ul className="space-y-3">
      <input type="text"
        placeholder="Search posts by title..." 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value) }
        className="w-full px-4 py-2 border border-gray-300 rounded dark:bg-gray-800 dark:border-gray-700 dark:text-white"
      />

      {/* { isLoading && <p className="text-gray-500">Loading posts...</p>}
      { isError && <p className="text-red-500">Failed to load posts.</p>}
      {!isError && !isLoading && filteredPost?.length === 0 && (
        <p className="text-yellow-600">No posts match your search</p>
      )} */}

      {isLoading && (
        <ul className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <li key={i} className="animate-pulse border border-gray-200 dark:border-gray-700 p-4 rounded">
              <div className="h-6 bg-gray-300 dark:bg-gray-600 w-2/3 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 w-full rounded"></div>
            </li>
          ))}
        </ul>
      )}

      {isError && <p className="text-red-500">Failed to load posts.</p>}

      {!isError && !isLoading && filteredPost.length === 0 && (
        <p className="text-yellow-600">No posts match your search.</p>
      )}

      {/* {filteredPost?.map((post) => (
        <li key={post.id}>
          <Link
            to={`/posts/${post.id}`}
            className="block p-4 border border-gray-300 rounded hover:bg-gray-200 transition"
          >
            {post.title}
          </Link>
        </li>
      ))} */}
    </ul> 

    <ul className="space-y-4 py-4">
        <AnimatePresence>
          {filteredPost.map((post) => (
            <motion.li
              key={post.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="border border-gray-200 p-4 rounded hover:shadow-md dark:border-gray-700"
            >
              <Link
                to={`/posts/${post.id}`}
                className="text-l font-semibold text-gray-800 dark:text-blue-400 hover:underline"
              >
                {post.title}
              </Link>
            </motion.li>
          ))}
        </AnimatePresence>

        {isFetchingNextPage &&
          Array.from({ length: 2 }).map((_, i) => (
            <li
              key={`loading-${i}`}
              className="animate-pulse border border-gray-200 dark:border-gray-700 p-4 rounded"
            >
              <div className="h-6 bg-gray-300 dark:bg-gray-600 w-2/3 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 w-full rounded"></div>
            </li>
          ))}
      </ul>

      <div ref={loaderRef} className="h-12 flex items-center justify-center">
        {!hasNextPage && <p className="text-gray-500">No more posts.</p>}
      </div>

    {/* { hasNextPage && (
      <div className="text-center">
        <button 
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
          className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
          {isFetchingNextPage ? "Loading" : "Load More"}
        </button>
      </div>
    )} */}

      {/* <div className="flex justify-center mt-8 gap-2 flex-wrap">
        <button 
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
          className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white disabled:opacity-40"
          >← Prev</button>

        {Array.from({ length: data?.totalPages || 0}).map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`px-3 py-1 rounded ${
              page === i + 1
                ? "bg-blue-600 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white"
            }`}
            >{i + 1}</button>
        ))}
        <button
          onClick={() => setPage((p) => Math.min(p + 1, data.totalPages || p))}
          disabled={page === data?.totalPages}
          className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white disabled:opacity-40"
        >Next →</button>
      </div> */}

      {/* {isFetching && <p className="text-sm text-gray-500 text-center">Loading page {page}...</p>} */}

      {/* <div ref={loaderRef} className="h-12 flex items-center justify-center">
        {isFetchingNextPage && <p className="text-gray-400">Loading...</p>}
        {!hasNextPage && <p className="text-gray-500">No more posts.</p>}
      </div> */}
    </>
  );

}