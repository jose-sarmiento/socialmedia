import React from 'react'

const FriendRequestItem = ({ friend, confirm, reject }) => {
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
		
		</li>
	);
}

export default FriendRequestItem