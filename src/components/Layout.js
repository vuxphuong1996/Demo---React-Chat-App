import React, { Component } from 'react'
import ChatContainer from './chat/ChatContainer'
import io from 'socket.io-client'
import LoginForm from './LoginForm'
import {USER_CONNECTED} from '../Constant'

const socketUrl = "192.168.1.3:3231"

export class Layout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: null,
      socket: null
    }
  }
  componentWillMount = () => {
    this.initSocket()
  }

  initSocket = () => {
    const socket = io(socketUrl)
    socket.on("connection", () => {
      console.log("Connected")
    })
    this.setState({socket})
  }

  setUser = (user) => {
    const {socket} = this.state
    this.setState({user})
    socket.emit(USER_CONNECTED, user)
  }

  render() {
    const {user, socket} = this.state
    return (
      <div>
        {
            !user
            ? <LoginForm socket={socket} setUser={this.setUser}/>
            : <ChatContainer socket={socket} user={user}/>
        }
      </div>
    )
  }
}

export default Layout
