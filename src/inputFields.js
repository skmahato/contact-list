import React from 'react';
import SortableComponent from './dragdrop'
import DisplayContects from './displayContects'
import {arrayMove} from 'react-sortable-hoc';

class InputFields extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      name: '',
      number: '',
      nameList: [],
      stepNo: 1,
      searchString: ""
    };
  }

  changePage=()=> {
    let newStep = this.state.stepNo;
    newStep===1?newStep=2:newStep=1;
    this.setState({stepNo: newStep})
  }

  deleteHandler=(val)=>{
    const newState = this.state.nameList.slice();
    if (newState.indexOf(val) > -1) {
      newState.splice(newState.indexOf(val), 1);
      this.setState({
        nameList: newState
      })
    }
  }

  updateHandler=(val, name, number)=>{
    let valIndex=this.state.nameList.indexOf(val)
    let input = {
      'name': name,
      'number': number
    }
    const newState = this.state.nameList.slice();
    if (valIndex > -1) {
      newState.splice(valIndex, 1, input);
      this.setState({
        nameList: newState
      })
    }
  }

  addUserName(input){
    this.setState({
      name: input,
    })
  }

  addUserNumber(input){
    this.setState({
      number: input,
    })
  }

  addToList(name, number){
    let temp = this.state.nameList
    let input = {
      'name': name,
      'number': number
    }
    temp.push(input);
    let newStep = this.state.stepNo;
    newStep===1?newStep=2:newStep=1;
    // this.setState({stepNo: newStep});
    this.setState({
      nameList: temp,
      stepNo: newStep,
      name: '',
      number: '',
      searchString: ''
    })
  }

  searchHandler=(e)=>{
    this.setState({searchString: e})
  }

  onSortEnd = ({oldIndex, newIndex}) => {
    this.setState({
      nameList: arrayMove(this.state.nameList, oldIndex, newIndex),
    });
  };

  toggleRearrange=()=>{
    this.state.stepNo===3?
    this.setState({stepNo: 1}):this.setState({stepNo: 3});
  }

  render(){
    const PAGE_RENDER=this.state.stepNo
      switch(PAGE_RENDER) {
        
        case 2://input
        return(
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-md-offset-3">
              <p>
                <input
                  onChange={ (e)=>this.addUserName(e.target.value)}
                  type='text' value={this.state.name}
                  className="form-control"
                  placeholder="Full Name"
                />
              </p>
              <p>
                <input
                  onChange={ (e)=>this.addUserNumber(e.target.value)}
                  type='number' value={this.state.number}
                  className="form-control"
                  placeholder="10 digit Number"
                />
              </p>
              <p>
                <button
                  disabled={
                    this.state.name!==""
                    &&
                    this.state.number!==""
                    &&
                    this.state.number>=1000000000
                    &&
                    this.state.number<=9999999999
                    ?
                    false
                    :
                    true
                  }
                  onClick={(e)=>this.addToList(this.state.name, this.state.number)}
                  className="form-control btn btn-success">
                  Create Contact
                </button>
              </p>
              <button
                onClick = {this.changePage}
                className="form-control btn btn-primary">
                Contact List
              </button>
            </div>
          </div>
        </div>)

        case 1://display contacts
          if (this.state.nameList.length === 0) {
            return (
              <div className="container">
                <div className="row">
                  <div className="col-md-6 col-md-offset-3">
                    <p className="no-contents">No Contacts to Display... Add Contact!</p>
                    <button
                      onClick = {this.changePage}
                      className="form-control btn btn-primary">
                      Add Contact
                    </button>
                  </div>
                </div>
              </div>
            )
          }
          else {
            return(
            <div className="container">
              <div className="row">
                <div className="col-md-6 col-md-offset-3">
                  <p>
                    <input
                      type="text"
                      onChange={(e)=>this.searchHandler(e.target.value)}
                      className="form-control"
                      value={this.state.searchString}
                      placeholder="Search"
                    />
                  </p>
                  {
                    this.state.nameList.map( (val, i)=>
                      val.name.toLowerCase().includes(this.state.searchString.toLowerCase())
                      ||
                      val.number.toLowerCase().includes(this.state.searchString.toLowerCase())
                      ?
                      <DisplayContects
                        val={val} key={i} i={i}
                        deleteHandler={this.deleteHandler}
                        editHandler={this.editHandler}
                        updateHandler={this.updateHandler}
                      />
                      :
                      null
                    )
                  }
                  <div className="row buttons-style">
                    <div className="col-sm-6">
                      <button
                        onClick = {this.toggleRearrange}
                        className="form-control btn btn-primary">
                        Rearrange
                      </button>
                    </div>
                    <div className="col-sm-6">
                      <button
                        onClick = {this.changePage}
                        className="form-control btn btn-primary">
                        New Contact
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            )
          }

          case 3:
          return(
            <div>
              <SortableComponent
                nameList={this.state.nameList}
                onSortEnd={this.onSortEnd}
                toggleRearrange={this.toggleRearrange}
              />
            </div>
          )
          default: return(<div></div>)
      }
  }
}

export default InputFields
