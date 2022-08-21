import { is } from 'immer/dist/internal';
import type { NextPage } from 'next';
import { useEffect, useRef } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import {
  deleteTodo,
  editTodoDoneValue,
  editTodoValue,
  isEditChange,
  makeActive,
  makeCompleted,
  onDragEnd,
} from '../features/submitter/submitTodoSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';

const DragDropComponent: NextPage = () => {
  const dispatch = useAppDispatch();
  const selector = useAppSelector((state) => state);
  const isEdit = selector.submitTodo.isEdit;
  const todoArray = selector.submitTodo.todoArray;
  const todoDoneArray = selector.submitTodo.todoDoneArray;

  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    ref.current?.focus();
  }, [isEdit]);

  console.log(todoArray, todoDoneArray);

  return (
    <div className="pt-10">
      <DragDropContext
        onDragEnd={(result) => {
          dispatch(onDragEnd(result));
        }}
      >
        <div className="flex justify-center w-screen flex-wrap">
          <div className="md:w-6/12 w-full p-1 flex flex-col items-center">
            <h3 className="">
              <span className="pr-2 ">{todoArray.length}</span>
              {todoArray.length === 1 ? 'active task' : 'active tasks'}
            </h3>
            <Droppable droppableId="todoArray">
              {(provided) => (
                <ul
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className=" bg-cyan-500 p-5 w-full rounded-md mt-3"
                >
                  {todoArray.map((item, _i) => {
                    return (
                      <Draggable
                        key={item.date.toString()}
                        draggableId={item.date.toString()}
                        index={_i}
                      >
                        {(provided) => (
                          <li
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="transition-none"
                          >
                            <div className="bg-orange-200 text-gray-800 m-2 p-5 md:hover:scale-105 transition shadow-black shadow-inner">
                              <div className="flex justify-between">
                                {isEdit !== item.date ? (
                                  <h3 className="text-lg">
                                    ・
                                    {item.todo.charAt(0).toUpperCase() +
                                      item.todo.slice(1)}
                                  </h3>
                                ) : (
                                  <form
                                    onSubmit={(e) => {
                                      e.preventDefault();
                                      dispatch(isEditChange(null));
                                    }}
                                    className="w-screen "
                                  >
                                    <input
                                      className="bg-slate-100 p-2 w-10/12"
                                      type={'text'}
                                      ref={ref}
                                      value={item.todo}
                                      onChange={(e) =>
                                        dispatch(
                                          editTodoValue([
                                            item.date,
                                            e.target.value,
                                          ])
                                        )
                                      }
                                    />
                                  </form>
                                )}
                                <button
                                  type="button"
                                  onClick={() =>
                                    isEdit === item.date
                                      ? dispatch(isEditChange(null))
                                      : dispatch(isEditChange(item.date))
                                  }
                                >
                                  edit
                                </button>
                              </div>
                              <div className="py-2">
                                {new Date(item.date).toLocaleString()}
                              </div>
                              <div className="flex justify-between">
                                <button
                                  type="button"
                                  onClick={() =>
                                    dispatch(makeCompleted(item.date))
                                  }
                                  className="text-sky-600"
                                >
                                  completed!
                                </button>
                                <button
                                  type="button"
                                  onClick={() =>
                                    dispatch(deleteTodo(item.date))
                                  }
                                  className="text-red-500"
                                >
                                  delete
                                </button>
                              </div>
                            </div>
                          </li>
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </div>
          <div className="md:w-6/12 w-full p-1 flex flex-col items-center">
            <div>
              <span className="pr-2 ">{todoDoneArray.length}</span>
              {todoDoneArray.length === 1
                ? 'completed task'
                : 'completed tasks'}
            </div>
            <Droppable droppableId="todoDoneArray">
              {(provided) => (
                <ul
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="bg-fuchsia-500 p-5 w-full rounded-md mt-3"
                >
                  {todoDoneArray.map((item, _i) => {
                    return (
                      <Draggable
                        key={item.date.toString()}
                        draggableId={item.date.toString()}
                        index={_i}
                      >
                        {(provided) => (
                          <li
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="transition-none"
                          >
                            <div className="bg-orange-200 text-gray-800 m-2 p-5 md:hover:scale-105 transition-all shadow-inner shadow-black">
                              <div className="flex justify-between">
                                {isEdit !== item.date ? (
                                  <h3 className="text-lg">
                                    ・
                                    {item.todo.charAt(0).toUpperCase() +
                                      item.todo.slice(1)}
                                  </h3>
                                ) : (
                                  <form
                                    onSubmit={(e) => {
                                      e.preventDefault();
                                      dispatch(isEditChange(null));
                                    }}
                                    className="w-screen "
                                  >
                                    <input
                                      className="bg-slate-100 p-2 w-10/12"
                                      type={'text'}
                                      ref={ref}
                                      value={item.todo}
                                      onChange={(e) =>
                                        dispatch(
                                          editTodoDoneValue([
                                            item.date,
                                            e.target.value,
                                          ])
                                        )
                                      }
                                    />
                                  </form>
                                )}
                                <button
                                  type="button"
                                  onClick={() =>
                                    isEdit === item.date
                                      ? dispatch(isEditChange(null))
                                      : dispatch(isEditChange(item.date))
                                  }
                                >
                                  edit
                                </button>
                              </div>
                              <div className="py-2">
                                {new Date(item.date).toLocaleString()}
                              </div>
                              <div className="flex justify-between">
                                <button
                                  type="button"
                                  onClick={() =>
                                    dispatch(makeActive(item.date))
                                  }
                                  className="text-sky-600"
                                >
                                  make this active!
                                </button>
                                <button
                                  type="button"
                                  onClick={() =>
                                    dispatch(deleteTodo(item.date))
                                  }
                                  className="text-red-500"
                                >
                                  delete
                                </button>
                              </div>
                            </div>
                          </li>
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </div>
        </div>
      </DragDropContext>
    </div>
  );
};

export default DragDropComponent;
