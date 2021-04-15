import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Login from "./components/login";
import Register from "./components/register";
import Chat from "./components/chat";

function App() {
  return (<Router>
    <div className="App">
      <header className="App-header">
        <Navbar bg="dark" variant="dark">
          <Container>

            <Navbar.Brand>
              <Link to={"/login"} className="nav-link">
                React MERN Stack Chat App
              </Link>
            </Navbar.Brand>

            <Nav className="justify-content-end">
              <Nav>
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </Nav>

              <Nav>
                <Link to={"/register"} className="nav-link">
                  Register
                </Link>
              </Nav>

              <Nav>
                <Link to={"/chat"} className="nav-link">
                  Chat
                </Link>
              </Nav>
            </Nav>

            {/* <Nav>
                <Link to={"/edit-student/:id"} className="nav-link">
                  Edit Student
                </Link>
              </Nav> */}

          </Container>
        </Navbar>
      </header>

      <Container fluid>
        <Row>
          <Col md={12}>
            <div className="wrapper">
              <Switch>
                <Route exact path='/' component={Login} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/chat" component={Chat} />
                {/* <Route path="/edit-student/:id" component={EditStudent} /> */}
              </Switch>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  </Router>);
}

export default App;