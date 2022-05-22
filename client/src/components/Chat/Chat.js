import React from 'react'
import img from "../../assets/img/profiles/d11.jpg";
import "./Chat.scss"

const Chat = ({unseen}) => {
	return (
		<div className={unseen ? "chat chat--unseen" : "chat"}>
    		<figure>
    			<img src={img} />
    			<span className="indicator"></span>
    		</figure>
    		<div className="chat__content">
				<p className="chat__user">John Doe <span className="chat__ago">11:00</span></p>
				<p className="chat__text">Lorem ipsum dolor sit amet <span className="chat__count-new">5</span></p>
    		</div>
    	</div>
	)
}

export default Chat