import React from 'react';
import AddFriendItem from './AddFriendItem';
import { FaUsers } from 'react-icons/fa';
import { addNewFriend } from '../contexts/actions/userActions'

import {useAuthContext, useUsersContext} from '../contexts'

const PeopleList = ({ people }) => {
	const {auth} = useAuthContext()
	const {dispatch} = useUsersContext()

	const addFriend = (recipientId) => {
		addNewFriend({recipientId: recipientId, token: auth.token})(dispatch)
	}

	return (
		<section className='list'>
			<div className='list__heading'>
				<div className='list__icon-wrapper'>
					<FaUsers className='list__icon' />
				</div>
				<h3 className='list__title'>People you may know</h3>
			</div>
			<div className='list__group'>
				<ul className='list__body'>
					{people.map(user => (
						<AddFriendItem add={addFriend} user={user} key={user._id} />
					))}
				</ul>
			</div>
		</section>
	);
};

export default PeopleList;
