import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../store/todosSlice";

export default function AddTodoForm() {
    const [text, setText] = useState("");
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!text.trim()) return;
        dispatch(addTodo(text));
        setText("");
    }

    return (
        <form onSubmit={handleSubmit} className="space-x-2">
            <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Add todo..." className="border px-2 py-1 rounded"/>
            <button type="submit" className="bg-blue-500 text-white px-4 py-1 rounded">Add</button>
        </form>
    );
}