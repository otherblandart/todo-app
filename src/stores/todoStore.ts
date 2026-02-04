import { create } from 'zustand';

import { generateGuid } from '../utils/guid';

// Define Todo shape
type Todo = {
  id: string;
  text: string;
  completed: boolean;
};

// Store state and actions
interface TodoStore {
  todos: Todo[];
  addTodo: (text: string) => void;
  toggleTodo: (id: string) => void;
  removeTodo: (id: string) => void;
}

const useTodoStore = create<TodoStore>((set) => ({
  // initial
  todos: [],

  // actions
  addTodo: (text) =>
    set((state) => ({
      todos: [...state.todos, { id: generateGuid(), text, completed: false }],
    })),

  toggleTodo: (id) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    })),

  removeTodo: (id) =>
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
    })),
}));

export default useTodoStore;
