import React, { Component } from 'react'

export class Messages extends Component {
  
  render() {
    const {user, userTypings, messages} = this.props
    console.log(userTypings)
    return (
      <div>
        <div className="messages">
        {
          messages.map((chat) => {
            return (
              <div key={chat.id}>
                <div>{chat.message}</div>
                <div>{chat.sender.name}</div>
                <div>{chat.time}</div>
              </div>
            )
          })
        }

        {
          userTypings.map((userName) => {
            return (
              <div key={userName}>
                {`${userName}  is typing...`}
              </div>
            )
          })
        }
                        </div>
      </div>
    )
  }
}

export default Messages
