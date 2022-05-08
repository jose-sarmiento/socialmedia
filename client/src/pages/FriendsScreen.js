import React from 'react'
import { useSelector } from 'react-redux';
import { AppLayout, MyFriendsList, FriendRequestList, PeopleList } from '../container'

const FriendsScreen = () => {
	const users = useSelector(state => state.entities.users);

	return (
		<AppLayout>
			<div className='friends'>
				<div className='myFriends'>
					<div className='friend-requests'>
						<MyFriendsList list={users.friends} />
					</div>
				</div>
				<div className='peoples'>
					<FriendRequestList list={users.friendRequests} />
					<PeopleList list={users.people} />
				</div>
			</div>
		</AppLayout>
	)
}

export default FriendsScreen
