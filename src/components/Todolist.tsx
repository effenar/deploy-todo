"use client";
import React, { useState, useEffect } from "react";
import { TbTrashXFilled } from "react-icons/tb";

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

const TodoApp = () => {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [todoName, setTodoName] = useState<string>("");

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodoList(JSON.parse(storedTodos));
    }
  }, []);

  const addTodo = () => {
    const newTodo = {
      id: Date.now(),
      title: todoName,
      completed: false,
    };
    setTodoList((prevTodos) => {
      const updatedTodos = [...prevTodos, newTodo];
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    });
    setTodoName("");
  };

  const deleteTodo = (id: number) => {
    const newTodos = todoList.filter((todo) => todo.id !== id);
    setTodoList(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  const checkTodo = (id: number) => {
    const newTodos = todoList.map((t) => {
      if (t.id === id) {
        t.completed = !t.completed;
      }
      return t;
    });
    setTodoList(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  return (
    <div className="h-full w-full flex justify-center items-center row-start-3 flex-col gap-4">
      <div className="p-3 flex items-center text-black">
        <input
          value={todoName}
          onChange={(e) => setTodoName(e.target.value)}
          className="p-3 bg-slate-50 rounded-full"
        />
        <button
          className="p-3 ml-4 bg-black rounded-full font-bold text-sm text-white"
          onClick={addTodo}
        >
          Add
        </button>
      </div>
      <div className="flex flex-col w-full justify-center items-center">
        {todoList.map((todo) => (
          <div
            key={todo.id}
            className="flex justify-between items-center w-full my-2 bg-slate-50 text-black rounded-full"
          >
            <div className="p-2 flex gap-3">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => checkTodo(todo.id)}
                className="accent-black items-center"
                id={`todo-checkbox-${todo.id}`}
              />
              <label htmlFor={`todo-checkbox-${todo.id}`} className="sr-only">
                Toggle completion
              </label>
              <div className={`text-sm ${todo.completed ? "line-through" : ""}`}>
                {todo.title}
              </div>
            </div>
            <button
              className="bg-black p-2 hover:bg-red-500 rounded-full text-white font-bold"
              onClick={() => deleteTodo(todo.id)}
              aria-label={`Delete todo ${todo.title}`}
            >
            <TbTrashXFilled />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoApp;