import React, { useState } from 'react';
import {Link} from 'react-router-dom'

const AddFriendItem = ({ user, add }) => {
	const [isRequested, setIsRequested] = useState(false);

	const handleBtnClick = () => {
		setIsRequested(true)
		add(user);
	};

	return (
		<Link to={`/profile/${user._id}`} className='friend-item friend-item--col3'>
			<img className='friend-item__img' src={user.profileImage} alt='test' />
			<div className='mr-auto lh-0'>
				<h4 className='friend-item__name'>{`${user.firstname} ${user.lastname}`}</h4>
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
		</Link>
	);
};

export default AddFriendItem;
