import React, {Component} from 'react';
import './App.scss';
import AppRouter from "./AppRouter";

export class App extends Component{
    componentDidMount() {
        document.body.requestFullscreen();
    }

    render() {
    return (
        <div className='app-container'>
            <AppRouter/>
        </div>
    )
  }
}