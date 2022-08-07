import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { TodoHeader } from "./components/TodoHeader";
import { InputTodo } from "./components/InputTodo";
import { TodoList } from "./components/TodoList";
import { initTodo } from "./actions/index";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    initTodo(dispatch)();
  }, [dispatch]);

  return (
    <>
      <TodoHeader headerContent={"Todo"} />
      <InputTodo />
      <TodoList />
    </>
  );
}

export default App;
