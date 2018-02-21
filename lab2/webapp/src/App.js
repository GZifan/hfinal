import React, { Component } from 'react';
import './App.css';
import mySocket from 'socket.io-client';


class App extends Component {
    
    constructor(props){
        super(props);
      
        this.state ={
          serMsg:"",
          myGreeting:"",
          status:""
      }
        
        this.talkToSer = this.talkToSer.bind(this);
    }
    componentDidMount(){
        setInterval(this.talkToSer,1000);
        this.socket = mySocket("http://localhost:10001");
        this.socket.on("newperson",()=> {
            //alert("Someone came into the server")
        });
        
        this.socket.on("isTyping",()=>{
            this.setState({
                status:"Someone is typing"
            });
            setTimeout(()=>{
                this.setState({
                    status:""
                })
            },1000);
        })
    }
    
    talkToSer(){
        console.log("talk");
        fetch("/greeting").then((resp) => {
            return resp.text();
        }).then((text)=>{
            this.setState({
                serMsg:text
            })
        })
    }
    
    handleGreeting(evt){
        this.socket.emit("Typing");
        this.setState({
            myGreeting:evt.target.value
        })
    }
    
    addGreeting(){
        fetch("/add/"+ this.state.myGreeting)
    }
    
  render() {
    return (
      <div className="App">
            Welcome to my app. <br/>
            <button onClick = {this.talkToSer}>Speak with the server</button>
            <hr />
            {this.state.serMsg}
            <hr />
            <input type ="text" placeholder ="Add your greettings" 
            onChange= {this.handleGreeting.bind(this)}/>
            <button onClick = {this.addGreeting.bind(this)}>Add</button>
            {this.state.status}
            
      </div>
    );
  }
}

export default App;
