import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

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
    console.log(`Name: ${this.state.username}`);
    console.log(`Email: ${this.state.password}`);

    this.setState({ name: '', email: '', rollno: '' });
  }

  render() {
    return (
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
      </div>
    );
  }
}
