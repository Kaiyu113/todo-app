import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../actions';

export const InputTodo = () => {
  const [textContent, setTextContent] = useState('');
  const dispatch = useDispatch();
  const textInputRef = useRef(null);

  const handleAddTodo = () => {
    if (!textContent.trim()) {
      setTextContent('');
      textInputRef.current.focus();
      return;
    }

    addTodo(dispatch)(textContent);
    setTextContent('');
    textInputRef.current.focus();
  };

  return (
    <div>
      <input
        type='text'
        onChange={(e) => setTextContent(e.target.value)}
        value={textContent}
        placeholder='Input your todo'
        ref={textInputRef}
      />
      <button onClick={handleAddTodo} data-testid='add-todo-btn'>
        Add
      </button>
    </div>
  );
};
