import React, {useEffect} from 'react'
import {useParams} from 'react-router-dom'
import FriendRequestList from './FriendRequestList'
import PeopleList from './PeopleList'
import MyFriendsList from './MyFriendsList'
 
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