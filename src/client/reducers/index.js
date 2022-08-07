export const reducer = (state = [], { type, payload }) => {
  switch (type) {
    case 'INIT':
      return [...payload];
    case 'ADD':
      return [...state, { ...payload }];
    case 'DEL':
      return state.filter(({ id }) => {
        return id !== payload;
      });
    case 'MOD':
      return state.map((todo) => {
        if (todo.id === payload) {
          return { ...todo, isCompleted: !todo.isCompleted };
        }
        return todo;
      });
    default:
      return state;
  }
};
