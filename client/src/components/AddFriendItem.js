import React, { useState, useEffect } from 'react';
import img1 from '../assets/img/profiles/d1.jpg';
import { FaFacebookMessenger } from 'react-icons/fa';

const AddFriendItem = ({ user, add }) => {
	const [isRequested, setIsRequested] = useState(false);

	const handleBtnClick = () => {
		setIsRequested(true)
		add(user._id);
	};

	return (
		<li href='/' className='friend-item friend-item--col3'>
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
		</li>
	);
};

export default AddFriendItem;
