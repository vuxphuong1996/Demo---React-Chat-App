const io = require('./index.js').io
const {VERIFY_USER, USER_CONNECTED, MESSAGE_SENT, COMMUNITY_CHAT, TYPING, MESSAGE_RECIEVED} = require('../Constant')
const { createUser, createChat, createMessage } = require('../Fatories')

let connectedUser = { };
let chatRoom = createChat();

module.exports = (socket) => {
    console.log("Socket Id" + socket.id);

    let sendMessageToChatFromUser;
    let sendTypingFromUser;
    //verify user
    socket.on(VERIFY_USER, (nickName, callback) => {
        if(isUser(connectedUser, nickName)) {
            console.log("true");
            callback({ user: null, isUser: true})
        }else {
            callback({ user: createUser({name: nickName}), isUser: false})
        }
    })
    //userName Object
    //user connect
    socket.on(USER_CONNECTED, (userName) => {
        connectedUser = addUser(connectedUser, userName)
        socket.user = userName

         sendMessageToChatFromUser = sendMessageToChat(userName.name)
         sendTypingFromUser = sendTypingToChat(userName.name)

        
    })

    //Get Community Chat
    socket.on(COMMUNITY_CHAT, (callback) => {
        callback(chatRoom)
    })

    socket.on(MESSAGE_SENT, ({chatId, message}) => {
        console.log(chatId)
        sendMessageToChatFromUser(chatId, message)
    })

socket.on(TYPING, ({chatId, isTyping}) => {
        sendTypingFromUser(chatId, isTyping)
    })

    
}

/*
* Returns a function that will take a chat id and a boolean isTyping
* and then emit a broadcast to the chat id that the sender is typing
* @param sender {string} username of sender
* @return function(chatId, message)
*/
sendTypingToChat = (sender) => {
    return (chatId, isTyping) => {
        io.emit(`${TYPING}-${chatId}`, {sender, isTyping})
    }
}
/*
* Returns a function that will take a chat id and message
* and then emit a broadcast to the chat id.
* @param sender {string} username of sender
* @return function(chatId, message)
*/

sendMessageToChat = (sender) => {
    return (chatId, message) => {
        io.emit(`${MESSAGE_RECIEVED}-${chatId}`, createMessage({sender, message}))
    }
}


//them user
const addUser = (connectedUser, userName) => {
    const newList = Object.assign({}, connectedUser)
    newList[userName.name] = userName
    return newList
}

// kiem tra user co trong danh sach khong
const isUser = (userList, userName) => {
    return userName in userList
}
