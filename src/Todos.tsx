//@ts-nocheck

import React, { useState, useReducer, useId } from "react";
import "./styles/Todos.css";
import Todo from "./Todo";
import { useLocalStorage } from "./useLocalStorage";

function reducer(todos: any, action: any) {
  switch (action.type) {
    case "ADD_TODO":
      return [...todos, newTodo(action.payload.name)];

    case "TOGGLE_TODO":
      return todos.map((todo: any) => {
        if (todo.id === action.payload.id) {
          return { ...todo, complete: !todo.complete };
        }
        return todo;
      });
    case "DELETE_TODO":
      return todos.filter((todo: any) => todo.id !== action.payload.id);

    default:
      return todos;
  }
}

const newTodo = (name: string) => {
  return { id: Date.now(), name: name, complete: false };
};

const Todos = () => {
  const [todos, dispatch] = useReducer(reducer, []);
  const [name, setName] = useLocalStorage<string>("name", "");
  function handleSubmit(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    dispatch({ type: "ADD_TODO", payload: { name: name } });
  }

  return (
    <div className="todos">
      <div className="todos__content">
        <h2>My todo app</h2>
        <div className="todos__forms">
          <form className="todos__form" onSubmit={handleSubmit}>
            <input
              className="todos__input"
              value={name}
              placeholder="Add todo"
              onChange={(e) => setName(e.target.value)}
            />
          </form>

          <button className="todos__add__btn" onClick={handleSubmit}>
            Create
          </button>
        </div>
        <div className="todos__todo">
          {todos.map((todo) => {
            return <Todo key={todo.id} todo={todo} dispatch={dispatch} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Todos;
