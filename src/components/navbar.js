import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useHistory } from "react-router-dom";
import { withAuth } from "../store";

export const Header = withAuth(({ isLoggedIn, user, setLogin, setUser }) => {
    const history = useHistory();

  function handleLogout() {
      setLogin(false);
      setUser(null);
      history.replace('/login')
  }

  return (
    <>
      <header className="App-header">
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand>
              <Link to={"/login"} className="nav-link">
                React MERN Stack Chat App
              </Link>
            </Navbar.Brand>

            <Nav className="justify-content-end">
              {!isLoggedIn && !user ? (
                <>
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
                </>
              ) : (
                  <>
                <Nav>
                  <Link to={"/login"} className="nav-link">
                    Hey, @{user}
                  </Link>
                </Nav>
                <Nav>
                  <a onClick={handleLogout} className="nav-link">
                    Logout
                  </a>
                </Nav>
                </>
              )}

              {/* <Nav>
                <Link to={"/chat"} className="nav-link">
                  Chat
                </Link>
              </Nav> */}
            </Nav>

            {/* <Nav>
                <Link to={"/edit-student/:id"} className="nav-link">
                  Edit Student
                </Link>
              </Nav> */}
          </Container>
        </Navbar>
      </header>
    </>
  );
});
