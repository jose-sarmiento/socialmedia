import React from 'react';
import ListItem from './ListItem';
import { FaUserPlus } from 'react-icons/fa';
import { confirmRequest, rejectRequest } from '../contexts/actions/userActions';
import { useAuthContext, useUsersContext } from '../contexts';

const FriendRequestList = ({ friends }) => {
	const { auth } = useAuthContext();
	const { dispatch } = useUsersContext();

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
						<ListItem
							key={friend._id}
							listType='accept'
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
