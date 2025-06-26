import { useEffect, useState } from 'react'
import './App.css'
import Home from './pages/Home'
import Post from './pages/Post'
import NotFound from './pages/NotFound'
import { Routes, Route, NavLink } from 'react-router-dom'
import NewPost from './pages/NewPost'
import EditPost from './pages/EditPost'
import './index.css'

export default function App() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    // localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <>
      <header className="flex justify-between items-center px-6 py-4 bg-gray-900 text-white dark:bg-gray-100">
        <h1 className="text-2xl font-bold">Blog-Lite</h1>
        <div className="flex items-center gap-4">
          <nav className="space-x-4">
            <NavLink to="/" end className={({ isActive }) => isActive ? "underline font-semibold" : "hover:opacity-80"}>Home</NavLink>
            <NavLink to="/new" className={({ isActive }) => isActive ? "underline font-semibold" : "hover:opacity-80"}>New Post</NavLink>
          </nav>
          <button
            onClick={() => setDark(!dark)}
            className="ml-4 px-3 py-1 text-sm rounded bg-white text-gray-900 dark:bg-gray-700 dark:text-white border"
          >
            {dark ? "☀️ Light" : "🌙 Dark"}
          </button>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8 dark:text-white dark:bg-gray-900 min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new" element={<NewPost />} />
          <Route path="posts/:id" element={<Post />} />
          <Route path='posts/:id/edit' element={<EditPost />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
}
