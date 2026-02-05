import clsx from 'clsx';
import React from 'react';

import useTodoStore from '../stores/todoStore';
import type { Todo } from '../types';

import styles from './TodoItem.module.scss';

interface TodoItemProps {
  todo: Todo;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const toggleTodo = useTodoStore((state) => state.toggleTodo);
  const removeTodo = useTodoStore((state) => state.removeTodo);

  return (
    <li className={clsx(styles.todoItem)}>
      <label className={clsx(todo.completed && styles.completed)}>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleTodo(todo.id)}
        />
        {todo.text}
      </label>
      <button
        className={styles.deleteButton}
        onClick={() => removeTodo(todo.id)}
      >
        &times;
      </button>
    </li>
  );
};

export default TodoItem;
