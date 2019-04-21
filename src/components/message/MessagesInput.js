import React, { Component } from 'react'


export class MessagesInput extends Component {
    constructor(props) {
        super(props)
        this.state = {
            message: "",
            isTyping: false
        }
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.sendMessages()
        this.setState({ message: "" })
    }

    sendMessages = () => {
        this.props.sendMessages(this.state.message)
    }

    componentWillUnmount() {
        this.stopCheckingTyping()
      }

    sendTyping = () => {
        this.lastUpdateTime = Date.now()
        if(!this.state.isTyping){
			this.setState({isTyping:true})
			this.props.sendTyping(true)
			this.startCheckingTyping()
		}
    }

    /*
	*	startCheckingTyping
	*	Start an interval that checks if the user is typing.
    */
   startCheckingTyping = () => {
    console.log("Typing");
       this.typingInterval = setInterval(() => {
           if((Date.now() - this.lastUpdateTime) > 300) {
            this.setState({isTyping: false})
            this.stopCheckingTyping()
           }
           
       }, 300);
   }

    /*
     *	stopCheckingTyping
     *	Start the interval from checking if the user is typing.
     */
    stopCheckingTyping = () => {
        console.log("Stop Typing");
        if(this.typingInterval){
			clearInterval(this.typingInterval)
			this.props.sendTyping(false)
		}
    }
    render() {
        const { message } = this.state
        return (
            <div>
                <div className="messagesInput">
                    <form onSubmit={this.handleSubmit}>
                        <input
                            id="message"
                            value={message}
                            ref = {"messageinput"}
                            autoComplete = {'off'}
                            ref={"messagesinput"}
                            type="text"
                            onChange={
                                ({ target }) => { this.setState({ message: target.value }) }
                            }
                            onKeyUp={e => { e.keyCode !== 13 && this.sendTyping() }}
                        />
                        <button
                            type="submit"
                            disabled={message.length < 1}
                        > Send </button>
                    </form>
                </div>
            </div>
        )
    }
}

export default MessagesInput
