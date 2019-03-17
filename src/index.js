import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css'
import Header from './header'
import InputFields from './inputFields'

class ContactList extends Component {
  render() {
    return (
      <div>
        <Header />
        <InputFields />
      </div>
    );
  }
}

ReactDOM.render(
  <ContactList />,
  document.getElementById('root')
);
