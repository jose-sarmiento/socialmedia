import React, { useEffect } from 'react';
import { FriendRequestItem } from '../components';
import { FaUserPlus } from 'react-icons/fa';
import { useSelector, useDispatch } from "react-redux";

import { acceptRequest, rejectRequest } from '../store/users';

const FriendRequestList = ({ list = [] }) => {

	const dispatch = useDispatch()

	const users = useSelector(state => state.entities.users);

	useEffect(() => {
		if (!users.loading.confirm) return;
		// TODO send my data to requester
		// socket.current.emit("friendRequestAccepted", {
		// 	payload: {

		// 	},
		// 	receiverId:
		// })
	}, [users.loading.confirm])

	const handleRequestConfirm = friend => dispatch(acceptRequest(friend));

	const handleRequestReject = id => dispatch(rejectRequest(id));

	return (
		<section className='list'>
			<div className='list__heading'>
				<div className='list__icon-wrapper'>
					<FaUserPlus className='list__icon' />
				</div>
				<h3 className='list__title'>
					Friend Requests <span>({list.length})</span>
				</h3>
			</div>
			<div className='list__group'>
				<ul className='list__body'>
					{list.map(friend => (
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
