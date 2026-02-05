import { create } from 'zustand';

import type { Todo } from '../types';
import { generateGuid } from '../utils/guid';



// Store state and actions
interface TodoStore {
  todos: Todo[];
  addTodo: (text: string) => void;
  toggleTodo: (id: string) => void;
  removeTodo: (id: string) => void;
}

const useTodoStore = create<TodoStore>((set) => ({
  // initial
  todos: [
    { id: generateGuid(), text: 'Make a plan', completed: false },
    { id: generateGuid(), text: 'Execute on it', completed: false },
    { id: generateGuid(), text: 'Reap the rewards', completed: false },
  ],

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
