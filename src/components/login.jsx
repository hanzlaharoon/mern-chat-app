import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class Login extends Component {
  constructor(props) {
    super(props);

    // Setting up functions
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    // Setting up state
    this.state = {
      username: '',
      password: '',
    };
  }

  onChangeUsername(e) {
    this.setState({ username: e.target.value });
  }

  onChangePassword(e) {
    this.setState({ password: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    // console.log(`Student successfully logged In!`);
    console.log(`Name: ${this.state.username}`);
    console.log(`Email: ${this.state.password}`);

    const userObj = {
      username: this.state.username.toLowerCase(),
      password: this.state.password,
    };

    axios
      .post('http://localhost:4000/user/login', userObj)
      .then((res) => {
        console.log('/user/login', res);
        if (res.data !== null) {
          console.log('Login Successfull');
          this.setState({ username: '', password: '' });
          this.props.history.push('/chat');
        } else {
          console.log('Login Failed');
        }
      })
      .catch((err) => {
        console.log('Error', err);
      });
  }

  render() {
    return (
      <div className='row justify-content-center'>
        <div className='col-4'>
          <h2 className='text-center my-4'>Login</h2>

          <div className='form-wrapper'>
            <Form onSubmit={this.onSubmit}>
              <Form.Group controlId='Username'>
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type='text'
                  value={this.state.username}
                  onChange={this.onChangeUsername}
                />
              </Form.Group>

              <Form.Group controlId='Password'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type='password'
                  value={this.state.password}
                  onChange={this.onChangePassword}
                />
              </Form.Group>

              <Button variant='success' size='lg' block='block' type='submit' disabled={this.state.username && this.state.password ? false : true}>
                Login
              </Button>
            </Form>

            <small>
              Don't have an account?{' '}
              <Link to={'/register'}>Create an account</Link>
            </small>
          </div>
        </div>
      </div>
    );
  }
}
