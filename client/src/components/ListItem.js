import React from 'react';
import img1 from '../assets/img/profiles/d1.jpg';
import { FaFacebookMessenger } from 'react-icons/fa';
import { useUsersContext } from '../contexts'

const ListItem = ({ friend, confirm, reject, listType = 'default' }) => {

	return (
		<li className='friend-item friend-item--col3'>
			<img
				className='friend-item__img'
				src={friend.profileImage}
				alt='test'
			/>
			<div className='mr-auto lh-0'>
				<h4 className='friend-item__name'>{`${friend.firstname} ${friend.lastname}`}</h4>
				<span className='friend-item__subtitle'>7 mutual friends</span>
			</div>

			{listType === 'default' && (
				<div className='btn-wrapper'>
					<button className='icon'>
						<FaFacebookMessenger />
					</button>
				</div>
			)}

			{listType === 'accept' && (
				<div className='btn-wrapper'>
					<button
						className='btn btn--primary'
						onClick={() => confirm(friend)}
					>
						Confirm
					</button>
					<button
						className='btn btn--white'
						onClick={() => reject(friend)}
					>
						Remove
					</button>
				</div>
			)}
		</li>
	);
};

export default ListItem;
