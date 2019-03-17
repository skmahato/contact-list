import React, { Component } from 'react';
import{ SortableContainer, SortableElement } from 'react-sortable-hoc';

const SortableItem = SortableElement(({value}) =>
  <div className = "odd-even col-md-6 col-md-offset-3">
    <div className = "row reorder-style">
      <div className = "col-sm-6">
         <p>{ value.name }</p>
      </div>
      <div className = "col-sm-6">
        <p>{ value.number }</p>
      </div>
    </div>
  </div>
);

const SortableList = SortableContainer(({items}) => {
  return (
    <div className = "container">
      {
        items ? items.map((value, index) => (
          <SortableItem
            key = {`item-${index}`}
            index = {index}
            value = {value}
          />
        )) : null
      }
    </div>
  );
});

class SortableComponent extends Component {
  render() {
    return(
      <div>
        <SortableList
          items = { this.props.nameList }
          onSortEnd = { this.props.onSortEnd }
        />
        <div className = "container">
          <div className = "row buttons-style">
            <div className = "col-md-6 col-md-offset-3">
              <button
                onClick = { this.props.toggleRearrange }
                className = "form-control btn btn-primary">
                Back
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default  SortableComponent
