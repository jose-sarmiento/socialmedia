import React from 'react'
import img from '../assets/img/profiles/d2.jpg'

const ActivePeople = () => {
	return (
		<a href="/" className='chat chat--unseen'>
			<div className="chat__user">
				<img className="chat__img" src={img} alt="user" />
				<span className="chat__active-dot"></span>
			</div>
			<div className="chat__content">
				<h4 className='chat__username'>Jane Smith Doe</h4>
				<p className="chat__message">
					Lorem ipsum dolor sit, amet consectetur, adipisicing elit.
				</p>
			</div>
		</a>
	)
}

export default ActivePeople