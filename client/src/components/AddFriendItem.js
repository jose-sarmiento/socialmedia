import React, { useState, useEffect } from 'react';
import img1 from '../assets/img/profiles/d1.jpg';
import { FaFacebookMessenger } from 'react-icons/fa';
import { useUsersContext } from '../contexts';

const AddFriendItem = ({ user, add }) => {
	const [btnText, setBtnText] = useState('add friendd');
	const { addFriendId } = useUsersContext();

	useEffect(() => {
		if (addFriendId === user._id) {
			setBtnText('request sent');
		}
	}, [addFriendId, user._id]);

	const handleBtnClick = () => {
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
						(addFriendId === user._id) ? 'btn btn--white' : 'btn btn--primary'
					}
					style={{ textTransform: 'capitalize' }}
					onClick={handleBtnClick}
				>
					{btnText}
				</button>
			</div>
		</li>
	);
};

export default AddFriendItem;
