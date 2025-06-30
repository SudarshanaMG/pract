import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchTodos, toggleTodo, deleteTodo } from "../store/todosSlice"

export default function TodoList() {
    const { items, loading, error } = useSelector((state) => state.todos);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTodos());
    }, [dispatch]);

    if(loading) return <p>Loading todos...</p>;
    if(error) return <p>Error: {error}</p>;

    return (
        <ul className="space-y-2 mt-4">
            {items.map((todo) => (
                <li key={todo.id} className="flex justify-between items-center border p-2 rounded">
                    <span 
                    className={`cursor-pointer ${todo.completed ? "line-through text-gray-500" : ""}`}
                    onClick={() => dispatch(toggleTodo(todo.id))}
                    >{todo.title}</span>
                    <button onClick={() => dispatch(deleteTodo(todo.id))} className=" cursor-pointer text-red-600 font-bold">X</button>
                </li>
            ))}
        </ul>
    );
}