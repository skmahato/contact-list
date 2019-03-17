import React, { Component } from 'react';
import { arrayMove } from 'react-sortable-hoc';

import { getContacts, newContact, updateContact, deleteContact } from './ajax'
import SortableComponent from './dragdrop'
import DisplayContacts from './displayContacts'

class InputFields extends Component{
  state = {
    name: '',
    number: '',
    nameList: [],
    stepNo: 1,
    searchString: "",
    errors: null
  };

  componentDidMount() {
    getContacts()
      .then(response => {
        this.setState({nameList: response.data})
      })
      .catch(error => console.log(error));
  }


  changePage = () => {
    let newStep = this.state.stepNo;
    newStep === 1 ? newStep = 2 : newStep = 1;
    this.setState({ stepNo: newStep, errors: null })
  }

  deleteHandler = (val) => {
    let response;
    const newState = [...this.state.nameList];
    if ( newState.indexOf(val) > -1 ) {
      newState.splice(newState.indexOf(val), 1);

      response = deleteContact(val)
        .then(response => {
          if (response.status === 200) {
            this.setState({
              ...this.state,
              nameList: newState
            })
          }
          return response;
        })
        .catch(error => {
          this.setState({...this.state, errors: error.response.data.errors})
          return error;
        });
    }

    return response;
  }

  updateHandler = (val, name, number) => {
    let valIndex = this.state.nameList.indexOf(val);
    let response;
    let input = {
      id: val.id,
      name: name,
      number: number
    }
    const newState = this.state.nameList.slice();
    if ( valIndex > -1 ) {
      newState.splice(valIndex, 1, input);

      response = updateContact(val, input)
        .then(response => {
          if (response.status === 200) {
            this.setState({
              ...this.state,
              nameList: newState
            })
          }
          return response;
        })
        .catch(error => {
          this.setState({...this.state, errors: error.response.data.errors})
          return error;
        });
    }
    return response;
  }

  addUserName = (e) => this.setState({ name: e.target.value })

  addUserNumber = (e) => this.setState({ number: e.target.value })

  addToList(name, number){
    let temp = this.state.nameList
    let input = {
      'name': name,
      'number': number
    }
    newContact(input)
      .then(response => {
        if (response.status === 200) {
          temp.push(input);
          let newStep = this.state.stepNo;
          newStep === 1 ? newStep = 2 : newStep= 1;
          this.setState({
            nameList: temp,
            stepNo: newStep,
            name: '',
            number: '',
            searchString: ''
          })
        }
        return response;
      })
      .catch(error => {
        this.setState({...this.state, errors: error.response.data.errors})
        return error;
      });
  }

  searchHandler = (e) => this.setState({ searchString: e.target.value })

  onSortEnd = ({oldIndex, newIndex}) => this.setState({ nameList: arrayMove(this.state.nameList, oldIndex, newIndex) });

  toggleRearrange = () => {
    this.state.stepNo === 3 ?
    this.setState({ stepNo: 1 }) : this.setState({ stepNo: 3 });
  }

  noContentHandler = () => {
    return (
      <div className = "container">
        <div className = "row">
          <div className = "col-md-6 col-md-offset-3">
            <p className = "no-contents">No Contacts to Display... Add Contact!</p>
            <button
              onClick = { this.changePage }
              className = "form-control btn btn-primary">
              Add Contact
            </button>
          </div>
        </div>
      </div>
    )
  }

  contactListAndSearchResult = () => {
    return(
    <div className = "container">
      <div className = "row">
        <div className = "col-md-6 col-md-offset-3">
          <p>
            <input
              type = "text"
              onChange = { this.searchHandler }
              className = "form-control"
              value = { this.state.searchString }
              placeholder = "Search"
            />
          </p>
          {
            this.state.nameList.map((val, i) =>
              val.name.toLowerCase().includes(this.state.searchString.toLowerCase())
              ||
              val.number.toLowerCase().includes(this.state.searchString.toLowerCase())
              ?
              <DisplayContacts
                val = {val} key = {i} i = {i}
                deleteHandler = {this.deleteHandler}
                editHandler = {this.editHandler}
                updateHandler = {this.updateHandler}
                errors = {this.state.errors}
              />
              :
              null
            )
          }
          <div className = "row buttons-style">
            <div className = "col-sm-6">
              <button
                onClick = {this.toggleRearrange}
                className = "form-control btn btn-primary">
                Rearrange
              </button>
            </div>
            <div className = "col-sm-6">
              <button
                onClick = {this.changePage}
                className = "form-control btn btn-primary">
                New Contact
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
  }

  inputFieldsHandler = () => {
    const { errors } = this.state;

    return(
      <div className = "container">
        <div className = "row">
          <div className = "col-md-6 col-md-offset-3">
            <p>
              <input
                onChange = { this.addUserName }
                type = 'text'
                value = { this.state.name }
                className = "form-control"
                placeholder = "Full Name"
              />
            </p>
            <p>{errors && errors.name}</p>
            <p>
              <input
                onChange = { this.addUserNumber }
                type = 'number'
                value = { this.state.number }
                className = "form-control"
                placeholder = "10 digit Number"
              />
            </p>
            <p>{errors && errors.number}</p>
            <p>
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
                onClick = { (e) => this.addToList(this.state.name, this.state.number)}
                className = "form-control btn btn-success">
                Create Contact
              </button>
            </p>
            <button
              onClick = {this.changePage}
              className = "form-control btn btn-primary">
              Contact List
            </button>
          </div>
        </div>
      </div>
    )
  }

  render(){
    const PAGE_RENDER = this.state.stepNo
      switch(PAGE_RENDER) {

        case 1://display contacts
          if ( this.state.nameList.length === 0 ) {
            return (
              this.noContentHandler()
            )
          }
          else {
            return(
            this.contactListAndSearchResult()
            )
          }

        case 2://input
          return(
            this.inputFieldsHandler()
          )

          case 3://rearrange list
          return(
            <div>
              <p className = "no-contents">Drag And Drop To Re-arrange...!</p>
              <SortableComponent
                nameList = { this.state.nameList }
                onSortEnd = { this.onSortEnd }
                toggleRearrange = { this.toggleRearrange }
              />
            </div>
          )
          default: return( <div></div> )
      }
  }
}

export default InputFields
