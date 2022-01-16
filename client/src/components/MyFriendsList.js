import React from 'react'
import ListItem from './ListItem'
import { FaUserFriends } from 'react-icons/fa'

const MyFriendsList = ({friends}) => {
	return (
		<section className="list">
			<div className="list__heading">
				<div className="list__icon-wrapper">
					<FaUserFriends className="list__icon" />
				</div>
				<h3 className="list__title">My Friends <span>({friends.length})</span></h3>
			</div>
			<div className="list__group">
				<div className="list__body">
					{friends.map(friend => (
						<ListItem key={friend._id} friend={friend} />
					))}				
				</div>
			</div>
		</section>
	)
}

export default MyFriendsList