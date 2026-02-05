import React, { useMemo, useState } from 'react';

import styles from './App.module.scss';
import NewTodo from './components/NewTodo';
import TodoItem from './components/TodoItem';
import useTodoStore from './stores/todoStore';

const App: React.FC = () => {
  const todos = useTodoStore((state) => state.todos);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  const filteredTodos = useMemo(() => {
    if (filter === 'all') return todos;
    if (filter === 'active') return todos.filter((t) => !t.completed);
    return todos.filter((t) => t.completed);
  }, [todos, filter]);

  return (
    <div className={styles.app}>
      <h1>Todo List with Vite, React, and Zustand</h1>
      <NewTodo />
      <ul>
        {filteredTodos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>

      <div className={styles.filters}>
        <button
          className={`${styles.filterButton} ${filter === 'all' ? styles.selected : ''}`}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button
          className={`${styles.filterButton} ${filter === 'active' ? styles.selected : ''}`}
          onClick={() => setFilter('active')}
        >
          Active
        </button>
        <button
          className={`${styles.filterButton} ${filter === 'completed' ? styles.selected : ''}`}
          onClick={() => setFilter('completed')}
        >
          Completed
        </button>
      </div>
    </div>
  );
};

export default App;
