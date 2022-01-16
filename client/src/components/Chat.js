import React from 'react'
import img from '../assets/img/profiles/d2.jpg'

const Chat = ({ seen }) => {
	return (
		<a href="/" className={seen ? 'chat' : 'chat chat--unseen'}>
			<div className="chat__user">
				<img className="chat__img" src={img} alt="user" />
				<span className="chat__active-dot"></span>
			</div>
			<div className="chat__content">
				<h4 className="chat__username">Jane Smith Doe</h4>
				<p className="chat__message">Lorem ipsum dolor sit, amet...</p>
			</div>
			{!seen && <i className="chat__white-dot"></i>}
		</a>
	)
}

Chat.defaultProps = {
	seen: true
}

export default Chat
