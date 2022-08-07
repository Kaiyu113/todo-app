import { useDispatch } from 'react-redux';
import { delTodo, modTodo } from '../actions';
import '../styles/todo-item.css';

export const TodoItem = ({ content, isCompletd, id }) => {
  const dispatch = useDispatch();

  return (
    <li className='one-todo' data-testid={`${content}-${id}`}>
      <span
        className={
          isCompletd
            ? 'todo-text-content-completed'
            : 'todo-text-content-imcompleted'
        }
        onDoubleClick={() => {
          modTodo(dispatch)(id);
        }}
      >
        {content}
      </span>
      <button
        onClick={() => {
          delTodo(dispatch)(id);
        }}
      >
        Delete Todo
      </button>
    </li>
  );
};
