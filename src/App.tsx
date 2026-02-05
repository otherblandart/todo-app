import React from 'react';

import styles from './App.module.scss';
import NewTodo from './components/NewTodo';
import TodoItem from './components/TodoItem';
import useTodoStore from './stores/todoStore';

const App: React.FC = () => {
  const todos = useTodoStore((state) => state.todos);

  return (
    <div className={styles.app}>
      <h1>Todo List with Vite, React, and Zustand</h1>
      <NewTodo />
      <ul>
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </div>
  );
};

export default App;
