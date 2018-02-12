import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'
import Header from './header'
import InputFields from './inputFields'

class Testing extends React.Component {

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
  <Testing />,
  document.getElementById('root')
);
