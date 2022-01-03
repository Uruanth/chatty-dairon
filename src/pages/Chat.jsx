import React, { Component } from "react";
import { auth } from "../services/firebase";
import { db } from "../services/firebase"

import { ref, onValue, set, push } from "firebase/database";


export class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: auth.currentUser,
      chats: [],
      content: '',
      readError: null,
      writeError: null
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  async componentDidMount() {
    this.setState({ readError: null });
    try {

      onValue(ref(db), (snapshot) => {
        const data = snapshot.val();
        let chats = Object.values(data.chats);
        this.setState({ chats });
        console.log(this.state.chats)
      });
    } catch (error) {
      this.setState({ readError: error.message });
    }
  }


  handleChange(event) {
    this.setState({
      content: event.target.value
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    this.setState({ writeError: null });
    console.log("submit1")
    try {

      let post = {
        content: this.state.content,
        timestamp: Date.now(),
        uid: this.state.user.uid
      }


      const postListRef = ref(db, 'chats');
      const newPostRef = push(postListRef);
      set(newPostRef, {
        content: this.state.content,
        timestamp: Date.now(),
        uid: this.state.user.uid
      });
      this.setState({ content: '' });
    } catch (error) {
      console.log("error")
      console.log(error)
      this.setState({ writeError: error.message });
    }
  }

  render() {
    return (
      <div>
        <div className="chats">
          {this.state.chats.map(chat => {
            return <p key={chat.timestap}>{chat.content}</p>
          })}
        </div>
        <form onSubmit={this.handleSubmit}>
          <input onChange={this.handleChange} value={this.state.content}></input>
          {this.state.error ? <p>{this.state.writeError}</p> : null}
          <button type="submit">Send</button>
        </form>
        <div>
          Login in as: <strong>{this.state.user.email}</strong>
        </div>
      </div>
    );
  }

}

export default Chat;