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
    const { name, number } = this.props.val;
    this.setState({
      isEditing: !this.state.isEditing,
      name,
      number
    })
  }

  updateClick = (val, name, number) => {
    this.props.updateHandler(val, name, number)
      .then(response => {
        if (!response.errors) {
          this.editHandler();
        }
      });
  }

  listElement = () => {
    const { val, deleteHandler } = this.props;
    return(
      <div className = "row list-style contact-info">
        <div className = "col-sm-4 contact-info">
          <h4>{val.name}</h4>
        </div>
        <div className = "col-sm-4 contact-info">
          <h4>{val.number}</h4>
        </div>
        <div className = "col-sm-4 contact-info">
          <button
            onClick = {() => deleteHandler(this.props.val)}
            className = "btn btn-danger button-style">
            Delete
          </button>
          <button
            onClick = {() => this.editHandler()}
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
