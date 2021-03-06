import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
export default class RightSidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      sendMsg: '',
    };

    this.handleSendMsg = this.handleSendMsg.bind(this);
  }

  handleSendMsg() {
    if (this.state.sendMsg) {
      const msg = {
        content: this.state.sendMsg,
      };
      axios
        .post(
          `http://localhost:4000/contact/${this.props.contact._id}/messages`,
          msg
        )
        .then((res) => {
          console.log('contact/_id/messages ', res);
          this.props.handleUpdate();
          this.setState({ sendMsg: '' });
        })
        .catch((err) => console.log('Error ', err));
    }
  }

  render() {
    const messagesView =
      this.props.contact &&
      this.props.contact.messages &&
      this.props.contact.messages.map((item, index) => {
        if (item.author !== 'self') {
          return (
            <p className='chatMsg' key={index}>
              {item.content}
            </p>
          );
        } else
          return (
            <p key={index} className='chatMsg sentMsg'>
              {item.content}
            </p>
          );
      });

    return (
      <>
        {/* <div className='spaceBtw'> */}
        <Navbar
          className='bg-light justify-content-between'
          sticky='top'
          expand='md'
          style={{
            paddingTop: '1rem',
            paddingBottom: '1rem',
            borderBottom: '1px solid',
          }}
        >
          <Navbar.Brand href='#'>
            <h2>
              {(this.props.contact && this.props.contact.name) || 'contact'}
            </h2>
          </Navbar.Brand>
          {this.props.contact && this.props.contact.group ? (
            <small>Group Members</small>
          ) : null}
        </Navbar>
        {/* </div> */}

        <div className='content'>
          <div className='chatGrid'>{messagesView}</div>
        </div>

        <div className='bottom'>
          {/* <Navbar className='bg-light' fixed='bottom'> */}
          <Form className='m-1'>
            <Form.Row>
              <Col sm={11}>
                <Form.Control
                  type='text'
                  placeholder='Type a message'
                  className='msgInput mr-sm-2'
                  value={this.state.sendMsg}
                  onChange={(e) => this.setState({ sendMsg: e.target.value })}
                />
              </Col>
              <Col>
                <Button type='button' onClick={this.handleSendMsg}>
                  Send
                </Button>
              </Col>
            </Form.Row>
          </Form>
          {/* </Navbar> */}
        </div>
        {/* </div> */}
      </>
    );
  }
}
