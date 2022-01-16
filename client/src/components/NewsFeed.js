import React from 'react';
import { FaImage, FaUserFriends } from 'react-icons/fa';
import d4 from '../assets/img/profiles/d4.jpg';
import d5 from '../assets/img/profiles/d5.jpg';
import d6 from '../assets/img/profiles/d6.jpg';
import d7 from '../assets/img/profiles/d7.jpg';
import d8 from '../assets/img/profiles/d8.jpg';
import d9 from '../assets/img/profiles/d9.jpg';
import d10 from '../assets/img/profiles/d10.jpg';
import d11 from '../assets/img/profiles/d11.jpg';
import d12 from '../assets/img/profiles/d12.jpg';
import d13 from '../assets/img/profiles/d13.jpg';
import { PostList, CreatePost, Loader } from '../components';

import { useUsersContext } from '../contexts';

const NewsFeed = () => {
	const { profile, loadingUser, loadingProfile } = useUsersContext();

	if (!profile) return null

	return (
		<div className='profile__grid'>
			<div className='personal-info'>
				<div className='overview'>
					<div className='card'>
						<div className='card__header'>
							<FaUserFriends className='card__icon' />
							<span className='card__title'>Friends</span>
							<span className='card__middot'>&#9679;</span>
							<span className='count'>{profile.friends.length}</span>
						</div>
						<div className='card__body'>
							<div className='flex__images'>
								{profile.friends.map((friend, idx) => (

								<figure className={`flex__image flex__image--${idx + 1}`}>
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
							<span className='count'>404</span>
						</div>
						<div className='card__body'>
							<div className='grid__images'>
								<div className='grid__image grid__image--1'>
									<img src={d4} />
								</div>
								<div className='grid__image grid__image--2'>
									<img src={d5} />
								</div>
								<div className='grid__image grid__image--3'>
									<img src={d6} />
								</div>
								<div className='grid__image grid__image--4'>
									<img src={d7} />
								</div>
								<div className='grid__image grid__image--5'>
									<img src={d8} />
								</div>
								<div className='grid__image grid__image--6'>
									<img src={d9} />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className='newsfeed'>
				<CreatePost variant='small' />
				<PostList onlyMe={true} userId={profile._id} small={true} />
			</div>
		</div>
	);
};

export default NewsFeed;
