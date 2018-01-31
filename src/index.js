import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'
import SortableComponent from './dragdrop'
import {arrayMove} from 'react-sortable-hoc';

class Header extends React.Component{
  render(){
    return(
      <div className="container">
        <div className="row">
          <div className="header">
            <h1 className="heading">Contact List</h1>
          <hr/>
          </div>
        </div>
      </div>

    )
  }
}

class DisplayContects extends React.Component{
  constructor(props){
    super(props);
    this.state={
      name: '',
      number: '',
      isEditing: false
    }
    this.editHandler=this.editHandler.bind(this);
    this.updateClick=this.updateClick.bind(this);
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
  editHandler(){
    let isEditing=this.state.isEditing
    // console.log("in editHandler");
    // console.log(this.props.val.name);
    isEditing = !isEditing;
    let newName= this.props.val.name;
    let newNum = this.props.val.number;
    this.setState({
      isEditing: isEditing,
      name:newName,
      number: newNum
    })
  }
  updateClick(val, name, number){
    this.editHandler();
    // console.log("in updateClick");
    this.props.updateHandler(val, name, number);
  }
  render(){
    return(
      <div key={this.props.i}>
        {
          this.state.isEditing?
          (<div>
            {/* <form> */}
              <input onChange={ (e)=>this.addUserName(e.target.value)} type="text" value={this.state.name} className="form-control"/>
              <input onChange={ (e)=>this.addUserNumber(e.target.value)} type="number"  value={this.state.number} className="form-control"/>
              {/* <button onClick={()=>this.editHandler()} className="btn btn-primary">Update</button> */}
              <button disabled={this.state.name!=="" && this.state.number!=="" && this.state.number>=1000000000 && this.state.number<=9999999999 ? false:true} onClick={()=>this.updateClick(this.props.val, this.state.name, this.state.number)} className="btn btn-primary">Update</button>

            {/* </form> */}
          </div>)
         :
        <div className="row">
          <div className="col-sm-4 contact-info">
            <h4>{this.props.val.name}</h4>
          </div>
          <div className="col-sm-4 contact-info">
            <h4>{this.props.val.number}</h4>
          </div>
          <div className="col-sm-4 contact-info">
            <button onClick={()=>this.props.deleteHandler(this.props.val)} className="btn btn-danger button-style">Delete</button>
            <button onClick={()=>this.editHandler()} className="btn btn-primary button-style">Edit</button>
          </div>
        </div>
      }
        <hr/>
      </div>
    )
  }
}

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
    this.changePage=this.changePage.bind(this);
    this.deleteHandler=this.deleteHandler.bind(this);
    // this.editHandler=this.editHandler.bind(this);
    this.updateHandler=this.updateHandler.bind(this);
    this.searchHandler = this.searchHandler.bind(this);
    this.onSortEnd=this.onSortEnd.bind(this);
    this.toggleRearrange=this.toggleRearrange.bind(this);
  }
  changePage() {
    let newStep = this.state.stepNo;
    newStep===1?newStep=2:newStep=1;
    this.setState({stepNo: newStep})
  }
  deleteHandler(val){
    const newState = this.state.nameList.slice();
    if (newState.indexOf(val) > -1) {
      newState.splice(newState.indexOf(val), 1);
      this.setState({
        nameList: newState
      })
    }
  }

  updateHandler(val, name, number){
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
  searchHandler(e){
    this.setState({searchString: e})
  }
  onSortEnd = ({oldIndex, newIndex}) => {
    this.setState({
      nameList: arrayMove(this.state.nameList, oldIndex, newIndex),
    });
  };
  toggleRearrange(){
    this.state.stepNo===3?
    this.setState({stepNo: 1}):this.setState({stepNo: 3});
  }

  render(){
      switch(this.state.stepNo) {
        case 2://input
        return(
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-md-offset-3">
              <p><input onChange={ (e)=>this.addUserName(e.target.value)} type='text' value={this.state.name} className="form-control" placeholder="Full Name"/></p>
              <p><input onChange={ (e)=>this.addUserNumber(e.target.value)} type='number' value={this.state.number} className="form-control" placeholder="10 digit Number"/></p>
              <p><button disabled={this.state.name!=="" && this.state.number!=="" && this.state.number>=1000000000 && this.state.number<=9999999999 ? false:true} onClick={(e)=>this.addToList(this.state.name, this.state.number)} className="form-control btn btn-success">Create Contact</button></p>
              <button onClick = {this.changePage} className="form-control btn btn-primary">Contact List</button>
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
                    <button onClick = {this.changePage} className="form-control btn btn-primary">Add Contact</button>
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
                  <p><input type="text" onChange={(e)=>this.searchHandler(e.target.value)} className="form-control" value={this.state.searchString} placeholder="Search"/></p>
                  {
                    this.state.nameList.map( (val, i)=>
                      val.name.toLowerCase().includes(this.state.searchString.toLowerCase())||val.number.toLowerCase().includes(this.state.searchString.toLowerCase())?<DisplayContects val={val} key={i} i={i} deleteHandler={this.deleteHandler} editHandler={this.editHandler} updateHandler={this.updateHandler}/>:null
                    )
                  }
                  <div className="col-sm-6">
                    <button onClick = {this.toggleRearrange} className="form-control btn btn-primary">Rearrange</button>
                  </div>
                  <div className="col-sm-6">
                    <button onClick = {this.changePage} className="form-control btn btn-primary">New Contact</button>
                  </div>
                </div>
              </div>
            </div>
            )
          }
          case 3:
          return(
            <div>
              <SortableComponent nameList={this.state.nameList} onSortEnd={this.onSortEnd} toggleRearrange={this.toggleRearrange}/>
            </div>
          )
          default: return(<div>hola</div>)
      }
  }
}



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
