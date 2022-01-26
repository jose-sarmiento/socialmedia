import React from 'react'
import {Link} from 'react-router-dom'
import {useAuthContext, useUsersContext} from '../contexts'

const ActivePeopleList = ({onlines, open}) => {
	const {auth} = useAuthContext()
	const {friends} = useUsersContext()

	const handleNewConversation = (receiverId) => {
		const friend = friends.find(x => x._id === receiverId)
		open({
			_id: null, 
			friend: friend, 
			me: {
				_id: auth._id,
				firstname: auth.firstname,
				lastname: auth.lastname,
				profileImage: auth.profileImage,
			}
		})
	}

	if(onlines.length === 0) {
		return (
			<div className="messenger__empty">
				<h2>No active Friend</h2>
				<Link to="/friends">Find People</Link>
			</div>
		)
	}

	return (
		<div className="active-people">
			{onlines.map(online => (
				<div 
					className="active-people__item" key={online._id}
					onClick={()=>handleNewConversation(online._id)}
				>
					<figure className="active-people__profile">
						<img src={online.profileImage} alt={online.firstname} 
						className="active-people__profile-img"
						/>
						<span className="chat__active-dot"></span>
					</figure>
					<h4 className="active-people__name">{`${online.firstname} ${online.lastname}`}</h4>
				</div>
			))}
		</div>
	)
}

export default ActivePeopleList