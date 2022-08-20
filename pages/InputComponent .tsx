import type { NextPage } from 'next';
import { useEffect, useRef } from 'react';
import {
  onChangeFunc,
  onSubmitFunc,
} from '../features/submitter/submitTodoSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';

const InputComponent: NextPage = () => {
  const ref = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const selector = useAppSelector((state) => state);
  const todo = selector.submitTodo.todo;
  useEffect(() => {
    ref.current?.focus();
  }, []);
  return (
    <div className="w-screen flex justify-center">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (todo !== '') {
            dispatch(onSubmitFunc());
            // dispatch(deleteTodo());
          }
        }}
        className="w-full"
      >
        <div className="w-full flex justify-center">
          <input
            type={'text'}
            autoComplete="off"
            name="todo"
            placeholder="task here"
            ref={ref}
            value={todo}
            onChange={(e) => dispatch(onChangeFunc(e.target.value))}
            className="
            p-4 placeholder-stone-500 mr-4 ml-4 w-5/6
            placeholder-shown:border-yellow-600 rounded-lg
             border-lime-900 border-2 focus:outline-red-500 focus:shadow-sky-900
             shadow-md
             "
          />
          <button
            type={'submit'}
            className="bg-cyan-300 m-1 rounded-full hover:scale-95 transition-all text-sm p-1"
          >
            submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default InputComponent;
