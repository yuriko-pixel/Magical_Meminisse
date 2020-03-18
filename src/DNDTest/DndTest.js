import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Draggable from './draggable';
import DroppableTodolist from './droppabletodolist';

const Wrapper = styled.div`
  width: 100%;
  padding: 32px;
  display: flex;
  justify-content: center;
`;

const droppableStyle = {
  backgroundColor: '#555',
  width: '250px',
  height: '400px',
  margin: '32px'
}
const Item = styled.div`
  padding: 8px;
  color: #555;
  background-color: white;
  border-radius: 3px;
`;

const droppablelist = [];

export default class DroppableDoing extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      draggableIndex: 0,
      listTitle: '',
      userInput: '',
      droppablelist: droppablelist,
    }
  }

  // drop = (e)=> {
  //   e.preventDefault();
  //   const data = e.dataTransfer.getData('transfer');
  //   e.target.appendChild(document.getElementById(data));
  // }

  // allowDrop = (e)=> {
  //   e.preventDefault();
  // }

  addTodo =(e)=> {
    e.preventDefault();
    if(this.state.userInput == '') {
      alert("Please type task!");
      return;
    }
    this.setState({
      draggableIndex: this.state.draggableIndex+1
    })
    
    //Reactの仕様的になぜかsetStateはすぐ更新されない(あくまで変更依頼するだけっぽい、なぜかidは更新されるが)のでlistNameにはusesrInputを渡す
    droppablelist.push({id: this.state.draggableIndex+1, listName: this.state.userInput});
  }
  
  handleInput = (e)=> {
    this.setState({
      userInput: e.target.value,
    })
  }

  // btnClose =()=> {
  //   const textInputNode = "textInput"+this.state.CardNodeNo;
  //   const buttonNode = "addCardButton"+this.state.CardNodeNo;
  //   const btnNode = "closeBtn"+this.state.CardNodeNo;
  //   const addbtnNode = "plusAdd"+this.state.CardNodeNo;

  //   document.getElementById(textInputNode).classList.add('nodisplay');
  //   document.getElementById(buttonNode).classList.add('nodisplay');
  //   document.getElementById(btnNode).classList.add('nodisplay');
  //   document.getElementById(addbtnNode).classList.remove('nodisplay');
  // }

  // deleteTask(event) {
  //   doingtask.splice(event.target.value, 1);
  //   this.setState({
  //     todoindex: this.state.todoindex-1
  //   })
  // }

  render() {
    const item = droppablelist.map(i=> {
    return <DroppableTodolist key={"drlist" + i.id}  listName={i.listName} CardNodeNo={i.id}/>
    });

    return (
      <Wrapper>
        <br />
        <div className="task-card">
          <textarea id={"draggablelistname"+this.state.draggableIndex}
              className="listinput"
              onChange={this.handleInput}
              value={this.state.input}
              placeholder="Enter list title..." />
          <button className="addlistButton" onClick={this.addTodo} >Add List</button>
          {item}
        </div>
        {/* <DroppableTodo id="dr1" style={droppableStyle} >
        </DroppableTodo> */}

        {/* <DroppableDoing id="dr2" style={droppableStyle} >
          <Draggable id="item1" style={{margin: '8px'}}><Item>Something</Item></Draggable>
          <Draggable id="item2" style={{margin: '8px'}}><Item>Some text</Item></Draggable>
        </DroppableDoing> */}
        {/* <DroppableDone id="dr3" style={droppableStyle} > */}
          
        {/* </DroppableDone> */}
      </Wrapper>
    );
  }
}
