import React from 'react'

import "./AddFriend.scss"
import dp from "../../assets/img/profiles/d1.jpg"

const AddFriend = () => {
	return (
		<div className="add-friend">
			<div className="add-friend__img-wrapper">
				<img src={dp} alt="trend" />
			</div>
			<div className="add-friend__name-wrapper">
				<span className="add-friend__name">Jane Smith</span>
				<span className="add-friend__username">@jane_smith</span>
			</div>
			<button className="add-friend__button">Add Friend</button>
		</div>
	)
}

export default AddFriend