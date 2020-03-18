import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Draggable from './draggable';
import Droppable from './droppable';
import DroppableTodolist from './droppabletodolist';
import img from '../img/waxseal.png';

const Wrapper = styled.div`
  width: 100%;
  padding: 32px;
  display: flex;
  justify-content: center;
`;


// const droppablelist = [];

export default class Dndtest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      draggableIndex: 0,
      listName: '',
      listlength: 0,
      userInput: '',
      droppablelist: []
    }
    this.cardDelete = this.cardDelete.bind(this);
  }

  addTodo =(e)=> {
    e.preventDefault();
    if(this.state.userInput == '') {
      alert("Please type task!");
      return;
    }

    this.setState((state)=>{
      return {draggableIndex: state.draggableIndex+1}
    });
    
    //Reactの仕様的になぜかsetStateはすぐ更新されない(あくまで変更依頼するだけっぽい、なぜかidは更新されるが)のでlistNameにはusesrInputを渡す
    const droppablelist = Object.assign([], this.state.droppablelist);
    droppablelist.push({id: this.state.draggableIndex+1, listName: this.state.userInput, listlength:    this.state.droppablelist.length});
    this.setState(()=> {return {droppablelist}});
  }
  
  handleInput = (e)=> {
    this.setState({
      userInput: e.target.value,
    })
  }

  cardDelete (listlength) {
    const droppablelist = Object.assign([], this.state.droppablelist);
    droppablelist.splice(listlength, 1);

    //削除したリストノードが作成済みリストノードの最後のノードでない場合は、配列内でのインデックス情報を更新する
    if(listlength-1 != this.state.draggableIndex) {
      for(let i=listlength; i<this.state.draggableIndex-1; i++) {
        droppablelist[i].listlength = i;
      }
    }
    console.log(droppablelist);
    this.setState((state)=> {
      return {draggableIndex: state.draggableIndex-1,droppablelist}
    });
  }

  componentDidMount() {
    const addaList = document.getElementsByClassName('addaList')[0];
    const listinput = document.getElementById("draggablelistname"+this.state.draggableIndex);
    const addlistButton = document.getElementById('addlist');
    const closelist = document.getElementById('closelist');
    
    addaList.addEventListener('click', function() {
      addaList.classList.add('nodisplay');
      listinput.classList.remove('nodisplay');
      addlistButton.classList.remove('nodisplay');
      closelist.classList.remove('nodisplay');
    })
  }

  render() {
    const item = this.state.droppablelist.filter(i=> i.id != null).map(i=> {
      return (
        <DroppableTodolist 
        id={"dr -"+i.id} key={"drlist" + i.id} listName={i.listName} CardNodeNo={i.id} 
        deletefunc={(e)=>{this.cardDelete(i.listlength);}}
        >
        </DroppableTodolist>
      )
      });
      
    return (
      <div>
        <div className="task-card">
          <img class="img" src={img} />
          <p className="addaList">+ Add a list</p>
          <textarea id={"draggablelistname"+this.state.draggableIndex}
              className="form-control nodisplay"
              onChange={this.handleInput}
              value={this.state.input}
              placeholder="Enter list title..." />
          <div className="flex">
            <button id="addlist" className="addlistBtn mt-2 nodisplay" onClick={this.addTodo} >Add List</button>
            <button id="closelist" className="close mx-4 mt-2 nodisplay">&times;</button>
          </div>
        </div>
        <Wrapper>
        {item}
        </Wrapper>
      </div>
    );
  }
}
 {/* <Droppable id="dra1" style={droppableStyle}>
            <Draggable id="dro1" >
              <div className="taskWrap">
                  <li key={"todotasklist"} className="taskList">text</li>
              <button type="button" className="close" >&times;</button>
              </div></Draggable>
            <Draggable id="dro2" ><Item>Some text</Item></Draggable>
          </Droppable>
          <Droppable id="dra2" style={droppableStyle}></Droppable>
        </Wrapper> */}
        