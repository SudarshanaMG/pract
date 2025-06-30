import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AddTodoForm from "./components/AddTodoForm"
import TodoList from "./components/TodoList"


function App() {

  return (
    <>
      <main className='p-6 max-w-xl mx-auto'>
        <h1 className='text-2xl font-bold mb-4' >Redux Todo Manager</h1>
        <AddTodoForm />
        <TodoList />
      </main>
    </>
  )
}

export default App
