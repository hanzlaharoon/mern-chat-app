import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function onChangeUsername(e) {
    setUsername(e.target.value);
  }

  function onChangePassword(e) {
    setPassword(e.target.value);
  }

  function onSubmit(e) {
    e.preventDefault();

    // console.log(`Student successfully logged In!`);
    console.log(`Name: ${username}`);
    console.log(`Email: ${password}`);

    const userObj = {
      username: username.toLowerCase(),
      password: password,
    };

    axios
      .post("http://localhost:4000/user/login", userObj)
      .then((res) => {
        console.log("/user/login", res);
        if (res.data !== null) {
          console.log("Login Successfull");
          setUsername("");
          setPassword("");
          history.push("/chat");
        } else {
          console.log("Login Failed");
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  }

  return (
    <div className="row justify-content-center">
      <div className="col-4">
        <h2 className="text-center my-4">Login</h2>

        <div className="form-wrapper">
          <Form onSubmit={onSubmit}>
            <Form.Group controlId="Username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                value={username}
                onChange={onChangeUsername}
              />
            </Form.Group>

            <Form.Group controlId="Password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={onChangePassword}
              />
            </Form.Group>

            <Button
              variant="success"
              size="lg"
              block="block"
              type="submit"
              disabled={username && password ? false : true}
            >
              Login
            </Button>
          </Form>

          <small>
            Don't have an account?{" "}
            <Link to={"/register"}>Create an account</Link>
          </small>
        </div>
      </div>
    </div>
  );
}
