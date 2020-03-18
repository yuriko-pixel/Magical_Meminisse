import React from 'react';
import styled from 'styled-components';
import logo from './logo.svg';
import './App.css';
import PropTypes from 'prop-types';
import { render } from '@testing-library/react';
import DndTest from './DNDTest/DndTest';
import Draggable from './DNDTest/draggable';
import Dndtest from './DNDTest/DND';

// import Done from './MyTodoList/Done'
// import Doing from './MyTodoList/Doing';
// import ToDoParts from './MyTodoList/ToDo';

const task = [];

class MyToDoList extends React.Component {

  //普通のJavascript functionを実装したかったけど、なんかここでしか動かない...
  componentDidMount() {
    //tagetclassグループで指定
    const targets = document.getElementsByClassName('addaCard');
    const cardText = document.getElementsByClassName('cardText');
    const button = document.getElementsByClassName('addcardButton');
    const closeButton = document.getElementsByClassName('close');

  //for分で要素数分ループ処理
      for(let i = 0; i < targets.length; i++){
        //クリックイベントでアラートを表示する
          targets[i].addEventListener('click', () => {
          targets[i].classList.add("nodisplay");
          cardText[i].classList.remove("nodisplay");
          button[i].classList.remove("nodisplay");
          closeButton[i].classList.remove("nodisplay");
          }, false);
      }
    }

  render() {
   return (
     <div>
       <nav><h1 className="title">Magical Meminisse</h1></nav>
       <br />
          <div className="whole-task">
            <br />
            <div className="task-wrap">
            {/* <DndTest /> */}
            <Dndtest />
            </div>
          </div>
      </div>
    );
  }
};




export default MyToDoList;