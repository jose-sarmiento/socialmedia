import React, {useState, useEffect} from 'react';
import { FaImage, FaUserFriends } from 'react-icons/fa';
import { PostList, CreatePost, Loader } from '../components';

import { useSelector, useDispatch } from 'react-redux';
import {selectRecentPhotos} from '../store/users'

const NewsFeed = () => {
	const users = useSelector(state => state.entities.users);
	const {user, friends} = users;

	const recentPhotos = selectRecentPhotos(users);

	return (
		<div className='profile__grid'>
			<div className='personal-info'>
				<div className='overview'>
					<div className='card'>
						<div className='card__header'>
							<FaUserFriends className='card__icon' />
							<span className='card__title'>Friends</span>
							<span className='card__middot'>&#9679;</span>
							<span className='count'>{friends.length}</span>
						</div>
						<div className='card__body'>
							<div className='flex__images'>
								{friends.map((friend, idx) => (
									<figure className={`flex__image flex__image--${idx + 1}`} key={idx}>
										<img src={friend.profileImage} key={friend._id} />
									</figure>
								))}
							</div>
						</div>
					</div>
					<div className='card'>
						<div className='card__header'>
							<FaImage className='card__icon' />
							<span className='card__title'>Photos</span>
							<span className='card__middot'>&#9679;</span>
							<span className='count'>{user.photos.length}</span>
						</div>
						<div className='card__body'>
							<div className='grid__images'>
								<div className='grid__image grid__image--1'>
									{recentPhotos[0] && <img src={recentPhotos[0].thumbnail} />}
								</div>
								<div className='grid__image grid__image--2'>
									{recentPhotos[1] && <img src={recentPhotos[1].thumbnail} />}
								</div>
								<div className='grid__image grid__image--3'>
									{recentPhotos[2] && <img src={recentPhotos[2].thumbnail} />}
								</div>
								<div className='grid__image grid__image--4'>
									{recentPhotos[3] && <img src={recentPhotos[3].thumbnail} />}
								</div>
								<div className='grid__image grid__image--5'>
									{recentPhotos[4] && <img src={recentPhotos[4].thumbnail} />}
								</div>
								<div className='grid__image grid__image--6'>
									{recentPhotos[5] && <img src={recentPhotos[5].thumbnail} />}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className='newsfeed'>
				<CreatePost variant='small' />
				<PostList onlyMe={true} userId={user._id} small={true} />
			</div>
		</div>
	);
};

export default NewsFeed;
