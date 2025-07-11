import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=10");
    return await res.json();
});

const todosSlice = createSlice({
    name: "todos",
    initialState: {
        items: [],
        loading: false,
        error: null,
    },
    reducers: {
        addTodo: (state, action) => {
            state.items.push({
                id: Date.now(),
                title: action.payload,
                completed: false,
            });
        },
        toggleTodo: (state, action) => {
            const todo = state.items.find((t) => t.id === action.payload);
            if(todo) todo.completed = !todo.completed;
        },
        deleteTodo: (state, action) => {
            state.items = state.items.filter((t) => t.id !== action.payload);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTodos.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchTodos.fulfilled, (state, action) => {
            state.loading = false;
            state.items = action.payload;
        })
        .addCase(fetchTodos.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    },
});

export const { addTodo, toggleTodo, deleteTodo } = todosSlice.actions;
export default todosSlice.reducer;