import React, { Component, useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import { Card } from "antd";
const Edittodo = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [noteName, setNote] = useState("");
  const [autherName, setAuther] = useState("");
  const [description, setDescription] = useState("");
  const [visibility, setVisibility] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const url = `http://localhost:3000/todos/${id}`;

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setNote(data.noteName);
        setAuther(data.autherName);
        setDescription(data.description);
        setVisibility(data.visibility);
      });
  }, []);

  const handleInputs = (e) => {
    const { name, value } = e.target;

    if (name === "noteName") {
      setNote(value);
      delete formErrors[name];
    }
    if (name === "autherName") {
      setAuther(value);
      delete formErrors[name];
    }
    if (name === "description") {
      setDescription(value);
      delete formErrors[name];
    }
    if (name === "visibility") {
      setVisibility(value);
      delete formErrors[name];
    }
  };



  //validate all inputs
  const validate = () => {
    let isvaild = true;
    let erros = {};

    if (noteName.trim() === "") {
      erros.noteName = "noteName field is required";
      isvaild = false;
    }
    if (autherName.trim() === "") {
      erros.autherName = "autherName field is required";
      isvaild = false;
    }
    if (description.trim() === "") {
      erros.description = "description field is required";
      isvaild = false;
    }
    if (visibility.trim() === "") {
      erros.visibility = "visibility field is required";
      isvaild = false;
    }

    setFormErrors(erros);

    return isvaild;
  };

  //handle function using for add todos;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      fetch(url, {
        method: "PUT",
        body: JSON.stringify({
          noteName: noteName,
          autherName: autherName,
          description: description,
          visibility: visibility,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((responce) => {
          if (responce.ok) {
            return responce.json();
          }
        })
        .then((postedData) => {
          setNote("");
          setAuther("");
          setDescription("");
          setVisibility("");
          navigate("/");

        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div className="container w-50 mt-5 bg-white rounded">
      <form className="form-group p-2" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="noteName">Book Name</label>
          <input
            type="text"
            name="noteName"
            className={`${
              formErrors["noteName"]
                ? "form-control border border-danger"
                : "form-control"
            }`}
            id="noteName"
            value={noteName}
            onChange={handleInputs}
          />
          {formErrors["noteName"] ? (
            <small className="text-danger">{formErrors["noteName"]}</small>
          ) : (
            ""
          )}
        </div>
        <div>
          <label htmlFor="autherName">Auther Name</label>
          <input
            type="text"
            name="autherName"
            className={`${
              formErrors["autherName"]
                ? "form-control border border-danger"
                : "form-control"
            }`}
            id="autherName"
            value={autherName}
            onChange={handleInputs}
          />
          {formErrors["autherName"] ? (
            <small className="text-danger">{formErrors["autherName"]}</small>
          ) : (
            ""
          )}
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            id="description"
            cols="10"
            rows="3"
            className={`${
              formErrors["description"]
                ? "form-control border border-danger"
                : "form-control"
            }`}
            value={description}
            onChange={handleInputs}
          ></textarea>
          {formErrors["description"] ? (
            <small className="text-danger">{formErrors["description"]}</small>
          ) : (
            ""
          )}
        </div>
        <div>
          <label htmlFor="">Visibility</label>
          <div>
            <label htmlFor="yes">yes</label>
            <input
              type="radio"
              name="visibility"
              id="yes"
              value={true}
              checked={visibility === "true"}
              onChange={handleInputs}
            />
            <label htmlFor="no">no</label>
            <input
              type="radio"
              name="visibility"
              id="no"
              value={false}
              checked={visibility === "false"}
              onChange={handleInputs}
            />
            {formErrors["visibility"] ? (
              <small className="text-danger">{formErrors["visibility"]}</small>
            ) : (
              ""
            )}
          </div>
        </div>

        <button type="submit" className="btn btn-primary mt-2">
          Update Todo
        </button>
      </form>
    </div>
  );
};

export default Edittodo;
