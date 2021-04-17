import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
// import axios from 'axios';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';

// Left Side Bar with Search Contacts and Contacts List
export default class LeftSidebar extends Component {
  constructor(props) {
    super(props);

    this.handleContactSelect = this.handleContactSelect.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleShowBD = this.handleShowBD.bind(this);
    this.handleCloseBD = this.handleCloseBD.bind(this);
    this.handleSendBD = this.handleSendBD.bind(this);

    this.state = {
      // contacts: [],
      // selectedContact: 0,
      searchQuery: '',
      showBroadcast: false,
      broadcastMessage: '',
    };
  }

  handleContactSelect(e) {
    console.log('Contact Selected: ', e.target.value);
    // this.setState({ selectedContact: e.target.value });
    this.props.handleSetChat(e.target.value);
  }

  handleSearch() {
    // console.log("")
    this.setState({ searchQuery: '' });
  }

  handleCloseBD = () => this.setState({ showBroadcast: false });
  handleShowBD = () => this.setState({ showBroadcast: true });

  handleSendBD() {
    if (this.state.broadcastMessage) {
      console.log('Boradcast Message: ', this.state.broadcastMessage);
      const msg = {
        content: this.state.broadcastMessage,
      };
      let promiseArr = [];
      for (const item in this.props.contacts) {
        if (Object.hasOwnProperty.call(this.props.contacts, item)) {
          const element = this.props.contacts[item];
          const promise = axios
            .post(`http://localhost:4000/contact/${element._id}/messages`, msg)
            .then((res) => {
              console.log(`contact/${element._id}/messages `, res);
            })
            .catch((err) => console.log('Error ', err));
          promiseArr.push(promise);
        }
      }
      Promise.all(promiseArr)
        .then((values) => {
          console.log(values);
          this.setState({ broadcastMessage: '', showBroadcast: false });
          this.props.handleUpdate();
        })
        .catch((err) => console.log('Error ', err));
    }
  }

  render() {
    const contactsList = this.props.contacts
      .filter((item) => item.name.toLowerCase().includes(this.state.searchQuery.toLowerCase()))
      .map((item, index) => {
        return (
          <ListGroup.Item
            action
            key={index}
            value={item._id}
            onClick={this.handleContactSelect}
            style={{ fontSize: '20px' }}
            className={
              this.props.selectedChat === item._id ? 'selectedContact' : null
            }
          >
            {/* {`Contact${index + 1}`} */}
            {item.name}
          </ListGroup.Item>
        );
      });

    return (
      <>
        <Navbar className='bg-light justify-content-center' sticky='top'>
          <Form inline>
            <Form.Control
              type='text'
              placeholder='Search'
              className=' mr-sm-2'
              value={this.state.searchQuery}
              onChange={(e) => this.setState({ searchQuery: e.target.value })}
            />
            <Button type='button' onClick={this.handleSearch}>
              Submit
            </Button>
          </Form>
        </Navbar>

        <Nav
          className='justify-content-center'
          style={{ borderBottom: '2px solid #b4aeae' }}
        >
          <Nav.Item>
            <Nav.Link href='#'>Add New Group</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link onClick={this.handleShowBD}>Send Broadcast</Nav.Link>
          </Nav.Item>
        </Nav>

        {/* <hr style={{ fontSize: '20px', color: '#fff' }} /> */}
        <ListGroup variant='flush'>{contactsList}</ListGroup>

        <Modal show={this.state.showBroadcast} onHide={this.handleCloseBD}>
          <Modal.Header closeButton>
            <Modal.Title>Send Broadcast</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId='Broadcast.textarea'>
                {/* <Form.Label>Message</Form.Label> */}
                <Form.Control
                  as='textarea'
                  rows={2}
                  placeholder='Type message'
                  value={this.state.broadcastMessage}
                  required
                  onChange={(e) =>
                    this.setState({ broadcastMessage: e.target.value })
                  }
                />
              </Form.Group>
              <small>This message will be sent to all of your contacts</small>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            {/* <Button variant='secondary' onClick={this.handleCloseBD}>
              Close
            </Button> */}
            <Button variant='primary' onClick={this.handleSendBD}>
              Send
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}
