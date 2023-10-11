import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

//import card ,modal form antd;
import { Card } from "antd";
//import from and button from react-bootstrap
import Button from "react-bootstrap/Button";

import "./index.css";
const App = () => {
  const navigate = useNavigate();
  const [todos, setTodo] = useState([]);
  const url = "http://localhost:3000/todos/";

  //fetch the all using useEffect hook
  useEffect(() => {
    let fetchAlltodo = async () => {
      try {
        let fetchAlltodo = await fetch(url);
        if (!fetchAlltodo.ok) {
          throw new Error("Could not fetch");
        }
        const jsonData = await fetchAlltodo.json();
        setTodo(...todos, jsonData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAlltodo();
  }, []);

  return (
    <>
      <Link to="/add-todo" className="btn btn-primary m-3">
        Add Todo
      </Link>
      {
        <div className="todo-cards ps-3 d-flex flex-wrap w-auto gap-2 ">
          {todos.map((todo) => {
            if (todo.visibility === "true") {
              return (
                <div key={todo.id} id={todo.id}>
                  <Card
                    title={todo.noteName}
                    bordered={false}
                    style={{ width: 300 }}
                  >
                    <p>Auther: {todo.autherName}</p>
                    <strong>Description : </strong>
                    <p>{todo.description}</p>
                    <Link to={`/delete/${todo.id}`} className="btn btn-primary">
                      Delete
                    </Link>
                    <Link
                      to={`/edit/${todo.id}`}
                      className="btn btn-primary ms-2"
                    >
                      Edit
                    </Link>
                  </Card>
                </div>
              );
            }
          })}
        </div>
      }
    </>
  );
};

export default App;
