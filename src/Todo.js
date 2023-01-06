import React, { useEffect, useState } from "react";
import "./Todo.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";

function Todo() {
  // Single Todo
  const [todo, setTodo] = useState("");
  // All Todos
  const [todos, setTodos] = useState([]);
  // Edit Mode
  const [editId, setEditId] = useState(0);

  const navigate = useNavigate();

  const apiEndPoint = "https://63ad0cd534c46cd7ae8f44d5.mockapi.io/todo/";

  const key = window.localStorage.getItem("key");

  const [loaded, setLoaded] = useState(false);

  const [showBuffer, setShowBuffer] = useState(false);

  useEffect(() => {
    setTimeout(setLoaded, 800, true);
    // setLoaded(true);
  }, [todo]);

  useEffect(() => {
    if (!localStorage.getItem("key")) {
      navigate("/");
    }
  });

  // GET with axios
  useEffect(() => {
    const getTodos = async () => {
      const res = await axios.get(apiEndPoint);
      // setTodos(res.data);
      setTodos(
        res.data.filter((to) => {
          return to.userid === key;
        })
      );
    };
    getTodos();
  }, [key]);

  // DELETE with axios
  const deleteTodo = async (id) => {
    await axios.delete(`${apiEndPoint}${id}`);
    setTodos(
      todos.filter((to) => {
        return to.id !== id;
      })
    );
  };

  // POST with Axios
  const addTodo = async (todo, key) => {
    let res = await axios.post(apiEndPoint, {
      todo: todo,
      userid: key,
      // id: id
    });
    setTodos([res.data, ...todos]);
    // setEditId(0);
    setTodo("");
  };

  // PUT with axios
  const editTodoApi = async (editId) => {
    await axios.put(`${apiEndPoint}${editId}`, {
      todo: todo,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // If there is inside the editId then we need to
    if (editId) {
      const editTodo = todos.find((i) => i.id === editId);
      const updatedTodos = todos.map((t) =>
        // Check it is the todo we are editing
        t.id === editTodo.id
          ? // Then provide same id and todo whatever changes happened
            (t = { id: t.id, todo })
          : // Default value
            { id: t.id, todo: t.todo }
      );
      setTodos(updatedTodos);
      // console.log(editTodo.todo);
      editTodoApi(editId);
      // console.log(editId);
      setEditId(0);
      setTodo("");
      return;
    }

    if (todo !== "") {
      // setTodos([{ id: `${todo}-${Date.now()}`, todo }, ...todos]);
      addTodo(todo, key);
      setTodo("");
    }
  };

  const handleEdit = (id) => {
    const editTodo = todos.find((i) => i.id === id);
    setTodo(editTodo.todo);
    // console.log(editTodo.todo);
    setEditId(id);
    // console.log(id);
  };

  // Remove All Todo Api
  /*   const rmvTodo = async (id) => {
    await axios.delete(`${apiEndPoint}${id}`);
  }; */

  // Sign Out
  const handleSignOut =  () => {
    setShowBuffer(true);
    setTimeout(async () => {
      const rmd = todos.map((t) => t.id);
      for (let i in rmd) {
        await deleteTodo(rmd[i]);
      }
      window.localStorage.removeItem("key");
      navigate("/");
      setShowBuffer(false);
    }, 2000);

  };

  return (
    <div className="App">
      <header className="">
        {/* Class Container */}
        <div className="container">
          <h1>TODO</h1>
          {/* Class todoForm */}
          <form className="todoForm" onSubmit={handleSubmit}>
            {/* <label htmlFor="todo">Add Your List Here!</label> */}
            <input
              type="text"
              className="todoInput"
              value={todo}
              onChange={(e) => setTodo(e.target.value)}
              pattern=".+"
              required
            />
            <button variant="text" type="submit" className="btn-submit">
              {editId ? "UPDATE" : "ADD"}
            </button>
          </form>
          {!loaded && <Spinner />}

          {/* Class allTodos List */}
          <ul className="allTodos">
            {/* Class singleTodo */}
            {todos.map((t) => (
              <li className="singleTodo" key={t.id}>
                {/* Class todoText // Inside TodoList */}
                <span className="todoText">{t.todo}</span>
                <button className="btn-action" onClick={() => handleEdit(t.id)}>
                  EDIT
                </button>
                <button
                  className="btn-action"
                  onClick={() => {
                    if (window.confirm("Delete")) {
                      deleteTodo(t.id);
                    }
                  }}
                >
                  DEL
                </button>
              </li>
            ))}
          </ul>
          <button onClick={() => handleSignOut()}>Sign Out</button>
          {showBuffer && <Spinner />}
        </div>
      </header>
    </div>
  );
}

export default Todo;
