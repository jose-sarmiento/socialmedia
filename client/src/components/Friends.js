import React from 'react'
import FriendRequestList from '../container/FriendRequestList'
import PeopleList from '../container/PeopleList'
import MyFriendsList from '../container/MyFriendsList'
 
const Friends = () => {

	return (
		<div className='friends'>
			<div className='myFriends'>
				<div className='friend-requests'>
					<MyFriendsList />
				</div>
			</div>
			<div className='peoples'>
				<FriendRequestList />
				<PeopleList />
			</div>
		</div>
	)
}
export default Friends