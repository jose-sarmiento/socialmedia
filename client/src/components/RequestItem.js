import React from 'react';
import img1 from '../assets/img/profiles/d1.jpg';
import {FaFacebookMessenger} from 'react-icons/fa'

const ListItem = ({ friend }) => {
	return (
		<a href='/' className='friend-item friend-item--col3'>
			<img className='friend-item__img' src={friend.profileImage} alt='test' />
			<div className='mr-auto lh-0'>
				<h4 className='friend-item__name'>{`${friend.firstname} ${friend.lastname}`}</h4>
				<span className='friend-item__subtitle'>7 mutual friends</span>
			</div>

			<div className='btn-wrapper'>
				<button className='btn btn--primary'>Confrm</button>
				<button className='btn btn--white'>Remove</button>
			</div>
		</a>
	);
};

export default ListItem;
