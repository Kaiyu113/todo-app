import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import App from './App';

describe('With React testing libary and redux mock store', () => {
  const initState = [];
  const mockStore = configureStore();
  let store;

  it('Input field is rendered correctly', () => {
    store = mockStore(initState);
    const { getByPlaceholderText } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(getByPlaceholderText('Input your todo')).toBeInTheDocument();
  });

  it('Button is rendered correctly', () => {
    store = mockStore(initState);
    const { getByTestId } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(getByTestId('add-todo-btn')).toBeInTheDocument();
  });

  it('todo has been rendered', () => {
    store = mockStore([
      { content: 'watch some movies', isCompleted: false, id: 'test1' },
      { content: 'read some books', isCompleted: false, id: 'test2' },
    ]);
    const { getByTestId } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(getByTestId('watch some movies-test1')).not.toBeNull();
    expect(getByTestId('read some books-test2')).not.toBeNull();
  });
});
