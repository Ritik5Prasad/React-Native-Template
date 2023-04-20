import {createSlice} from '@reduxjs/toolkit';
const initialState = {
  todo: [],
};

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todo = [...state.todo, action.payload];
    },
    deleteTodo: (state, action) => {
      const index = state.todo.findIndex(item => item.id === action.payload.id);
      let newTodo = [...state.todo];

      if (index >= 0) {
        newTodo.splice(index, 1);
      } else {
        console.warn('Cant remove not in basket');
      }
      state.todo = newTodo;
    },
    updateTodo: (state, action) => {
      const index = state.todo.findIndex(item => item.id === action.payload.id);
      const updatedState = [...state.todo];
      updatedState[index].text = action.payload.text;
      state.todo = updatedState;
    },
  },
});

export const {addTodo, deleteTodo, updateTodo} = todoSlice.actions;
export const selectTodo = state => state.todo.todo;
export default todoSlice.reducer;
