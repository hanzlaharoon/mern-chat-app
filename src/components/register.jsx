import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link, useHistory } from "react-router-dom";
import useAuthApi from "../hooks/useAuthApi";

export default function Register() {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [{ loading, data, error }, fetchApi] = useAuthApi();

  //  handle on register success
  useEffect(() => {
    if (!loading && !error) {
      if (data) {
        setUsername("");
        setPassword("");
        history.push("/chat");
      }
    }
  }, [loading, data, error]);

  function onChangeUsername(e) {
    setUsername(e.target.value);
  }

  function onChangePassword(e) {
    setPassword(e.target.value);
  }

  function onSubmit(e) {
    e.preventDefault();

    fetchApi("user/register", username, password);
  }

  return (
    <div className="row justify-content-center">
      <div className="col-4">
        <h2 className="text-center my-4">Register</h2>

        <div className="form-wrapper">
          <Form onSubmit={onSubmit}>
            <Form.Group controlId="Usename">
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
              variant="danger"
              size="lg"
              block="block"
              type="submit"
              disabled={username && password ? false : true}
            >
              Register
            </Button>
          </Form>

          <small>
            Already have an account? <Link to={"/login"}>Login here</Link>
          </small>
        </div>
      </div>
    </div>
  );
}
