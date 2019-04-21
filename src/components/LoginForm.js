import React, { Component } from 'react'
import {VERIFY_USER} from '../Constant'

export class LoginForm extends Component {
  constructor(props) {
      super(props)
        this.state = {
            nickName: "",
            error: ""
        }
  }

  setUser = ({user, isUser}) => {
    if(isUser){
			this.setError("User name taken")
		}else{
			this.setError("")
			this.props.setUser(user)
		}
  }

  setError = (error)=>{
		this.setState({error})
	}

  handleSubmit = (e) => {
      e.preventDefault();
      const {socket} = this.props
      const {nickName} = this.state
      socket.emit(VERIFY_USER, nickName, this.setUser)
  }

  handleChange = (e) => {
      this.setState({nickName: e.target.value})
  }
  
  render() {
    const {error} = this.state
    return (
      <div>
          <form onSubmit={this.handleSubmit}>
                <input type="text" placeholder="Nhap ten user" onChange={this.handleChange}/>
                <div className="error">{error ? error: null}</div>
          </form>
      </div>
    )
  }
}

export default LoginForm
