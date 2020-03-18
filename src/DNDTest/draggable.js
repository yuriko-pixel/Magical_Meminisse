import React from 'react';

export default class Draggable extends React.Component {

  drag = (e)=> {
    e.dataTransfer.setData('transfer', e.target.id);
  }

  noAlowDrop = (e)=> {
    e.stopPropagation();
  }

  render() {    
    return (
      <div id={this.props.id} draggable="true" onDragStart={this.drag} onDragOver={this.noAlowDrop} style={this.props.style}>
        {this.props.task}
      </div>
    )
  }
}
