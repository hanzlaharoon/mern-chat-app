import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class Register extends Component {
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

    console.log(`Student successfully created!`);
    console.log(`Username: ${this.state.username}`);
    console.log(`Password: ${this.state.password}`);

    const userObj = {
      username: this.state.username.toLowerCase(),
      password: this.state.password,
    };

    axios
      .post('http://localhost:4000/user/register', userObj)
      .then((res) => {
        console.log('/user/register', res.data);
        this.setState({ username: '', password: '' });
      })
      .catch((err) => {
        console.log('Error', err);
      });
  }

  render() {
    return (
      <div className='row justify-content-center'>
        <div className='col-4'>
          <h2 className='text-center my-4'>Register</h2>

          <div className='form-wrapper'>
            <Form onSubmit={this.onSubmit}>
              <Form.Group controlId='Usename'>
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

              <Button variant='danger' size='lg' block='block' type='submit'>
                Register
              </Button>
            </Form>

            <small>
              Already have an account? <Link to={'/login'}>Login here</Link>
            </small>
          </div>
        </div>
      </div>
    );
  }
}
