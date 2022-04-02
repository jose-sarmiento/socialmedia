import React, {useEffect} from 'react'
import {useParams} from 'react-router-dom'
import FriendRequestList from './FriendRequestList'
import PeopleList from './PeopleList'
import MyFriendsList from './MyFriendsList'
 
const Friends = ({friends = [], friendRequests, people =[]}) => {

	return (
		<div className='friends'>
			<div className='myFriends'>
				<div className='friend-requests'>
					<MyFriendsList friends={friends} />
				</div>
			</div>
			<div className='peoples'>
				<FriendRequestList friends={friendRequests}/>
				<PeopleList people={people} />
			</div>
		</div>
	)
}
export default Friends