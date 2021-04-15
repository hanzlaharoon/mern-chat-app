import React, { Component } from 'react';
import LeftSidebar from './leftsidebar';
import RightSidebar from './rightsidebar';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';

export default class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedChat: 0,
      contacts: [],
    };
  }
  componentDidMount() {
    let arr = ['Contact1', 'Contact2', 'Contact3'];
    // let arr = Array(15).fill(1);
    this.setState({ contacts: arr });
  }
  render() {
    return (
      <>
        <div className='row'>
          <div className='col-3' style={{ borderRight: '1px solid #e3e3e3' }}>
            <LeftSidebar contacts={this.state.contacts} />
          </div>
          <div className='col-9'>
            <RightSidebar />
          </div>
        </div>
      </>
    );
  }
}
