import React from 'react'
import { FaUserFriends } from 'react-icons/fa'
import { ListItem } from '../components'

const MyFriendsList = ({ list = [] }) => {

	return (
		<section className="list">
			<div className="list__heading">
				<div className="list__icon-wrapper">
					<FaUserFriends className="list__icon" />
				</div>
				<h3 className="list__title">My Friends <span>({list.length})</span></h3>
			</div>
			<div className="list__group">
				<div className="list__body"> 
					{list.map(friend => (
						<ListItem key={friend._id} friend={friend} />
					))}
				</div>
			</div>
		</section>
	)
}

export default MyFriendsList