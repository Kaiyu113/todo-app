import { TodoItem } from './TodoItem';
import { useSelector } from 'react-redux';
export const TodoList = () => {
  const todoLists = useSelector((state) => state);
  return (
    <ul>
      {todoLists.map(({ content, isCompleted, id }) => {
        return (
          <TodoItem
            key={id}
            content={content}
            isCompletd={isCompleted}
            id={id}
          />
        );
      })}
    </ul>
  );
};
