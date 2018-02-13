import React, { Component } from 'react';

class DisplayContects extends Component{
  state = {
    name: '',
    number: '',
    isEditing: false
  };

  addUserName = (e) => this.setState({ name: e.target.value })

  addUserNumber = (e) => this.setState({ number: e.target.value })

  editHandler = () => {
    let isEditing=this.state.isEditing
    isEditing = !isEditing;
    let newName = this.props.val.name;
    let newNum = this.props.val.number;
    this.setState({
      isEditing: isEditing,
      name: newName,
      number: newNum
    })
  }

  updateClick = (val, name, number) => {
    this.editHandler();
    this.props.updateHandler(val, name, number);
  }

  listElement = () => {
    return(
      <div className = "row list-style contact-info">
        <div className = "col-sm-4 contact-info">
          <h4>{ this.props.val.name }</h4>
        </div>
        <div className = "col-sm-4 contact-info">
          <h4>{ this.props.val.number }</h4>
        </div>
        <div className = "col-sm-4 contact-info">
          <button
            onClick = { () => this.props.deleteHandler(this.props.val) }
            className = "btn btn-danger button-style">
            Delete
          </button>
          <button
            onClick = { () => this.editHandler() }
            className = "btn btn-primary button-style">
            Edit
          </button>
        </div>
      </div>
    )
  }

  updateElement = () => {
    return(
      <div>
          <input
            onChange = { this.addUserName }
            type = "text"
            value = { this.state.name }
            className = "form-control"
          />
          <input
            onChange = { this.addUserNumber }
            type = "number"
            value = { this.state.number }
            className = "form-control"
          />
          <button
            disabled = {
              this.state.name !== ""
              &&
              this.state.number !== ""
              &&
              this.state.number >= 1000000000
              &&
              this.state.number <= 9999999999
              ?
              false
              :
              true
            }
            onClick = { () => this.updateClick(this.props.val, this.state.name, this.state.number) }
            className = "form-control btn btn-primary">
            Update
          </button>
      </div>
    )
  }

  render(){
    return(
      <div key = { this.props.i }>
        {
          this.state.isEditing ? this.updateElement() : this.listElement()
        }
      </div>
    )
  }
}

export default DisplayContects
