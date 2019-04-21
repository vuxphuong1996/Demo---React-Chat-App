import React, { Component } from 'react'
import { COMMUNITY_CHAT, MESSAGE_RECIEVED, TYPING, MESSAGE_SENT } from '../../Constant'
import SideBar from './SideBar'
import ChatHeading from './ChatHeading'
import Messages from '../message/Messages'
import MessagesInput from '../message/MessagesInput'

export class ChatContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            chats: [],
            activeChat: null
        }

    }
    // sau khi render xong thi thuc hien
    componentDidMount() {
        const { socket } = this.props
        socket.emit(COMMUNITY_CHAT, this.resetChat)
    }

	/*
	*	Reset the chat back to only the chat passed in.
	* 	@param chat {Chat}
	*/
    resetChat = (chat) => {
        this.addChat(chat, true)
    }

    /*
	*	Adds chat to the chat container, if reset is true removes all chats
	*	and sets that chat to the main chat.
	*	Sets the message and typing socket events for the chat.
	*	
	*	@param chat {Chat} the chat to be added.
	*	@param reset {boolean} if true will set the chat as the only chat.
    */
    addChat = (chat, reset) => {
        const { chats } = this.state
        const { socket } = this.props

        const newChats = reset ? [chat] : [...chats, chat]
        this.setState({ chats: newChats, activeChat: reset ? chat : this.state.activeChat })

        // socket.on(`${TYPING}-${chat.id}`, this.updateTypingInChat(chat.id))
        // socket.on(`${MESSAGE_RECIEVED}-${chat.id}`, this.addMessageToChat(chat.id))

        socket.on(`${MESSAGE_RECIEVED}-${chat.id}`, this.addMessageToChat(chat.id))
        socket.on(`${TYPING}-${chat.id}`, this.updateTypingInChat(chat.id))
    }


    /*
	*	Updates the typing of chat with id passed in.
	*	@param chatId {number}
	*/
    updateTypingInChat = (chatId) => {
        return ({ sender, isTyping }) => {
            if (sender !== this.props.user.name) {
                const { chats } = this.state

                let newChats = chats.map((chat) => {
                    if (chat.id === chatId) {
                        if (isTyping && !chat.userTypings.includes(sender)) {
                            chat.userTypings.push(sender)
                        } else if (!isTyping && chat.userTypings.includes(sender)) {
                            chat.userTypings = chat.userTypings.filter(e => e !== sender)
                        }
                    }
                    return chat
                })
                this.setState({ chats: newChats })
            }
        }
    }
    
    addMessageToChat = (chatId) => {
        return (message) => {
            const { chats } = this.state
            let newChats = chats.map((chat) => {
                if (chat.id === chatId) {
                    chat.messages.push(message)
                    
                }
                return chat

            })
            this.setState({ chats: newChats })
        }
    }

    /*
     *	Adds a message to the specified chat
     *	@param chatId {number}  The id of the chat to be added to.
     *	@param message {string} The message to be added to the chat.
     */
    sendMessages = (chatId, message) => {
        const { socket } = this.props
        socket.emit(MESSAGE_SENT, { chatId, message })
    }

    /*
	*	Sends typing status to server.
	*	chatId {number} the id of the chat being typed in.
	*	typing {boolean} If the user is typing still or not.
    */
    sendTyping = (chatId, isTyping) => {
        const { socket } = this.props
        socket.emit(TYPING, { chatId, isTyping })
    }

    setActiveChat = (activeChat) => {
        this.setState({ activeChat })
    }


    render() {
        const { chats, activeChat } = this.state
        const { user, socket } = this.props

        return (
            <div className="wrapperChat">
                <SideBar
                    chats={chats}
                    user={user}
                    activeChat={activeChat}
                    setActiveChat={this.setActiveChat}
                />

                {
                    activeChat !== null ?
                        (
                            
                            <div className="chat">
                                <ChatHeading activeChat={activeChat} />
                                <Messages
                                    messages={activeChat.messages}
									user={user}
									userTypings={activeChat.userTypings} />
                                <MessagesInput
                                    sendTyping={
                                        (isTyping) => { this.sendTyping(activeChat.id, isTyping) }
                                    }
                                    sendMessages={
                                        (message) => { this.sendMessages(activeChat.id, message) }
                                    }
                                />
                            </div>
                        )
                        :
                        <div className="chat-room choose">
                            <h3>Choose a chat!</h3>
                        </div>
                }
            </div>
        )
    }
}

export default ChatContainer
