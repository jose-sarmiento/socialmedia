import React, { useState } from 'react';
import {Link} from 'react-router-dom'

const AddFriendItem = ({ user, add }) => {
	const [isRequested, setIsRequested] = useState(false);

	const handleBtnClick = () => {
		setIsRequested(true)
		add(user);
	};

	return (
		<div className='friend-item friend-item--col3'>
			<img className='friend-item__img' src={user.profileImage} alt='test' />
			<div className='mr-auto lh-0'>
				<Link to={`/users/${user._id}`} className='friend-item__name'>{`${user.firstname} ${user.lastname}`}</Link>
				<span className='friend-item__subtitle'>7 mutual friends</span>
			</div>

			<div className='btn-wrapper'>
				<button
					className={
						isRequested ? 'btn btn--white' : 'btn btn--primary'
					}
					onClick={handleBtnClick}
				>
					{isRequested ? 'Request sent' : 'Add friend'}
				</button>
			</div>
		</div>
	);
};

export default AddFriendItem;
