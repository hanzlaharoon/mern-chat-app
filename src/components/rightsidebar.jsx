import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
// import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
// import ListGroup from 'react-bootstrap/ListGroup';
import Col from 'react-bootstrap/Col';
// import Row from 'react-bootstrap/Row';

export default class RightSidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
    };
  }
  componentDidMount() {
    const msgsArr = [
      { msg: 'Hello', sent: false },
      { msg: 'How Are You', sent: true },
      { msg: 'Is everthing fine', sent: false },
      // { msg: 'Hello', sent: false },
      // { msg: 'How Are You', sent: true },
      // { msg: 'Is everthing fine', sent: false },
      // { msg: 'Hello', sent: false },
      // { msg: 'How Are You', sent: true },
      // { msg: 'Is everthing fine', sent: false },
      // { msg: 'Hello', sent: false },
      // { msg: 'How Are You', sent: true },
      // { msg: 'Is everthing fine', sent: false },
    ];
    this.setState({ messages: msgsArr });
  }
  render() {
    const messagesView = this.state.messages.map((item, index) => {
      if (!item.sent) {
        return (
          <p className='chatMsg' key={index}>
            {item.msg}
          </p>
        );
      } else
        return (
          <p key={index} className='chatMsg sentMsg'>
            {item.msg}
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
            <h2>Contact1</h2>
          </Navbar.Brand>
          <small>Group Members</small>
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
                />
              </Col>
              <Col>
                <Button type='button'>Send</Button>
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
