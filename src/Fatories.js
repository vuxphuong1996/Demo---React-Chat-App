const uuidv4 = require('uuid/v4')

/*
*	createUser
*	Creates a user.
*	@prop id {string}
*	@prop name {string}
*	@param {object} 
*		name {string}
*/
const createUser = ({name = ""} = {})=>(
	{
		id:uuidv4(),
		name
		
	}
)

/*
*	createMessage
*	Creates a messages object.
* 	@prop id {string}
* 	@prop time {Date} the time in 24hr format i.e. 14:22
* 	@prop message {string} actual string message
* 	@prop sender {string} sender of the message
*	@param {object} 
*		message {string}
*		sender {string}
*/
const createMessage = ({sender = "", message = ""} = {}) => ({
	id: uuidv4(),
	message,
	sender,
	time: getTime(new Date(Date.now()))
})
/*
*	createChat
*	Creates a Chat object
* 	@prop id {string}
* 	@prop name {string}
* 	@prop messages {Array.Message}
* 	@prop users {Array.string}
*	@param {object} 
*		messages {Array.Message}
*		name {string}
*		users {Array.string}
* 
*/
const createChat = ({messages = [], name = "Community", userTypings = []} = {}) => (
	{

		id: uuidv4(),
		messages,
		name,
		userTypings

	}
)
const getTime = (date) => {
	return `${date.getHours()}:${date.getMinutes()}`
}
module.exports = {
	createUser,
	createChat,
	createMessage
}
