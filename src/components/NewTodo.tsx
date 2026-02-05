import React, { useState } from 'react';

import useTodoStore from '../stores/todoStore';

import styles from './NewTodo.module.scss';

const NewTodo: React.FC = () => {
  const [text, setText] = useState('');
  const addTodo = useTodoStore((state) => state.addTodo);
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      addTodo(text.trim());
      setText('');
    }
  };
  return (
    <form onSubmit={handleSubmit} className={styles.newTodoForm}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new todo"
        ref={inputRef}
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default NewTodo;
