import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';

// Left Side Bar with Search Contacts and Contacts List
export default class LeftSidebar extends Component {
  constructor(props) {
    super(props);

    this.handleContactSelect = this.handleContactSelect.bind(this);

    this.state = {};
  }
  handleContactSelect(e) {
    console.log('Contact Selected: ', e.target.value);
  }

  render() {
    const contactsList = this.props.contacts.map((item, index) => {
      return (
        <ListGroup.Item
          action
          key={index}
          value={index}
          onClick={this.handleContactSelect}
          style={{ fontSize: '20px' }}
        >
          {`Contact${index + 1}`}
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
            />
            <Button type='submit'>Submit</Button>
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
            <Nav.Link href='#'>Send Broadcast</Nav.Link>
          </Nav.Item>
        </Nav>

        {/* <hr style={{ fontSize: '20px', color: '#fff' }} /> */}
        <ListGroup variant='flush'>{contactsList}</ListGroup>
      </>
    );
  }
}
