import React, { Component } from 'react';

class DisplayContacts extends Component{
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
    this.props.updateHandler(val, name, number)
      .then(response => {
        if (response.status === 200) {
          this.editHandler();
        }
      });
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
    const { errors } = this.props;
    const { name, number } = this.state;
    const disabled = name === "" || number === "" || number < 1000000000 || number > 9999999999;

    return(
      <div>
          <input
            onChange = { this.addUserName }
            type = "text"
            value = { name }
            className = "form-control"
          />
          <p>{errors && errors.name}</p>
          <input
            onChange = { this.addUserNumber }
            type = "number"
            value = { number }
            className = "form-control"
          />
          <p>{errors && errors.number}</p>
          <div className = "row buttons-style">
            <div className = "col-sm-6">
              <button
                onClick = { () => this.editHandler() }
                className = "form-control btn btn-primary">
                Cancel
              </button>
            </div>

            <div className = "col-sm-6">
              <button
                disabled = { disabled }
                onClick = { () => this.updateClick(this.props.val, name, number) }
                className = "form-control btn btn-primary">
                Update
              </button>
            </div>
          </div>
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

export default DisplayContacts
