import React from 'react';

class DisplayContects extends React.Component{
  constructor(props){
    super(props);
    this.state={
      name: '',
      number: '',
      isEditing: false
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

  editHandler=()=>{
    let isEditing=this.state.isEditing
    isEditing = !isEditing;
    let newName= this.props.val.name;
    let newNum = this.props.val.number;
    this.setState({
      isEditing: isEditing,
      name:newName,
      number: newNum
    })
  }

  updateClick=(val, name, number)=>{
    this.editHandler();
    this.props.updateHandler(val, name, number);
  }

  render(){
    return(
      <div key={this.props.i}>
        {
          this.state.isEditing?
          (<div>
              <input
                onChange={ (e)=>this.addUserName(e.target.value)}
                type="text"
                value={this.state.name}
                className="form-control"
              />
              <input
                onChange={ (e)=>this.addUserNumber(e.target.value)}
                type="number"
                value={this.state.number}
                className="form-control"
              />
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
                onClick={()=>this.updateClick(this.props.val, this.state.name, this.state.number)}
                className="form-control btn btn-primary">
                Update
              </button>
          </div>)
         :
           <div className="row list-style">
             <div className="col-sm-4 contact-info">
               <h4>{this.props.val.name}</h4>
             </div>
             <div className="col-sm-4 contact-info">
               <h4>{this.props.val.number}</h4>
             </div>
             <div className="col-sm-4 contact-info">
               <button
                 onClick={()=>this.props.deleteHandler(this.props.val)}
                 className="btn btn-danger button-style">
                 Delete
               </button>
               <button
                 onClick={()=>this.editHandler()}
                 className="btn btn-primary button-style">
                 Edit
               </button>
             </div>
           </div>
      }
      </div>
    )
  }
}

export default DisplayContects
