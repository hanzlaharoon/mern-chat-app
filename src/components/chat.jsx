import axios from 'axios';
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
    this.handleSetChat = this.handleSetChat.bind(this);
    this.fectchData = this.fectchData.bind(this);
  }
  componentDidMount() {
    // let arr = ['Contact1', 'Contact2', 'Contact3'];
    // this.setState({ contacts: arr });

    this.fectchData();
  }

  fectchData() {
    axios.get('http://localhost:4000/contact').then((res) => {
      console.log('/contact ', res);
      if (res.data) {
        this.setState({ contacts: res.data }, () => {
          if (this.state.selectedChat === 0 && this.state.contacts.length > 0)
            this.setState({ selectedChat: this.state.contacts[0]._id });
        });
      }
    });
  }

  handleSetChat(value) {
    this.setState({ selectedChat: value });
  }

  render() {
    return (
      <>
        <div className='row'>
          <div className='col-3' style={{ borderRight: '1px solid #e3e3e3' }}>
            <LeftSidebar
              {...this.state}
              handleSetChat={this.handleSetChat}
              handleUpdate={this.fectchData}
            />
          </div>
          <div className='col-9'>
            <RightSidebar
              contact={this.state.contacts.find(
                (i) => i._id === this.state.selectedChat
              )}
              handleUpdate={this.fectchData}
            />
          </div>
        </div>
      </>
    );
  }
}
