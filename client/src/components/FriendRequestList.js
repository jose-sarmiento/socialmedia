import React, {useEffect} from 'react';
import FriendRequestItem from './FriendRequestItem';
import { FaUserPlus } from 'react-icons/fa';
import { confirmRequest, rejectRequest } from '../contexts/actions/userActions';
import { useAuthContext, useUsersContext, useSocketContext } from '../contexts';

const FriendRequestList = ({ friends }) => {
	const { auth } = useAuthContext();
	const socket = useSocketContext()
	const { confirmRequestSuccess, dispatch } = useUsersContext();

	useEffect(() => {
		if(!confirmRequestSuccess) return;
		// TODO send my data to requester
		// socket.current.emit("friendRequestAccepted", {
		// 	payload: {

		// 	},
		// 	receiverId:
		// })
	}, [confirmRequestSuccess])

	const handleRequestConfirm = friend => {
		confirmRequest({ friend, token: auth.token })(dispatch);
	};

	const handleRequestReject = (friend) => {
		rejectRequest({ friend, token: auth.token })(dispatch);
	};

	return (
		<section className='list'>
			<div className='list__heading'>
				<div className='list__icon-wrapper'>
					<FaUserPlus className='list__icon' />
				</div>
				<h3 className='list__title'>
					Friend Requests <span>({friends.length})</span>
				</h3>
			</div>
			<div className='list__group'>
				<ul className='list__body'>
					{friends.map(friend => (
						<FriendRequestItem
							key={friend._id}
							friend={friend}
							confirm={handleRequestConfirm}
							reject={handleRequestReject}
						/>
					))}
				</ul>
			</div>
		</section>
	);
};

export default FriendRequestList;
