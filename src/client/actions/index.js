//change our sync action to async action
// import { todoApi } from '../api/api';
import { generateAjaxConfig } from '../helper/index';

//fetch(url)
export const initTodo = (dispatch) => async () => {
  try {
    //const result = await todoApi.getAllTodos();
    const response = await fetch('/allTodos');
    const result = await response.json();
    console.log(result);
    dispatch({
      type: 'INIT',
      payload: result,
    });
  } catch (e) {
    console.log(e);
  }
};

export const addTodo = (dispatch) => async (content) => {
  try {
    const response = await fetch(
      '/addTodo',
      generateAjaxConfig({
        content,
        isCompleted: false,
      })
    );
    const { newTodo } = await response.json();
    console.log(newTodo);
    dispatch({
      type: 'ADD',
      payload: newTodo,
    });
  } catch (e) {
    console.log(e);
  }
};

export const modTodo = (dispatch) => async (id) => {
  try {
    //const result = await todoApi.modTodo(index);
    const response = await fetch(
      '/modTodo',
      generateAjaxConfig({
        id,
      })
    );
    const result = await response.json();
    console.log(result);
    dispatch({
      type: 'MOD',
      payload: id,
    });
  } catch (e) {
    console.log(e);
  }
};

export const delTodo = (dispatch) => async (id) => {
  try {
    //const result = await todoApi.delTodo(index);
    const response = await fetch(
      '/delTodo',
      generateAjaxConfig({
        id,
      })
    );
    const result = await response.json();
    console.log(result);
    dispatch({
      type: 'DEL',
      payload: id,
    });
  } catch (e) {
    console.log(e);
  }
};
