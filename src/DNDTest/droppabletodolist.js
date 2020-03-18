import React from 'react';
import Draggable from './draggable';
import img from '../img/waxseal.png';

export default class DroppableTodolist extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      CardNodeNo: 0,
      todoInput: '',
      dummyInput: '',
      todotask: [],
      todoindex: -1
    }
    this.deletelist = this.deletelist.bind(this);
  }
  
  drop = (e)=> {
    e.preventDefault();
    const data = e.dataTransfer.getData('transfer');
    const target = this.state.dummyInput;
    e.target.parentNode.insertBefore(document.getElementById(data),document.getElementById(target));
    
  }

  allowDrop = (e)=> {
    e.preventDefault();
    this.setState({dummyInput: e.target.id});
  }

  drag = (e)=> {
    e.dataTransfer.setData('transfer', e.target.id);
    console.log(e.target.id);
  }

  noAlowDrop = (e)=> {
    e.stopPropagation();
  }

  addTodo =(e)=> {
    if(this.state.todoInput == '') {
      alert("Please type task!");
      return;
    }
    
    //Todoの数が増えたらstateも変更するようにする。出ないと、増えた際にReact側で再描画されない。(差分しか描画しないので)
    this.setState((state) => {
      return {todoindex: state.todoindex+1, dummyInput: state.todoInput, todoInput: ''}
    });

    const todotask = Object.assign([], this.state.todotask);
    todotask.push({id: this.state.todoindex+1, task: this.state.todoInput, isDone: 1});
    this.setState(()=> {return {todotask}});
  }
  
  handleInput = (e)=> {
    this.setState({
      todoInput: e.target.value
    })
  }

  btnClose =()=> {
    const textInputNode = document.getElementById("textInput"+this.props.CardNodeNo);
    const buttonNode = document.getElementById("addCardButton"+this.props.CardNodeNo);
    const btnNode = document.getElementById("closeBtn"+this.props.CardNodeNo);
    const addbtnNode = document.getElementById("plusAdd"+this.props.CardNodeNo);

    textInputNode.classList.add('nodisplay');
    buttonNode.classList.add('nodisplay');
    btnNode.classList.add('nodisplay');
    addbtnNode.classList.remove('nodisplay');
  }

  deleteTask = (event)=> {
    　
    const todotask = Object.assign([], this.state.todotask);
    todotask.splice(event.target.value, 1);
    console.log(todotask);

    // this.setState((state) => {
    //   return {
    //   todoindex: state.todoindex-1,
    //   todotask
    // }}
    // )

  }

  underline = (e)=> {
    let id=e.target.id;
    let obj = document.getElementById(id);
    obj.classList.add('underline');
    
  }

  deletelist () {
    return this.props.deletefunc();
  }

  componentDidMount() {
    
    const addaCard = document.getElementById("plusAdd"+this.props.CardNodeNo);
    const cardText = document.getElementById("textInput"+this.props.CardNodeNo);
    const addcardButton = document.getElementById("addCardButton"+this.props.CardNodeNo);
    const close = document.getElementById("closeBtn"+this.props.CardNodeNo);

    addaCard.addEventListener('click', function() {
      addaCard.classList.add('nodisplay');
      cardText.classList.remove('nodisplay');
      addcardButton.classList.remove('nodisplay');
      close.classList.remove('nodisplay');
    })
  }

  render() {
    return (
      <div  id={"taskcard" +this.props.CardNodeNo} onDrop={this.drop} onDragOver={this.allowDrop} >
        <ul className="taskUl">
          <img class="imgforlist" src={img} />
          <button id="closeCardNode" className="close ml-3 mr-1 mt-2" onClick={(e)=>{this.deletelist();}}>&times;</button>
          <h3 style={{textAlign: 'center', margin: 0}}>{this.props.listName}</h3>
          <hr />
          {this.state.todotask.filter(i=>i.task != null).map(i=> {
            return (
            <div key={i.id} id={this.props.id+ "-"+i.id} draggable="true" onDragStart={this.drag} onDragOver={this.noAlowDrop}>
            <div className="taskWrap">
              <li key={"todotasklist" + i.id} className="taskList">
                <p id={"p-"+this.state.CardNodeNo} style={{overflowWrap: 'break-word',
        　　　    wordWrap: 'break-word', margin: 0}} onClick={this.underline}>{i.task}</p>
              </li>
              <button type="button" className="close" value={this.state.todoindex} onClick={this.deleteTask} style={{paddingTop: 7}}>&times;</button>
            </div>
            </div>
            )
            })
          }
          <p id={"plusAdd"+this.props.CardNodeNo} className="addaCard">+ Add a card</p>
          <textarea
            id={"textInput"+this.props.CardNodeNo}
            className="form-control nodisplay"
            onChange={this.handleInput}
            value={this.state.todoInput}
            style={{marginBottom: 10}}
            placeholder="Type your new todo!" />
          <div className="flex" style={{display: 'flex'}}>
            <br />
            
              <button 
              id={"addCardButton"+this.props.CardNodeNo} 
              className ="addlistBtn nodisplay" 
              onClick={this.addTodo}
              >Add Card</button>
              <button id={"closeBtn"+this.props.CardNodeNo} type="button" className="close nodisplay" style={{fontSize: '35px', marginLeft: 10}} onClick={this.btnClose}>&times;</button>
            
          </div>
          </ul>
      </div>
      
    );
  }
}
// <div id={this.props.id} onDrop={this.drop} onDragOver={this.allowDrop} style={this.props.style}>
      //   {this.props.children}
      // </div>
{/* <div className="task-card" id={this.props.CardNodeNo} onDrop={this.drop} onDragOver={this.allowDrop} style={this.props.style}>
        <ul className="taskUl">
          <p >{this.props.listName}</p>
          <hr />
          
          {item}
          <p id={"plusAdd"+this.props.CardNodeNo} className="addaCard">+ Add a card</p>
          <textarea
            id={"textInput"+this.props.CardNodeNo}
            className="cardText nodisplay"
            onChange={this.handleInput}
            value={this.state.todoInput}
            placeholder="Type your new todo!" />
          <div className="flex" style={{display: 'flex'}}>
            <button 
            id={"addCardButton"+this.props.CardNodeNo} className ="addcardButton nodisplay" onClick={this.addTodo}>Add Card</button>
            <button id={"closeBtn"+this.props.CardNodeNo} type="button" className="close nodisplay" style={{fontSize: '35px', marginLeft:'10px'}} onClick={this.btnClose}>&times;</button>
          </div>
          </ul>
      </div> */}

