import { useEffect, useState } from "react";
import "./Todo.css";
import { AiFillDelete, AiFillCheckCircle } from "react-icons/ai";
export default function Todo() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const status = {
    Todo: 0,
    Done: 1,
    IsDelete: true,
  };
  const addTodo = () => {
    const todo = {
      id: Math.floor(Math.random() * 1000),
      text: input,
      status: status.Todo,
    };
    setTodos([todo, ...todos]);
    localStorage.setItem("todolist", JSON.stringify([todo, ...todos]));
    setInput("");
  };
  const addToDoneList = (id) => {
    setTodos((prevTodos) => {
      const updateTodos = prevTodos.map((todo)=>{
        if (todo.id === id){
          return {
            ...todo,
            status: status.Done,

          };
        }
        return todo;
      });
    localStorage.setItem("todolist", JSON.stringify(updateTodos));
    return updateTodos;
    })
  };
  const addToDeleteList = (id) => {
    setTodos((prevTodos) => {
      const updateDeleteTodos = prevTodos.map((todo)=>{
        if (todo.id === id){
          return {
            ...todo,
            status: status.IsDelete,

          };
        }
        return todo;
      });
    localStorage.setItem("todolist", JSON.stringify(updateDeleteTodos));
    return updateDeleteTodos;
    })
  };
//   const addFromDtoDelete(id) => {
//     const item = doneItems.find
//   }

  const todoItems = todos.filter((item) => item.status === status.Todo);
  const doneItems = todos.filter((item) => item.status === status.Done);
  const deleteItem = todos.filter((item) => item.status === status.IsDelete);
 
  useEffect(() => {
    let savedTodo = JSON.parse(localStorage.getItem("todolist")); //convert local storage data to an array
    if (savedTodo) {
      setTodos(savedTodo);
    }
  }, []);
  return (
    <div className="Todo">
      <div className="container">
        <h3 className="title">ToDo List</h3>
        <form className="form-todo">
          <input
            type="text"
            name="text"
            className="form-input"
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter your task"
          />
          <button type="button" className="btn" onClick={() => addTodo()}>
            Add
          </button>
        </form>
        <div className="todo-wrapper">
          <div className="todo-list">
            <h3 className="todo-title">Todos List</h3>
            {todoItems.map((item) => {
              if (item.status === status.Todo) {
                return (
                  <div className="todo-card" key={item.id}>
                    <p className="card-text">{item.text}</p>
                    <AiFillCheckCircle
                      className="icon-check"
                      onClick={() => addToDoneList(item.id)}
                    />
                    <AiFillDelete
                      className="icon-delete"
                      onClick={() => addToDeleteList(item.id)}
                    />
                  </div>
                );
              }
            })}
          </div>
          <div className="todo-list">
            <h3 className="todo-title">Done Todos</h3>
            {doneItems.map((item) => {
              return (
                <div className="done-card" key={item.id}>
                  <p className="card-text">{item.text}</p>
                  <AiFillDelete 
                    className="icon-delete-done" 
                    onClick={() => addToDeleteList(item.id)}
                    />
                </div>
              );
            })}
          </div>
          <div className="todo-list">
            <h3 className="todo-title">Deleted Todos</h3>
            {deleteItem.map((item) => {
                return(
              <div className="delete-card" key={item.id}>
              <p className="card-text">{item.text}</p>
              </div>
                );
            })}
            
          </div>
        </div>
      </div>
    </div>
  );
}
