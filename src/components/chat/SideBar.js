import React, { Component } from 'react'

export class SideBar extends Component {
  render() {
    const { activeChat, user, setActiveChat, chats } = this.props
    return (
      <div>
        <div onClick={(e) => { (e.target === this.refs.user) && setActiveChat(null) }}>
          {
            
            chats.map((chat) => {
              console.log(chat);
              if(chat.name) {
                // co 1 message thi - 1 la lay message[0]
                const lastMessage = chat.messages[chat.messages.length - 1]
                return (
                  <div key={chat.id}
                    onClick={() => { setActiveChat(chat)}}
                  >
                    {lastMessage && <div>{lastMessage.sender.toUpperCase()}</div>}
                    {lastMessage && <div className="last-message">{lastMessage.message}</div>}
                  </div>
                )
              }

              return null
            })
          }

        </div>
        <div className="sidebar">
          <h2>{user.name}</h2>
          <button type="button">Logout</button>
        </div>
      </div>
    )
  }
}

export default SideBar
