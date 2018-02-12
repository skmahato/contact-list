import React from 'react';

class Header extends React.Component{
  render(){
    return(
      <div className="container">
        <div className="row">
          <div className="col-md-6 col-md-offset-3">
            <div className="header">
              <h1 className="heading">Contact List</h1>
            <hr/>
            </div>
          </div>
        </div>
      </div>

    )
  }
}

export default Header
