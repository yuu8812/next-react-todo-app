import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store/store';

interface Todo {
  date: number;
  todo: string;
  isEdit: number | null;
}

interface Arrays extends Todo {
  todoArray: Todo[];
  todoDoneArray: Todo[];
}

const initialState: Arrays = {
  date: 0,
  todo: '',
  isEdit: null,
  todoArray: [],
  todoDoneArray: [],
};

export const todoSlice = createSlice({
  name: 'submitTodo',
  initialState,
  reducers: {
    onChangeFunc: (state, action) => {
      state.todo = action.payload;
    },
    onSubmitFunc: (state) => {
      state.date = Date.now();
      const todo = state.todo;
      state.todoArray.unshift({
        date: state.date,
        todo: state.todo,
        isEdit: null,
      });
      state.todo = initialState.todo;
    },

    deleteTodo: (state, action) => {
      state.todoArray = state.todoArray.filter((item) => {
        return item.date !== action.payload;
      });
      state.todoDoneArray = state.todoDoneArray.filter((item) => {
        return item.date !== action.payload;
      });
    },
    onDragEnd: (state, action) => {
      const { source, destination } = action.payload;
      if (!destination) return;
      if (
        destination.droppableId === source.droppableId &&
        destination.index === source.index
      )
        return;
      let add,
        active = Array.from(state.todoArray),
        complete = Array.from(state.todoDoneArray);

      if (source.droppableId === 'todoArray') {
        add = active[source.index];
        active.splice(source.index, 1);
      } else {
        add = complete[source.index];
        complete.splice(source.index, 1);
      }
      if (destination.droppableId === 'todoArray') {
        active.splice(destination.index, 0, add);
      } else {
        complete.splice(destination.index, 0, add);
      }
      state.todoArray = active;
      state.todoDoneArray = complete;
    },
    makeActive: (state, action) => {
      const active = Array.from(state.todoArray);
      const complete = Array.from(state.todoDoneArray);
      console.log(action.payload);
      const itemIndex = complete.findIndex((item) => {
        return item.date === action.payload;
      });
      const newItem = complete[itemIndex];
      active.unshift(newItem);
      state.todoArray = active;
      const newArr = complete.filter((item) => {
        return item.date !== action.payload;
      });
      state.todoDoneArray = newArr;
    },
    makeCompleted: (state, action) => {
      let add,
        active = Array.from(state.todoArray),
        complete = Array.from(state.todoDoneArray);
      console.log(action.payload);
      const itemIndex = active.findIndex((item) => {
        return item.date === action.payload;
      });
      const newItem = active[itemIndex];
      complete.unshift(newItem);
      state.todoDoneArray = complete;
      const newArr = active.filter((item) => {
        return item.date !== action.payload;
      });
      state.todoArray = newArr;
    },
    isEditChange: (state, action) => {
      state.isEdit = action.payload;
    },
    editTodoDoneValue: (state, actions) => {
      const index = state.todoDoneArray.findIndex((item) => {
        return item.date === actions.payload[0];
      });
      console.log(index, actions.payload);
      state.todoDoneArray[index].todo = actions.payload[1];
    },
    editTodoValue: (state, actions) => {
      const index = state.todoArray.findIndex((item) => {
        return item.date === actions.payload[0];
      });
      console.log(index, actions.payload);
      state.todoArray[index].todo = actions.payload[1];
    },
  },
});

export const {
  onChangeFunc,
  onSubmitFunc,
  deleteTodo,
  onDragEnd,
  makeActive,
  makeCompleted,
  isEditChange,
  editTodoDoneValue,
  editTodoValue,
} = todoSlice.actions;

// export const selectCount = (state: RootState) => state.counter.value;

export default todoSlice.reducer;
