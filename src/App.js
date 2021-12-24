import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Login } from "./components/login";
import { Register } from "./components/register";
import Chat from "./components/chat";
import { RootProvider } from "./store/providers";
import { Header } from "./components/navbar";

function App() {
  return (
    <RootProvider>
      <Router>
        <div className="App">
          <Header />

          <Container fluid>
            <Row>
              <Col md={12}>
                <div className="wrapper">
                  <Switch>
                    <Route exact path="/" component={Login} />
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
      </Router>
    </RootProvider>
  );
}

export default App;
